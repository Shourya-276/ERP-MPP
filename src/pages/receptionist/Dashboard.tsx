import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

// Components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import GreetingCard from '@/components/dashboard/GreetingCard';
import CalendarWidget from '@/components/dashboard/CalendarWidget';
import { ReceptionistSidebar } from '@/components/dashboard/receptionist/ReceptionistSidebar';
import { ReceptionistStats } from '@/components/dashboard/receptionist/ReceptionistStats';
import { ReceptionistVisitsTable } from '@/components/dashboard/receptionist/ReceptionistVisitsTable';

/**
 * ReceptionistDashboard Component
 * 
 * The main dashboard view for the Receptionist role.
 * Layout:
 * - Header (Top, Full Width)
 * - Sidebar (Left, Fixed/Flex)
 * - Main Content (Right, Scrollable)
 *   - Greeting & Calendar
 *   - Statistics & Filters
 *   - Recent Visits Table
 */
const ReceptionistDashboard: React.FC = () => {
    // State to manage the active time filter for statistics
    const [activeFilter, setActiveFilter] = useState('Today');

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Full Width Global Header */}
            <DashboardHeader />

            <div className="flex flex-1 overflow-hidden">
                {/* Left Navigation Sidebar */}
                <ReceptionistSidebar />

                {/* Main Content Area */}
                <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
 
                        {/* Top Section: Welcome Card & Calendar Widget */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
                            <GreetingCard />
                            <div className="w-full md:w-[350px] shrink-0">
                                <CalendarWidget />
                            </div>
                        </div>
 
                        {/* Middle Section: Lead Overview Stats with Filters */}
                        {/* Negative margin used to visually pull this section closer to the cards above */}
                        <div className="relative z-10 px-1">
                            <div className="flex flex-col gap-4 mb-6 md:-mt-10">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">Your Lead Overview</h2>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1">Showing data for the last 30 days</p>
                                </div>
 
                                 {/* Time Period Filters */}
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
                                        {['Today', 'This Month', 'Nov', 'Oct', 'Sep'].map((filter) => (
                                            <button
                                                key={filter}
                                                onClick={() => setActiveFilter(filter)}
                                                className={`rounded-xl text-[10px] md:text-sm font-bold transition-all whitespace-nowrap px-6 py-2.5 shadow-sm active:scale-95 ${activeFilter === filter
                                                    ? 'bg-[#4A1D59] text-white shadow-purple-200'
                                                    : 'text-gray-400 hover:text-[#4A1D59] hover:bg-purple-50/50'
                                                    }`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="hidden md:block w-px h-6 bg-gray-200 mx-1" />
                                    <button className="h-11 w-11 shrink-0 flex items-center justify-center text-[#4A1D59] hover:bg-white hover:shadow-md rounded-2xl border border-gray-100 transition-all active:scale-95">
                                        <CalendarIcon className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                </div>
                            </div>
 
                            {/* Statistics Cards */}
                            <ReceptionistStats />
                        </div>

                        {/* Bottom Section: Visits Table */}
                        <ReceptionistVisitsTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceptionistDashboard;
