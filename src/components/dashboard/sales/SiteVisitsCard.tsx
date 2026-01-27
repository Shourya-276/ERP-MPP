import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface VisitItemProps {
  label: string;
  sublabel: string;
  count: number;
  bgStyle: React.CSSProperties;
  badge?: number;
}

const VisitItem: React.FC<VisitItemProps> = ({ label, sublabel, count, bgStyle, badge }) => (
  <div
    className="rounded-xl p-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity relative"
    style={bgStyle}
  >
    {badge && (
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
        {badge}
      </span>
    )}
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground">{sublabel}</p>
    </div>
    <div className="flex items-center gap-1">
      <span className="text-lg font-bold">{count}</span>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
  </div>
);

const SiteVisitsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #F3EDFF 0%, #E9DCFF 100%)' }}
        >
          <MapPin className="w-5 h-5 text-[#8B5CF6]" />
        </div>
        <h3 className="text-base font-bold text-foreground">Site Visits</h3>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">Completion Rate</span>
          <span className="text-sm font-bold text-[#8B5CF6]">90%</span>
        </div>
        <div className="h-2 w-full bg-[#F0E8FF] rounded-full overflow-hidden">
          <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '90%' }} />
        </div>
      </div>

      <div className="space-y-3">
        <VisitItem
          label="Missed Visits"
          sublabel="Reschedule immediately"
          count={2}
          badge={1}
          bgStyle={{
            background: 'linear-gradient(180deg, #FFF0ED 0%, #FFE5E0 100%)',
            borderTop: '2px solid #FF9980',
          }}
        />
        <VisitItem
          label="Today's Visits"
          sublabel="Next visit: 3:30 PM (45 min)"
          count={18}
          bgStyle={{
            background: 'linear-gradient(180deg, #EEF6FF 0%, #FFFFFF 100%)',
            borderTop: '1px solid #D4E7FF',
          }}
        />
        <VisitItem
          label="Upcoming Visits"
          sublabel="Next 3 days"
          count={32}
          bgStyle={{
            background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)',
            borderTop: '1px solid #BBF7D0',
          }}
        />
      </div>
    </div>
  );
};

export default SiteVisitsCard;
