import React from 'react';
import { AlertCircle, CreditCard, MapPin } from 'lucide-react';

interface AlertItemProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  iconBg: string;
}

const AlertItem: React.FC<AlertItemProps> = ({ icon, label, count, iconBg }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
      {count}
    </span>
  </div>
);

const AlertsCard: React.FC = () => {
  return (
    <div 
      className="rounded-2xl p-4"
      style={{
        background: 'linear-gradient(152.12deg, rgba(255, 41, 21, 0.3) 41.15%, rgba(232, 189, 189, 0.3) 90.76%)',
      }}
    >
      <h3 className="text-sm font-semibold mb-3">Alerts</h3>
      
      <div className="space-y-1">
        <AlertItem
          icon={<AlertCircle className="w-4 h-4 text-amber-600" />}
          label="Pending Registrations"
          count={20}
          iconBg="bg-amber-100"
        />
        <AlertItem
          icon={<CreditCard className="w-4 h-4 text-green-600" />}
          label="Pending Payments"
          count={8}
          iconBg="bg-green-100"
        />
        <AlertItem
          icon={<MapPin className="w-4 h-4 text-blue-600" />}
          label="Placeholder"
          count={3}
          iconBg="bg-blue-100"
        />
      </div>
    </div>
  );
};

export default AlertsCard;
