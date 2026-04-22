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
    // Labels (could be moved to translations if needed)
    const t_visitLineup = "Visit Line-up";
    const t_revisitLineup = "Revisits Line-up";
    const t_assignedPending = "Assigned / Pending";
    const t_totalVisits = "Total Productivity";

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
            <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto no-scrollbar pb-2 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-50 h-32 min-w-[240px] md:min-w-0 rounded-xl animate-pulse flex items-center justify-center shrink-0">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto no-scrollbar pb-2 mb-6 scroll-smooth">
            {/* Visit Line-up */}
            <div className="bg-[#EAF3FF]/80 backdrop-blur-sm p-5 pb-6 rounded-2xl relative overflow-hidden min-w-[260px] md:min-w-0 shrink-0 border border-blue-100/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{t_visitLineup}</p>
                        <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{stats?.visitCount || 0}</h3>
                    </div>
                    <div className="bg-blue-500 shadow-lg shadow-blue-200 p-2.5 rounded-xl text-white">
                        <Calendar className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <ArrowUpRight className="w-3 h-3" />
                        +5.2%
                    </span>
                    <span className="text-xs font-semibold text-gray-500">Upcoming visits</span>
                </div>
            </div>

            {/* Revisits Line-up */}
            <div className="bg-[#F3E8FF]/80 backdrop-blur-sm p-5 pb-6 rounded-2xl relative overflow-hidden min-w-[260px] md:min-w-0 shrink-0 border border-purple-100/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">{t_revisitLineup}</p>
                        <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{stats?.revisitCount || 0}</h3>
                    </div>
                    <div className="bg-purple-500 shadow-lg shadow-purple-200 p-2.5 rounded-xl text-white">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <ArrowUpRight className="w-3 h-3" />
                        +8.2%
                    </span>
                    <span className="text-xs font-semibold text-gray-500">Returning customers</span>
                </div>
            </div>

            {/* Assigned / Pending */}
            <div className="bg-[#FFE4E6]/80 backdrop-blur-sm p-5 pb-6 rounded-2xl relative overflow-hidden min-w-[260px] md:min-w-0 shrink-0 border border-pink-100/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[10px] font-bold text-pink-600 uppercase tracking-widest">{t_assignedPending}</p>
                        <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
                            {stats?.assignedCount || 0}
                            <span className="text-gray-400 text-xl font-normal"> / {stats ? (stats.assignedCount + stats.pendingCount) : 0}</span>
                        </h3>
                    </div>
                    <div className="bg-pink-500 shadow-lg shadow-pink-200 p-2.5 rounded-xl text-white">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                         {[1,2,3].map(i => (
                             <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                 <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600" />
                             </div>
                         ))}
                    </div>
                    <span className="text-xs font-semibold text-gray-500 ml-1">Team workload</span>
                </div>
            </div>

            {/* Total Visits + Revisits */}
            <div className="bg-[#FFEDD5]/80 backdrop-blur-sm p-5 pb-6 rounded-2xl relative overflow-hidden min-w-[260px] md:min-w-0 shrink-0 border border-orange-100/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{t_totalVisits}</p>
                        <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{stats?.totalVisitsRevisits || 0}</h3>
                    </div>
                    <div className="bg-orange-500 shadow-lg shadow-orange-200 p-2.5 rounded-xl text-white">
                        <Activity className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <ArrowDownRight className="w-3 h-3" />
                        -5.2%
                    </span>
                    <span className="text-xs font-semibold text-gray-500">vs last month</span>
                </div>
            </div>
        </div>
    );
};
