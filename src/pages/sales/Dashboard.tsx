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
            <CalendarWidget />
          </div>

          {/* Stats + Alerts row */}
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <SalesStatCards />
            </div>
            <div className="w-64">
              <AlertsCard />
            </div>
          </div>

          {/* Follow Ups, Site Visits, Lead Engagement */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <FollowUpsCard />
            <SiteVisitsCard />
            <LeadEngagementCard />
          </div>

          {/* Outcome Tracking Chart */}
          <OutcomeTrackingChart />
        </main>
      </div>
    </div>
  );
};

export default SalesDashboard;
