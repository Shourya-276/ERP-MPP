import React, { useEffect, useState } from 'react';
import { Calendar, Users, ArrowUpRight, ArrowDownRight, Activity, Loader2 } from 'lucide-react';
import api from '@/lib/api';

interface Stats {
    visitCount: number;
    revisitCount: number;
    totalVisitsRevisits: number;
    assignedCount: number;
    pendingCount: number;
}

export const ReceptionistStats: React.FC = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/leads/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-50 h-32 rounded-xl animate-pulse flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            {/* Visit Line-up */}
            <div className="bg-[#EAF3FF] p-4 rounded-xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Visit Line-up</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats?.visitCount || 0}</h3>
                    </div>
                    <div className="bg-blue-500 p-2 rounded-lg text-white">
                        <Calendar className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        +5.2%
                    </span>
                    <span className="text-xs text-gray-500">Upcoming visits</span>
                </div>
            </div>

            {/* Revisits Line-up */}
            <div className="bg-[#F3E8FF] p-4 rounded-xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Revisits Line-up</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats?.revisitCount || 0}</h3>
                    </div>
                    <div className="bg-purple-500 p-2 rounded-lg text-white">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        +8.2%
                    </span>
                    <span className="text-xs text-gray-500">Returning customers</span>
                </div>
            </div>

            {/* Assigned / Pending */}
            <div className="bg-[#FFE4E6] p-4 rounded-xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Assigned / Pending</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">
                            {stats?.assignedCount || 0}
                            <span className="text-gray-400 text-lg">/{stats ? (stats.assignedCount + stats.pendingCount) : 0}</span>
                        </h3>
                    </div>
                    <div className="bg-pink-500 p-2 rounded-lg text-white">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">Lead Status</span>
                </div>
            </div>

            {/* Total Visits + Revisits */}
            <div className="bg-[#FFEDD5] p-4 rounded-xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Visits + Revisits</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats?.totalVisitsRevisits || 0}</h3>
                    </div>
                    <div className="bg-orange-500 p-2 rounded-lg text-white">
                        <Activity className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3" />
                        -5.2%
                    </span>
                </div>
            </div>
        </div>
    );
};
