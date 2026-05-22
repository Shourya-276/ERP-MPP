import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateTimePickerProps {
  onSet: (date: string) => void;
  onCancel: () => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onSet, onCancel }) => {
  const [selectedDay, setSelectedDay] = useState(5);
  const [hour, setHour] = useState('04');
  const [minute, setMinute] = useState('40');
  const [ampm, setAmpm] = useState('PM');

  const adjustHour = (delta: number) => {
    let h = parseInt(hour) + delta;
    if (h > 12) h = 1;
    if (h < 1) h = 12;
    setHour(h.toString().padStart(2, '0'));
  };

  const adjustMinute = (delta: number) => {
    let m = parseInt(minute) + delta;
    if (m > 59) m = 0;
    if (m < 0) m = 59;
    setMinute(m.toString().padStart(2, '0'));
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-[320px] bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="bg-[#EAE2F1] p-4 flex items-center justify-between">
        <button className="p-1 hover:bg-white/20 rounded-full transition-colors text-[#371D45]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-base font-black text-[#371D45]">October 2025</span>
        <button className="p-1 hover:bg-white/20 rounded-full transition-colors text-[#371D45]">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map(day => (
            <span key={day} className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest">{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {/* Empty slots for spacing if needed, but here we just list 1-31 */}
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center text-xs font-black transition-all",
                selectedDay === day 
                  ? "bg-[#371D45] text-white shadow-lg" 
                  : "text-gray-600 hover:bg-purple-50"
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-50 mx-6"></div>

      {/* Time Picker */}
      <div className="p-6">
        <div className="flex items-center justify-center gap-4">
          {/* Hours */}
          <div className="flex flex-col items-center gap-1">
            <button 
              onClick={() => adjustHour(1)}
              className="text-gray-400 hover:text-[#371D45] transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <div className="bg-[#FFF9E7] border border-[#FFE7A5]/40 rounded-xl w-14 h-14 flex items-center justify-center text-xl font-black text-[#371D45]">
              {hour}
            </div>
            <button 
              onClick={() => adjustHour(-1)}
              className="text-gray-400 hover:text-[#371D45] transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xl font-black text-[#371D45] pt-2">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center gap-1">
            <button 
              onClick={() => adjustMinute(1)}
              className="text-gray-400 hover:text-[#371D45] transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <div className="bg-[#FFF9E7] border border-[#FFE7A5]/40 rounded-xl w-14 h-14 flex items-center justify-center text-xl font-black text-[#371D45]">
              {minute}
            </div>
            <button 
              onClick={() => adjustMinute(-1)}
              className="text-gray-400 hover:text-[#371D45] transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* AM/PM */}
          <div className="flex flex-col items-center gap-1 py-5">
            <div 
              onClick={() => setAmpm(ampm === 'AM' ? 'PM' : 'AM')}
              className="bg-[#FFF9E7] border border-[#FFE7A5]/40 rounded-xl w-14 h-14 flex items-center justify-center text-base font-black text-[#371D45] cursor-pointer hover:bg-[#FFF4D1] transition-all"
            >
              {ampm}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 pt-0 flex items-center justify-around">
        <button 
          onClick={onCancel}
          className="text-lg font-black text-[#371D45] hover:opacity-70 transition-opacity"
        >
          Cancel
        </button>
        <button 
          onClick={() => onSet(`${selectedDay}/10/2025, ${hour}:${minute} ${ampm}`)}
          className="text-lg font-black text-[#371D45] hover:opacity-70 transition-opacity"
        >
          Set
        </button>
      </div>
    </div>
  );
};

export default DateTimePicker;
