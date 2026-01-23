import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CalendarWidget: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const realToday = new Date();

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
      days.push(<div key={`empty-${i}`} className="h-7 w-7" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === realToday.getDate() &&
        currentDate.getMonth() === realToday.getMonth() &&
        currentDate.getFullYear() === realToday.getFullYear();

      days.push(
        <button
          key={day}
          className={`h-7 w-7 rounded-full text-xs flex items-center justify-center transition-colors ${isToday
            ? 'bg-[#F3E8FF] text-[#4A1D59] font-medium'
            : 'hover:bg-muted text-foreground'
            }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div
      className="bg-white rounded-2xl p-3 shadow-sm border flex-shrink-0"
      style={{ width: '280px' }}
    >
      {/* Header */}
      {/* Header */}
      <div
        className="flex items-center justify-between mb-3 rounded-lg px-3 py-2"
        style={{ background: 'linear-gradient(90deg, #E9D4FF 0%, #DAB2FF 100%)' }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={prevMonth}
          className="text-[#4A1D59] hover:bg-white/20 h-6 w-6"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold text-[#4A1D59] text-sm">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMonth}
          className="text-[#4A1D59] hover:bg-white/20 h-6 w-6"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="h-7 w-7 flex items-center justify-center text-[10px] text-muted-foreground font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {renderDays()}
      </div>
    </div>
  );
};

export default CalendarWidget;
