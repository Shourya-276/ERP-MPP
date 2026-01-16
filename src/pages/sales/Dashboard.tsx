import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import GreetingCard from '@/components/dashboard/GreetingCard';
import CalendarWidget from '@/components/dashboard/CalendarWidget';
import StatCards from '@/components/dashboard/StatCards';
import RecentVisitsTable from '@/components/dashboard/RecentVisitsTable';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-5 overflow-auto">
          {/* Top section: Greeting + Calendar */}
          <div className="flex gap-4 mb-5 items-start">
            <div className="flex-1 flex flex-col gap-6">
              <GreetingCard />

              {/* Lead Overview Header & Controls */}
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Your Lead Overview</h2>
                  <p className="text-xs text-muted-foreground">Showing data for the last 30 days</p>
                </div>

                <div
                  className="flex items-center bg-white shadow-sm"
                  style={{
                    width: '567px',
                    height: '48px',
                    borderRadius: '9999px',
                    gap: '17px',
                    padding: '4px'
                  }}
                >
                  <Button variant="default" size="sm" className="bg-[#4A1D59] hover:bg-[#3d184a] h-10 px-6 text-xs rounded-full shadow-none">
                    Today
                  </Button>
                  <span className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground px-2">This Month</span>
                  <span className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground px-2">Nov</span>
                  <span className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground px-2">Oct</span>
                  <span className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground px-2">Sep</span>

                  <div className="flex-1"></div>

                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>

            <CalendarWidget />
          </div>

          <div className="mb-5">
            <StatCards />
          </div>

          {/* Recent Visits Table */}
          <RecentVisitsTable />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
