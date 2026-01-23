import React from 'react';
import saraIllustration from '@/assets/sara-illustration.png';

const GreetingCard: React.FC = () => {
  return (
    <div
      className="greeting-gradient rounded-3xl p-5 relative flex-1"
      style={{
        minWidth: '500px',
        height: '200px',
        borderTop: '1px solid #FFF08580',
        boxShadow: '0px 8px 10px -6px #FFF08580, 0px 20px 25px -12px #FFF08580'
      }}
    >
      <div className="relative z-10 w-[75%] h-full flex flex-col justify-center">
        <span className="inline-flex items-center gap-1.5 bg-white/80 text-xs px-3 py-1 rounded-full mb-2 self-start">
          ✨ Welcome Back
        </span>
        <h2 className="text-2xl font-bold text-foreground mb-2">Good Morning, Sara!</h2>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">You have</span>
          <span className="bg-[#AD46FF] text-white text-xs px-2.5 py-0.5 rounded-full font-medium">
            7 new leads
          </span>
          <span className="text-sm">and</span>
          <span className="bg-[#AD46FF] text-white text-xs px-2.5 py-0.5 rounded-full font-medium">
            5 notifications
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Let's get started!</p>
      </div>

      {/* Sara illustration */}
      <div className="absolute -right-4 -bottom-[36px] flex items-end pointer-events-none">
        <img
          src={saraIllustration}
          alt="Sara"
          className="h-[255px] object-contain"
        />
      </div>
    </div>
  );
};

export default GreetingCard;
