import React from 'react';
import { Phone, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FollowUpItemProps {
  label: string;
  sublabel: string;
  count: number;
  bgStyle: React.CSSProperties;
}

const FollowUpItem: React.FC<FollowUpItemProps> = ({ label, sublabel, count, bgStyle }) => (
  <div 
    className="rounded-xl p-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
    style={bgStyle}
  >
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

const FollowUpsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border">
      <div className="flex items-center gap-2 mb-4">
        <Phone className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">Follow Ups</h3>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">Completion Rate</span>
          <span className="text-xs font-medium">76%</span>
        </div>
        <Progress value={76} className="h-2" />
      </div>

      <div className="space-y-3">
        <FollowUpItem
          label="Missed Follow-Ups"
          sublabel="Avg. delay 2.3 days"
          count={14}
          bgStyle={{
            background: 'linear-gradient(180deg, #FFF0ED 0%, #FFE5E0 100%)',
            borderTop: '2px solid #FF9980',
          }}
        />
        <FollowUpItem
          label="Today's Schedule"
          sublabel="8 urgent + 13 scheduled"
          count={21}
          bgStyle={{
            background: 'linear-gradient(180deg, #EEF6FF 0%, #FFFFFF 100%)',
            borderTop: '1px solid #D4E7FF',
          }}
        />
        <FollowUpItem
          label="Upcoming"
          sublabel="Next 3 days"
          count={14}
          bgStyle={{
            background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)',
            borderTop: '1px solid #BBF7D0',
          }}
        />
      </div>
    </div>
  );
};

export default FollowUpsCard;
