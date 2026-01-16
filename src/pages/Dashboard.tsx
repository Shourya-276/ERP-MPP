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
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Top section: Greeting + Calendar */}
          <div className="flex gap-6 mb-8">
            <GreetingCard />
            <CalendarWidget />
          </div>

          {/* Lead Overview */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Your Lead Overview</h2>
                <p className="text-sm text-muted-foreground">Showing data for the last 30 days</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                  Today
                </Button>
                <Button variant="ghost" size="sm">This Month</Button>
                <Button variant="ghost" size="sm">Nov</Button>
                <Button variant="ghost" size="sm">Oct</Button>
                <Button variant="ghost" size="sm">Sep</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
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
