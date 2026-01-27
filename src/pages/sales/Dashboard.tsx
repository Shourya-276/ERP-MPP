import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SalesSidebar from '@/components/dashboard/sales/SalesSidebar';
import SalesGreetingCard from '@/components/dashboard/sales/SalesGreetingCard';
import SalesStatCards from '@/components/dashboard/sales/SalesStatCards';
import AlertsCard from '@/components/dashboard/sales/AlertsCard';
import FollowUpsCard from '@/components/dashboard/sales/FollowUpsCard';
import SiteVisitsCard from '@/components/dashboard/sales/SiteVisitsCard';
import LeadEngagementCard from '@/components/dashboard/sales/LeadEngagementCard';
import OutcomeTrackingChart from '@/components/dashboard/sales/OutcomeTrackingChart';
import CalendarWidget from '@/components/dashboard/CalendarWidget';

const SalesDashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If user is receptionist, redirect to receptionist dashboard
  if (user?.role === 'Receptionist') {
    return <Navigate to="/receptionist" replace />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />

      <div className="flex">
        <SalesSidebar />

        <main className="flex-1 p-5 overflow-auto">
          {/* Top section: Greeting + Calendar */}
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <SalesGreetingCard />
            </div>
            {/* Calendar Widget wrapper with fixed width wider than Alerts */}
            <div className="w-[350px] h-[180px] shrink-0">
              <CalendarWidget />
            </div>
          </div>

          {/* Stats + Alerts row - side by side */}
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <SalesStatCards />
            </div>
            {/* Alerts wrapper narrower than Calendar to make Stats wider than Greeting */}
            <div className="w-[260px] shrink-0">
              <AlertsCard />
            </div>
          </div>

          {/* Follow Ups, Site Visits, Lead Engagement */}
          {/* Follow Ups, Site Visits, Lead Engagement Container */}
          <div className="bg-[#C8E1FF80] p-4 rounded-[20px] mb-5">
            <div className="grid grid-cols-3 gap-4">
              <FollowUpsCard />
              <SiteVisitsCard />
              <LeadEngagementCard />
            </div>
          </div>

          {/* Outcome Tracking Chart */}
          <div className="bg-[#CDFDD280] p-4 rounded-[20px]">
            <OutcomeTrackingChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalesDashboard;
