import React from 'react';
import saraIllustration from '@/assets/sara-illustration.png';

const GreetingCard: React.FC = () => {
  return (
    <div
      className="greeting-gradient rounded-[32px] p-6 md:p-8 relative flex-1 h-full overflow-hidden"
      style={{
        boxShadow: '0px 8px 10px -6px rgba(255, 240, 133, 0.5), 0px 20px 25px -12px rgba(255, 240, 133, 0.5)'
      }}
    >
      <div className="relative z-10 w-full pr-24 md:pr-0 md:w-[70%]">
        <span className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md text-[10px] md:text-xs px-3 py-1.5 rounded-full mb-4 font-bold text-[#4A1D59] border border-white/40 shadow-sm uppercase tracking-wider">
          ✨ Welcome Back
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1a1a] mb-4 tracking-tight leading-tight">Good Morning, Sara!</h2>
        
        <div className="flex flex-wrap items-center gap-y-2 gap-x-2 mb-4">
          <span className="text-sm font-semibold text-gray-600">You have</span>
          <span className="bg-[#AD46FF] text-white text-[10px] md:text-xs px-3 py-1.5 rounded-full font-bold shadow-lg shadow-purple-200 whitespace-nowrap">
            7 NEW LEADS
          </span>
          <span className="text-sm font-semibold text-gray-600">and</span>
          <span className="bg-[#AD46FF] text-white text-[10px] md:text-xs px-3 py-1.5 rounded-full font-bold shadow-lg shadow-purple-200 whitespace-nowrap">
            5 NOTIFICATIONS
          </span>
        </div>
        
        <p className="text-sm md:text-base text-gray-500 font-medium italic">Let's get started on your daily goals!</p>
      </div>

      {/* Sara illustration */}
      <div className="absolute -right-4 md:-right-6 -bottom-[20px] md:-bottom-[36px] flex items-end pointer-events-none select-none">
        <img
          src={saraIllustration}
          alt="Sara"
          className="h-[200px] md:h-[280px] object-contain drop-shadow-2xl brightness-105"
        />
      </div>
    </div>
  );
};

export default GreetingCard;
