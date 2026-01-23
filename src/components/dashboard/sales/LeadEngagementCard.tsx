import React from 'react';
import { Phone, ChevronRight } from 'lucide-react';

interface EngagementItemProps {
  label: string;
  sublabel: string;
  count: number;
  color: string;
}

const EngagementItem: React.FC<EngagementItemProps> = ({ label, sublabel, count, color }) => (
  <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
    <div className="flex items-center gap-3">
      <span className={`w-2 h-2 rounded-full ${color}`}></span>
      <div>
        <p className="text-sm font-medium flex items-center gap-1">
          {label}
          <Phone className="w-3 h-3 text-muted-foreground" />
        </p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
    </div>
    <div className="flex items-center gap-1">
      <span className="text-lg font-bold">{count}</span>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
  </div>
);

const LeadEngagementCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border">
      <div className="flex items-center gap-2 mb-4">
        <Phone className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">Lead Engagement</h3>
      </div>

      <div>
        <EngagementItem
          label="0-3 Calls"
          sublabel="Fresh Leads"
          count={18}
          color="bg-green-500"
        />
        <EngagementItem
          label="4-7 Calls"
          sublabel="Callbacks"
          count={2}
          color="bg-amber-500"
        />
        <EngagementItem
          label="8+ Calls"
          sublabel="Potentially dead leads"
          count={32}
          color="bg-red-500"
        />
      </div>
    </div>
  );
};

export default LeadEngagementCard;
