/**
 * @file offlineLeadQueue.ts
 * @description IndexedDB-backed offline queue for lead form submissions.
 * 
 * When the receptionist submits a form while offline (or the server is
 * unreachable), the full form payload — including base64-encoded photo
 * and signature strings — is stored in IndexedDB. When connectivity is
 * restored, all pending leads are synced to the server automatically.
 * 
 * Uses the raw IndexedDB API (no external dependencies).
 */

import api from '@/lib/api';

// ── Constants ──────────────────────────────────────────────────────────
const DB_NAME = 'erp-mpp-offline';
const DB_VERSION = 1;
const STORE_NAME = 'pendingLeads';

// ── Types ──────────────────────────────────────────────────────────────
export interface PendingLead {
    id: string;           // UUID
    timestamp: number;    // Date.now() when saved
    data: Record<string, any>;  // The full lead form payload
    status: 'pending' | 'syncing' | 'failed';
    errorMessage?: string;
}

export interface SyncResult {
    total: number;
    synced: number;
    failed: number;
    errors: Array<{ id: string; message: string }>;
}

// ── Database Helpers ───────────────────────────────────────────────────

/** Open (or create) the IndexedDB database. */
function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/** Run a single read/write transaction and return a store reference. */
async function getStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, mode);
    // Close the DB connection when the transaction finishes
    tx.oncomplete = () => db.close();
    tx.onerror = () => db.close();
    return tx.objectStore(STORE_NAME);
}

// ── Public API ─────────────────────────────────────────────────────────

/** Generate a simple UUID v4 */
function uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * Add a lead to the offline queue.
 * @returns The generated offline ID for reference in the UI.
 */
export async function addToQueue(leadData: Record<string, any>): Promise<string> {
    const store = await getStore('readwrite');
    const id = uuid();

    const entry: PendingLead = {
        id,
        timestamp: Date.now(),
        data: leadData,
        status: 'pending',
    };

    return new Promise((resolve, reject) => {
        const request = store.add(entry);
        request.onsuccess = () => resolve(id);
        request.onerror = () => reject(request.error);
    });
}

/** Get all pending leads from the queue, ordered oldest-first. */
export async function getAllPending(): Promise<PendingLead[]> {
    const store = await getStore('readonly');

    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => {
            const results = (request.result as PendingLead[])
                .sort((a, b) => a.timestamp - b.timestamp);
            resolve(results);
        };
        request.onerror = () => reject(request.error);
    });
}

/** Get the count of leads in the queue. */
export async function getPendingCount(): Promise<number> {
    const store = await getStore('readonly');

    return new Promise((resolve, reject) => {
        const request = store.count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/** Remove a single lead from the queue after successful sync. */
export async function removeFromQueue(id: string): Promise<void> {
    const store = await getStore('readwrite');

    return new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

/** Clear all leads that are marked as failed permanently. */
export async function clearFailed(): Promise<void> {
    const all = await getAllPending();
    const failedIds = all.filter(l => l.status === 'failed').map(l => l.id);
    
    if (failedIds.length === 0) return;
    
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        failedIds.forEach(id => store.delete(id));
        tx.oncomplete = () => {
            db.close();
            resolve();
        };
        tx.onerror = () => {
            db.close();
            reject(tx.error);
        };
    });
}

/** Update the status/error of a queued lead. */
async function updateEntry(id: string, updates: Partial<PendingLead>): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const getReq = store.get(id);
        getReq.onsuccess = () => {
            const entry = getReq.result as PendingLead | undefined;
            if (!entry) {
                resolve();
                return;
            }
            const updated = { ...entry, ...updates };
            const putReq = store.put(updated);
            putReq.onsuccess = () => resolve();
            putReq.onerror = () => reject(putReq.error);
        };
        getReq.onerror = () => reject(getReq.error);
        tx.oncomplete = () => db.close();
        tx.onerror = () => db.close();
    });
}

/**
 * Attempt to sync all pending leads to the server.
 * 
 * - Each lead is POSTed individually to `/leads`.
 * - On success the entry is removed from IndexedDB.
 * - On a 4xx error (e.g. duplicate phone) the entry is marked 'failed'
 *   and skipped so it doesn't block other leads.
 * - On a network error the sync stops (we're still offline).
 * 
 * @returns A summary of how many synced / failed.
 */
export async function syncAll(): Promise<SyncResult> {
    const pending = await getAllPending();
    const result: SyncResult = {
        total: pending.length,
        synced: 0,
        failed: 0,
        errors: [],
    };

    for (const entry of pending) {
        // Skip entries that already failed permanently (e.g. duplicate phone)
        if (entry.status === 'failed') {
            result.failed++;
            continue;
        }

        try {
            await updateEntry(entry.id, { status: 'syncing' });
            await api.post('/leads', entry.data);
            await removeFromQueue(entry.id);
            result.synced++;
        } catch (error: any) {
            // Distinguish between network errors and server validation errors
            if (!error.response) {
                // Network error — stop syncing, we're still offline
                await updateEntry(entry.id, { status: 'pending' });
                break;
            }

            // Server responded with an error
            const message = error.response?.data?.error || 'Unknown server error';

            if (error.response.status >= 500) {
                // 5xx (including 503 for DB down) — keep as pending to retry later
                await updateEntry(entry.id, { status: 'pending' });
            } else {
                // 4xx (validation errors, e.g. duplicate phone) — mark as failed
                await updateEntry(entry.id, {
                    status: 'failed',
                    errorMessage: message,
                });
                result.failed++;
                result.errors.push({ id: entry.id, message });
            }
        }
    }

    return result;
}
