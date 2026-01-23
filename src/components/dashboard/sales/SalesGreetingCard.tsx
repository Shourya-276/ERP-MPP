import React from 'react';
import salesTeamIllustration from '@/assets/sales-team-illustration.png';
import { Badge } from '@/components/ui/badge';

const SalesGreetingCard: React.FC = () => {
  return (
    <div 
      className="relative rounded-3xl p-6 overflow-hidden"
      style={{
        background: 'linear-gradient(95.19deg, #FFFAE5 0%, #FFF5D6 49.86%, #FFE780 99.71%)',
        height: '180px',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-amber-600">👋</span>
        <span className="text-sm font-medium text-amber-700">Welcome Back</span>
      </div>
      
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Good Morning, Sara!
      </h1>
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm text-muted-foreground">You have</span>
        <Badge className="bg-[#4A1D59] text-white text-xs px-2 py-0.5">7 new leads</Badge>
        <span className="text-sm text-muted-foreground">and</span>
        <Badge className="bg-amber-500 text-white text-xs px-2 py-0.5">5 notifications</Badge>
      </div>
      
      <p className="text-sm text-muted-foreground">Let's get started!</p>
      
      {/* Illustration */}
      <img 
        src={salesTeamIllustration} 
        alt="Sales Team" 
        className="absolute right-4 bottom-0 h-40 object-contain"
      />
    </div>
  );
};

export default SalesGreetingCard;
