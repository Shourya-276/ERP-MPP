import React from 'react';
import { FileText, CreditCard, XCircle, ChevronRight, TrendingUp } from 'lucide-react';

interface AlertItemProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  iconBg: string;
}

const AlertItem: React.FC<AlertItemProps> = ({ icon, label, count, iconBg }) => (
  <div className="flex items-center justify-between py-3 border-b border-red-100 last:border-b-0">
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <span className="text-sm text-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-1">
      <span className="text-lg font-bold text-orange-600">{count}</span>
      <ChevronRight className="w-4 h-4 text-orange-500" />
    </div>
  </div>
);

const AlertsCard: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* My Achieved Target */}
      <div 
        className="rounded-2xl p-4"
        style={{
          background: 'linear-gradient(108.4deg, rgba(32, 219, 29, 0.2) 38.52%, rgba(195, 255, 194, 0.2) 101.88%)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm font-medium text-foreground">My Achieved Target</p>
        </div>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-3xl font-bold">132</span>
          <span className="text-sm text-muted-foreground">/250 Bookings done</span>
        </div>
        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
          <div className="h-full w-[53%] bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Alerts */}
      <div 
        className="rounded-2xl p-4"
        style={{
          background: 'linear-gradient(152.12deg, rgba(255, 41, 21, 0.3) 41.15%, rgba(232, 189, 189, 0.3) 90.76%)',
        }}
      >
        <h3 className="text-base font-semibold mb-2">Alerts</h3>
        
        <div>
          <AlertItem
            icon={<FileText className="w-4 h-4 text-red-500" />}
            label="Pending Registrations"
            count={20}
            iconBg="bg-red-100"
          />
          <AlertItem
            icon={<CreditCard className="w-4 h-4 text-green-600" />}
            label="Pending Payments"
            count={8}
            iconBg="bg-green-100"
          />
          <AlertItem
            icon={<XCircle className="w-4 h-4 text-red-500" />}
            label="Placeholder"
            count={3}
            iconBg="bg-red-100"
          />
        </div>
      </div>
    </div>
  );
};

export default AlertsCard;
