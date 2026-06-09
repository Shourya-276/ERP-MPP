/**
 * @file NetworkStatusContext.tsx
 * @description React Context that tracks the browser's online/offline state,
 * manages the count of pending offline leads, and triggers automatic syncing
 * when the connection is restored.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { getPendingCount, syncAll, SyncResult, clearFailed } from '@/lib/offlineLeadQueue';

// ── Context Shape ──────────────────────────────────────────────────────
interface NetworkStatusContextType {
    isOnline: boolean;
    pendingCount: number;
    isSyncing: boolean;
    lastSyncResult: SyncResult | null;
    syncNow: () => Promise<void>;
    refreshPendingCount: () => Promise<void>;
    clearFailedQueue: () => Promise<void>;
}

const NetworkStatusContext = createContext<NetworkStatusContextType>({
    isOnline: true,
    pendingCount: 0,
    isSyncing: false,
    lastSyncResult: null,
    syncNow: async () => {},
    refreshPendingCount: async () => {},
    clearFailedQueue: async () => {},
});

// ── Hook ───────────────────────────────────────────────────────────────
export const useNetworkStatus = () => useContext(NetworkStatusContext);

// ── Provider ───────────────────────────────────────────────────────────
export const NetworkStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [pendingCount, setPendingCount] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncResult, setLastSyncResult] = useState<SyncResult | null>(null);

    // Prevent duplicate sync calls
    const syncLock = useRef(false);

    // ── Refresh the pending count from IndexedDB ───────────────────────
    const refreshPendingCount = useCallback(async () => {
        try {
            const count = await getPendingCount();
            setPendingCount(count);
        } catch {
            // IndexedDB might not be available in some contexts
        }
    }, []);

    // ── Sync all pending leads ─────────────────────────────────────────
    const syncNow = useCallback(async () => {
        if (syncLock.current || !navigator.onLine) return;
        syncLock.current = true;
        setIsSyncing(true);

        try {
            const currentCount = await getPendingCount();
            if (currentCount === 0) {
                syncLock.current = false;
                setIsSyncing(false);
                return;
            }

            toast.info(`Syncing ${currentCount} offline lead${currentCount > 1 ? 's' : ''}...`, {
                id: 'offline-sync-progress',
                duration: 10000,
            });

            const result = await syncAll();
            setLastSyncResult(result);

            // Dismiss progress toast
            toast.dismiss('offline-sync-progress');

            if (result.synced > 0) {
                toast.success(
                    `✅ ${result.synced} lead${result.synced > 1 ? 's' : ''} synced successfully!`,
                    { duration: 5000 }
                );
            }

            if (result.failed > 0) {
                toast.warning(
                    `⚠️ ${result.failed} lead${result.failed > 1 ? 's' : ''} failed to sync. Check for duplicates.`,
                    { duration: 8000 }
                );
            }
        } catch (err) {
            console.error('Sync error:', err);
            toast.dismiss('offline-sync-progress');
            toast.error('Sync failed. Will retry when connection is stable.');
        } finally {
            syncLock.current = false;
            setIsSyncing(false);
            await refreshPendingCount();
        }
    }, [refreshPendingCount]);

    // ── Clear failed items ──────────────────────────────────────────────
    const clearFailedQueue = useCallback(async () => {
        try {
            await clearFailed();
            toast.success('Cleared failed leads from queue');
            await refreshPendingCount();
        } catch (err) {
            console.error('Failed to clear queue:', err);
        }
    }, [refreshPendingCount]);

    // ── Listen for online/offline events ───────────────────────────────
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            toast.success('🟢 Back online!', { duration: 3000 });
            // Auto-sync after a short delay to let the connection stabilize
            setTimeout(() => syncNow(), 1500);
        };

        const handleOffline = () => {
            setIsOnline(false);
            toast.warning('🔴 You are offline. Leads will be saved locally.', {
                duration: 5000,
            });
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [syncNow]);

    // ── Initial load: get pending count and try syncing ────────────────
    useEffect(() => {
        refreshPendingCount();
        // If we start online and have pending items, sync them
        if (navigator.onLine) {
            syncNow();
        }
    }, [refreshPendingCount, syncNow]);

    return (
        <NetworkStatusContext.Provider
            value={{
                isOnline,
                pendingCount,
                isSyncing,
                lastSyncResult,
                syncNow,
                refreshPendingCount,
                clearFailedQueue,
            }}
        >
            {children}
        </NetworkStatusContext.Provider>
    );
};

export default NetworkStatusContext;
