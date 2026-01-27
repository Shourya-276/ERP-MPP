import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CalendarWidget: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderDays = () => {
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

      days.push(
        <div key={day} className="flex justify-center">
          <button
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${isToday
              ? 'bg-[#F3E8FF] text-[#4A1D59] font-bold'
              : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            {day}
          </button>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between shrink-0"
        style={{ background: 'linear-gradient(90deg, #E9D4FF 0%, #DAB2FF 100%)' }}
      >
        <button onClick={prevMonth} className="text-[#4A1D59] hover:bg-black/5 rounded-full p-1">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-bold text-[#4A1D59] text-base">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button onClick={nextMonth} className="text-[#4A1D59] hover:bg-black/5 rounded-full p-1">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        {/* Days of week */}
        <div className="grid grid-cols-7 mb-2 shrink-0">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-[11px] text-gray-400 font-medium uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-y-0.5 flex-1 items-center content-center">
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
