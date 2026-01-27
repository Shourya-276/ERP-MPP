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
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="space-y-2 max-w-7xl mx-auto">

                        {/* Top Section: Welcome Card & Calendar Widget */}
                        <div className="flex gap-6 items-stretch">
                            <GreetingCard />
                            <div className="w-[350px] shrink-0">
                                <CalendarWidget />
                            </div>
                        </div>

                        {/* Middle Section: Lead Overview Stats with Filters */}
                        {/* Negative margin used to visually pull this section closer to the cards above */}
                        <div className="relative z-10">
                            <div className="flex flex-col gap-4 mb-6 -mt-16">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#1a1a1a]">Your Lead Overview</h2>
                                    <p className="text-sm text-gray-500 mt-1">Showing data for the last 30 days</p>
                                </div>

                                {/* Time Period Filters */}
                                <div className="bg-white p-2 rounded-full border shadow-sm inline-flex items-center gap-6 w-max">
                                    {['Today', 'This Month', 'Nov', 'Oct', 'Sep'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveFilter(filter)}
                                            className={`rounded-full text-sm font-medium transition-all ${activeFilter === filter
                                                ? 'bg-[#4A1D59] text-white shadow-md px-5 py-1.5'
                                                : 'text-[#4A1D59] hover:bg-purple-50 px-3 py-1.5'
                                                }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                    <div className="w-px h-6 bg-gray-200" /> {/* Visual Separator */}
                                    <button className="p-2 text-[#4A1D59] hover:bg-purple-50 rounded-full">
                                        <CalendarIcon className="w-5 h-5" />
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
