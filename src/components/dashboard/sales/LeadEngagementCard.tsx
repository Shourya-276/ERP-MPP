import React from 'react';
import { Phone, ChevronRight } from 'lucide-react';

interface EngagementItemProps {
  label: string;
  sublabel: string;
  count: number;
  color: string;
}

const EngagementItem: React.FC<{
  label: string;
  sublabel: string;
  count: number;
  dotColor: string;
  bgGradient: string;
  borderColor: string;
}> = ({ label, sublabel, count, dotColor, bgGradient, borderColor }) => (
  <div
    className="rounded-xl p-3 mb-3 last:mb-0 border border-gray-100"
    style={{
      background: bgGradient,
      borderTop: `1px solid ${borderColor}`
    }}
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
          <p className={`text-base font-semibold ${dotColor.replace('bg-', 'text-')}`}>{label}</p>
          <Phone className={`w-3.5 h-3.5 ${dotColor.replace('bg-', 'text-')}`} />
        </div>
        <p className="text-xs text-muted-foreground ml-4">{sublabel}</p>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-2xl font-bold text-foreground">{count}</span>
        <ChevronRight className={`w-4 h-4 ${dotColor.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </div>
);

const LeadEngagementCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFEFD4 100%)' }}
        >
          <React.Fragment>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21C15.5 21 14 20.5 12.5 19.5C11 18.5 9.5 17.5 8.5 16C7.5 14.5 6.5 13 5.5 11.5C4.5 10 4 8.5 4 7C4 5.34315 5.34315 4 7 4H9C9.55228 4 10 4.44772 10 5V8C10 8.55228 9.55228 9 9 9H7.5C7.5 9.5 7.6 10 7.8 10.5C8 11 8.3 11.5 8.7 12C9.1 12.5 9.6 13 10.2 13.4C10.8 13.8 11.5 14.1 12.2 14.3C12.9 14.5 13.6 14.5 14.3 14.5V13C14.3 12.4477 14.7477 12 15.3 12H18.3C18.8523 12 19.3 12.4477 19.3 13V15.3C19.3 16.9569 17.9569 18.3 16.3 18.3H16" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </React.Fragment>
        </div>
        <h3 className="text-base font-bold text-foreground">Lead Engagement</h3>
      </div>

      <div className="space-y-3">
        <EngagementItem
          label="0-3 Calls"
          sublabel="Fresh Leads"
          count={18}
          dotColor="bg-[#F87171]" // Red-400
          bgGradient="linear-gradient(180deg, #FFF5F5 0%, #FFFFFF 100%)"
          borderColor="#FFCCCB"
        />
        <EngagementItem
          label="4-7 Calls"
          sublabel="Callbacks"
          count={2}
          dotColor="bg-[#FBBF24]" // Amber-400
          bgGradient="linear-gradient(180deg, #FFFBF0 0%, #FFFFFF 100%)"
          borderColor="#FFE4B3"
        />
        <EngagementItem
          label="8+ Calls"
          sublabel="Potentially dead leads"
          count={32}
          dotColor="bg-[#2DD4BF]" // Teal-400
          bgGradient="linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 100%)"
          borderColor="#99F6E4"
        />
      </div>
    </div>
  );
};

export default LeadEngagementCard;
