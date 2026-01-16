import React from 'react';
import { Calendar, Users, UserCheck, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant: 'visit' | 'revisit' | 'assigned' | 'total';
}

const iconMap = {
  visit: Calendar,
  revisit: Users,
  assigned: UserCheck,
  total: TrendingUp,
};

const iconBgMap = {
  visit: 'bg-blue-100',
  revisit: 'bg-purple-100',
  assigned: 'bg-pink-100',
  total: 'bg-orange-100',
};

const iconColorMap = {
  visit: 'text-blue-500',
  revisit: 'text-purple-500',
  assigned: 'text-pink-500',
  total: 'text-orange-500',
};

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, trend, variant }) => {
  const Icon = iconMap[variant];

  return (
    <div 
      className={`stat-${variant} rounded-2xl p-4 border border-transparent flex-1 min-w-[200px]`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className={`w-9 h-9 rounded-xl ${iconBgMap[variant]} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColorMap[variant]}`} />
        </div>
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${
            trend.isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend.isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trend.value}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
};

const StatCards: React.FC = () => {
  return (
    <div className="flex gap-4">
      <StatCard
        title="Visit Line-up"
        value={27}
        subtitle="Upcoming visits"
        trend={{ value: '+5.2%', isPositive: true }}
        variant="visit"
      />
      <StatCard
        title="Revisits Line-up"
        value={13}
        subtitle="Returning customers"
        trend={{ value: '+8.2%', isPositive: true }}
        variant="revisit"
      />
      <StatCard
        title="Assigned / Pending"
        value="11/16"
        subtitle="Lead Status"
        variant="assigned"
      />
      <StatCard
        title="Total Visits + Revisits"
        value={45}
        subtitle=""
        trend={{ value: '-5.2%', isPositive: false }}
        variant="total"
      />
    </div>
  );
};

export default StatCards;
