import React from 'react';
import { FileText, CreditCard, XCircle, ChevronRight, TrendingUp } from 'lucide-react';

interface AlertItemProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  iconBg: string;
}

const AlertItem: React.FC<AlertItemProps> = ({ icon, label, count }) => (
  <div className="flex items-center justify-between pl-3 py-3 pr-0 mb-3 bg-white/40 rounded-2xl shadow-sm border border-white/20 last:mb-0">
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-white/80 to-white/20 shadow-inner border border-white/40 text-red-500">
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5 text-red-500" })}
      </div>
      <span className="text-sm font-bold text-gray-800 leading-tight">{label}</span>
    </div>
    <div className="flex items-center gap-0.5 shrink-0 ml-4">
      <span className="text-2xl font-bold text-[#DC2626]">{count}</span>
      <ChevronRight className="w-6 h-6 text-[#DC2626]" />
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
        className="rounded-2xl p-5 min-h-[350px] flex flex-col"
        style={{
          background: 'linear-gradient(152.12deg, rgba(255, 41, 21, 0.3) 41.15%, rgba(232, 189, 189, 0.3) 90.76%)',
        }}
      >
        <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Alerts</h3>

        <div className="flex-1 space-y-3">
          <AlertItem
            icon={<FileText />}
            label="Pending Registrations"
            count={20}
            iconBg=""
          />
          <AlertItem
            icon={<CreditCard />}
            label="Pending Payments"
            count={8}
            iconBg=""
          />
          <AlertItem
            icon={<XCircle />}
            label="Placeholder"
            count={3}
            iconBg=""
          />
        </div>
      </div>
    </div>
  );
};

export default AlertsCard;
