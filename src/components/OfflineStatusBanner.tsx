/**
 * @file OfflineStatusBanner.tsx
 * @description A slim, animated banner that displays the current network
 * and sync status. Shown on receptionist pages so the user always knows
 * whether data is being saved locally or synced.
 *
 * States:
 *  - Offline: Red/amber bar with pending count
 *  - Online + Syncing: Yellow pulsing bar with spinner
 *  - Online + Nothing pending: Banner hidden
 */

import React from 'react';
import { Wifi, WifiOff, Loader2, CloudUpload } from 'lucide-react';
import { useNetworkStatus } from '@/contexts/NetworkStatusContext';

const OfflineStatusBanner: React.FC = () => {
    const { isOnline, pendingCount, isSyncing } = useNetworkStatus();

    // ── Online with nothing pending → hide banner ──────────────────────
    if (isOnline && pendingCount === 0 && !isSyncing) {
        return null;
    }

    // ── Determine banner variant ───────────────────────────────────────
    let bgClass = '';
    let icon: React.ReactNode = null;
    let message = '';

    if (!isOnline) {
        // Offline
        bgClass = 'bg-gradient-to-r from-red-600 to-amber-600';
        icon = <WifiOff className="w-4 h-4 flex-shrink-0" />;
        message = pendingCount > 0
            ? `Offline Mode — ${pendingCount} lead${pendingCount > 1 ? 's' : ''} saved locally`
            : 'Offline Mode — Forms will be saved locally';
    } else if (isSyncing) {
        // Online, actively syncing
        bgClass = 'bg-gradient-to-r from-amber-500 to-yellow-500 animate-pulse';
        icon = <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />;
        message = `Syncing ${pendingCount} lead${pendingCount > 1 ? 's' : ''} to server...`;
    } else if (pendingCount > 0) {
        // Online but has pending (failed items)
        bgClass = 'bg-gradient-to-r from-amber-500 to-orange-500';
        icon = <CloudUpload className="w-4 h-4 flex-shrink-0" />;
        message = `${pendingCount} lead${pendingCount > 1 ? 's' : ''} pending sync`;
    }

    return (
        <div
            className={`${bgClass} text-white text-xs font-semibold px-4 py-2 flex items-center justify-center gap-2 transition-all duration-500`}
        >
            {icon}
            <span>{message}</span>
            {isOnline && pendingCount > 0 && !isSyncing && (
                <SyncButton />
            )}
        </div>
    );
};

/** Small retry button shown when there are failed items while online */
const SyncButton: React.FC = () => {
    const { syncNow, clearFailedQueue, lastSyncResult } = useNetworkStatus();

    // Only show "Clear Errors" if the last sync attempt resulted in some permanent failures
    const hasFailures = lastSyncResult && lastSyncResult.failed > 0;

    return (
        <div className="ml-2 flex items-center gap-2">
            <button
                onClick={() => syncNow()}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all active:scale-95"
            >
                Retry Sync
            </button>
            {hasFailures && (
                <button
                    onClick={() => clearFailedQueue()}
                    className="bg-red-500/80 hover:bg-red-600 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all active:scale-95 border border-red-400"
                >
                    Clear Errors
                </button>
            )}
        </div>
    );
};

export default OfflineStatusBanner;
