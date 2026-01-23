import React from 'react';
import { Phone, Users, RotateCcw, Calendar, TrendingUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { value: string; isPositive: boolean };
  icon: React.ReactNode;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, iconBg }) => (
  <div className="flex items-center gap-3">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
      {icon}
    </div>
    <div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {trend && (
          <span className={`text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
);

const SalesStatCards: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border">
      {/* Location, Project, Project Name row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Location</p>
          <p className="font-semibold text-foreground">Chembur</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Project</p>
          <p className="font-semibold text-foreground">Swastik</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Project Name</p>
          <p className="font-semibold text-foreground">Swastik Legacy</p>
        </div>
        <div 
          className="rounded-xl p-3 flex items-center gap-3"
          style={{
            background: 'linear-gradient(108.4deg, rgba(32, 219, 29, 0.2) 38.52%, rgba(195, 255, 194, 0.2) 101.88%)',
          }}
        >
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">My Achieved Target</p>
            <p className="font-bold text-lg">132<span className="text-xs text-muted-foreground font-normal">/250 Bookings done</span></p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard
          label="Calls Done"
          value={312}
          trend={{ value: '4.2% vs last period', isPositive: true }}
          icon={<Phone className="w-5 h-5 text-blue-600" />}
          iconBg="bg-blue-100"
        />
        <StatCard
          label="Total Visits"
          value={18}
          trend={{ value: '2.5% vs last period', isPositive: true }}
          icon={<Users className="w-5 h-5 text-purple-600" />}
          iconBg="bg-purple-100"
        />
        <StatCard
          label="Total Revisits"
          value="5/18"
          trend={{ value: '4.2% vs last period', isPositive: true }}
          icon={<RotateCcw className="w-5 h-5 text-green-600" />}
          iconBg="bg-green-100"
        />
        <StatCard
          label="Bookings"
          value={5}
          icon={<Calendar className="w-5 h-5 text-amber-600" />}
          iconBg="bg-amber-100"
        />
        <div></div>
      </div>

      {/* Booking Prospect row */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Booking Prospect</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* Hot Leads */}
          <div 
            className="rounded-xl p-4"
            style={{
              background: 'linear-gradient(135deg, #FEF2F2 0%, #FFF7ED 100%)',
              borderTop: '0.8px solid #FFE2E2',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-xs font-medium text-red-600">Hot Leads</span>
            </div>
            <p className="text-2xl font-bold">87</p>
            <p className="text-xs text-muted-foreground">High priority prospects</p>
          </div>

          {/* Warm Leads */}
          <div 
            className="rounded-xl p-4"
            style={{
              background: '#FEFAEA',
              borderTop: '0.8px solid #FFE2E2',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-xs font-medium text-amber-600">Warm Leads</span>
            </div>
            <p className="text-2xl font-bold">34</p>
            <p className="text-xs text-muted-foreground">High priority prospects</p>
          </div>

          {/* Cold Leads */}
          <div 
            className="rounded-xl p-4"
            style={{
              background: '#EDFAFF',
              borderTop: '0.8px solid #FFE2E2',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-xs font-medium text-blue-600">Cold Leads</span>
            </div>
            <p className="text-2xl font-bold">45</p>
            <p className="text-xs text-muted-foreground">High priority prospects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStatCards;
