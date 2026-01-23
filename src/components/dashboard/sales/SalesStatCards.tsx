import React from 'react';
import { Phone, Users, UserCheck, Home, Calendar } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { value: string; isPositive: boolean };
  icon: React.ReactNode;
  iconBg: string;
  extra?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, iconBg, extra }) => (
  <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
    <div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {trend && (
        <p className={`text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? '+' : ''}{trend.value} vs<br />last period
        </p>
      )}
      <p className="text-sm font-medium text-foreground mt-1">{label}</p>
      {extra}
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg}`}>
      {icon}
    </div>
  </div>
);

const SalesStatCards: React.FC = () => {
  return (
    <div 
      className="rounded-2xl p-4"
      style={{ background: 'rgba(245, 213, 210, 0.5)' }}
    >
      {/* Location, Project, Project Name header inside white container */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-4 gap-4 items-center">
          <div className="border-r border-gray-200">
            <p className="text-xs text-purple-400 mb-1">Location</p>
            <p className="font-semibold text-lg text-foreground">Chembur</p>
          </div>
          <div className="border-r border-gray-200">
            <p className="text-xs text-purple-400 mb-1">Project</p>
            <p className="font-semibold text-lg text-foreground">Swastik</p>
          </div>
          <div>
            <p className="text-xs text-purple-400 mb-1">Project Name</p>
            <p className="font-semibold text-lg text-foreground">Swastik Legacy</p>
          </div>
          <div className="flex justify-end">
            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <StatCard
          label="Calls Done"
          value={312}
          trend={{ value: '12%', isPositive: true }}
          icon={<Phone className="w-6 h-6 text-blue-600" />}
          iconBg="bg-blue-200"
        />
        <StatCard
          label="Total Visits"
          value={18}
          trend={{ value: '12%', isPositive: true }}
          icon={<Users className="w-6 h-6 text-purple-600" />}
          iconBg="bg-purple-200"
        />
        <StatCard
          label="Total Revisits"
          value="5/18"
          trend={{ value: '12%', isPositive: true }}
          icon={<UserCheck className="w-6 h-6 text-green-600" />}
          iconBg="bg-green-200"
        />
        <StatCard
          label="Bookings"
          value={5}
          trend={{ value: '12%', isPositive: true }}
          icon={<Home className="w-6 h-6 text-orange-600" />}
          iconBg="bg-orange-200"
          extra={
            <p className="text-xs text-orange-500 mt-1">Visit: Booking<br /><span className="font-bold">4:1</span></p>
          }
        />
      </div>

      {/* Booking Prospect row inside white container */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-base font-semibold mb-3">Booking Prospect</h3>
        <div className="grid grid-cols-3 gap-3">
          {/* Hot Leads */}
          <div 
            className="rounded-xl p-4"
            style={{
              background: 'linear-gradient(135deg, #FEF2F2 0%, #FFF7ED 100%)',
              borderTop: '3px solid #FF6B6B',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-3xl font-bold">87</p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-sm font-medium text-red-500">Hot Leads</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-2">High priority prospects</p>
            <div className="h-1 bg-gradient-to-r from-red-500 to-red-200 rounded-full"></div>
          </div>

          {/* Warm Leads */}
          <div 
            className="rounded-xl p-4"
            style={{
              background: '#FEFAEA',
              borderTop: '3px solid #FFB347',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-3xl font-bold">34</p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="text-sm font-medium text-amber-500">Warm Leads</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-2">High priority prospects</p>
            <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-200 rounded-full"></div>
          </div>

          {/* Cold Leads */}
          <div 
            className="rounded-xl p-4"
            style={{
              background: '#EDFAFF',
              borderTop: '3px solid #60A5FA',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-3xl font-bold">45</p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-sm font-medium text-blue-500">Cold Leads</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-2">High priority prospects</p>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStatCards;
