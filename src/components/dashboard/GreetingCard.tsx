import React from 'react';
import saraIllustration from '@/assets/sara-illustration.png';

const GreetingCard: React.FC = () => {
  return (
    <div 
      className="greeting-gradient rounded-3xl p-5 relative overflow-hidden flex-1"
      style={{ minWidth: '500px', height: '200px' }}
    >
      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 bg-white/80 text-xs px-3 py-1 rounded-full mb-2">
          ✨ Welcome Back
        </span>
        <h2 className="text-2xl font-bold text-foreground mb-2">Good Morning, Sara!</h2>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">You have</span>
          <span className="bg-primary text-primary-foreground text-xs px-2.5 py-0.5 rounded-full font-medium">
            7 new leads
          </span>
          <span className="text-sm">and</span>
          <span className="bg-primary text-primary-foreground text-xs px-2.5 py-0.5 rounded-full font-medium">
            5 notifications
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Let's get started!</p>
      </div>
      
      {/* Sara illustration */}
      <div className="absolute right-2 bottom-0 h-full flex items-end">
        <img 
          src={saraIllustration} 
          alt="Sara" 
          className="h-[180px] object-contain"
        />
      </div>
    </div>
  );
};

export default GreetingCard;
