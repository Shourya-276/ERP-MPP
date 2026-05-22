import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DATE_OPTIONS = [
  { id: 'this-month', label: 'This month' },
  { id: 'last-month', label: 'Last month' },
  { id: '6-months', label: '6 months' },
  { id: 'custom', label: 'Custom Range' },
];

const IncentiveDateFilter = () => {
  const [selectedOption, setSelectedOption] = useState('this-month');
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '9 Sep 2025', to: '13 Sep 2025' });

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <Popover onOpenChange={(open) => { if (!open) setShowCalendar(false); }}>
      <PopoverTrigger asChild>
        <button className="p-2 text-gray-400 hover:text-[#4A1D59] transition-colors relative">
          <CalendarIcon className="w-4 h-4" />
          {selectedOption !== 'this-month' && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#4A1D59] rounded-full border border-white" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-none bg-transparent shadow-none" align="end" sideOffset={10}>
        {!showCalendar ? (
          <div className="w-[200px] bg-white rounded-[24px] p-4 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Select Date</h4>
            <div className="space-y-1">
              {DATE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedOption(option.id);
                    if (option.id === 'custom') {
                      setShowCalendar(true);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-[16px] transition-all group",
                    selectedOption === option.id ? "bg-[#FBF2FF] text-[#4A1D59]" : "hover:bg-gray-50 text-gray-500"
                  )}
                >
                  <span className={cn(
                    "text-xs font-bold",
                    selectedOption === option.id ? "text-[#4A1D59]" : "text-gray-600"
                  )}>
                    {option.label}
                  </span>
                  <div className={cn(
                    "w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center",
                    selectedOption === option.id ? "bg-[#4A1D59] border-[#4A1D59]" : "border-gray-200 group-hover:border-purple-200 bg-white"
                  )}>
                    {selectedOption === option.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-[280px] bg-white rounded-[32px] p-0 shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="p-5 pb-4 border-b border-gray-50 flex items-center justify-between text-center relative">
               <div className="flex-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">From</p>
                  <p className="text-[11px] font-black text-[#4A1D59]">{dateRange.from}</p>
               </div>
               <div className="w-[1px] h-8 bg-purple-100" />
               <div className="flex-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">To</p>
                  <p className="text-[11px] font-black text-[#4A1D59]">{dateRange.to}</p>
               </div>
            </div>

            {/* Controls */}
            <div className="p-4 flex items-center justify-between">
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors text-gray-400 hover:text-[#4A1D59]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <select className="text-[11px] font-black text-[#1a1a1a] bg-slate-50 border-none rounded-lg px-2 py-1 outline-none cursor-pointer">
                  <option>Sep</option>
                  <option>Oct</option>
                </select>
                <select className="text-[11px] font-black text-[#1a1a1a] bg-slate-50 border-none rounded-lg px-2 py-1 outline-none cursor-pointer">
                  <option>2025</option>
                  <option>2026</option>
                </select>
              </div>
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors text-gray-400 hover:text-[#4A1D59]">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="px-5 pb-6">
              <div className="grid grid-cols-7 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-[10px] font-black text-purple-300 text-center uppercase tracking-widest py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {/* Offset for Sep 2025 (starts on Monday) */}
                <div className="aspect-square" />
                {days.map((day) => {
                  const isStart = day === 9;
                  const isEnd = day === 13;
                  const isInRange = day > 9 && day < 13;

                  return (
                    <button
                      key={day}
                      className={cn(
                        "aspect-square text-[11px] font-bold rounded-lg flex items-center justify-center transition-all relative",
                        isStart || isEnd ? "bg-[#4A1D59] text-white shadow-md shadow-purple-200 z-10" : 
                        isInRange ? "bg-[#FBF2FF] text-[#4A1D59] rounded-none" : "text-gray-600 hover:bg-slate-50"
                      )}
                    >
                      {day}
                      {isStart && <div className="absolute left-full w-full h-full bg-[#FBF2FF] -z-10" />}
                      {isEnd && <div className="absolute right-full w-full h-full bg-[#FBF2FF] -z-10" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-gray-100 flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowCalendar(false)}
                className="flex-1 h-9 rounded-xl text-[10px] font-black uppercase tracking-widest border-gray-200 hover:bg-white text-gray-400"
              >
                Back
              </Button>
              <Button 
                className="flex-1 h-9 rounded-xl text-[10px] font-black uppercase tracking-widest bg-[#4A1D59] hover:bg-[#371D45] text-white shadow-lg shadow-purple-50"
              >
                Apply
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default IncentiveDateFilter;
