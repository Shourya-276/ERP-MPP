import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection = ({ title, isOpen, onToggle, children }: FilterSectionProps) => (
  <div className="space-y-1">
    <button 
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
      className="w-full h-12 px-4 rounded-xl flex items-center justify-between bg-[#F1F5F9]/50 hover:bg-[#F1F5F9] transition-all group"
    >
      <span className="text-sm font-black text-gray-700">{title}</span>
      <div className="text-gray-400">
        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </div>
    </button>
    {isOpen && (
      <div className="px-6 py-2 space-y-3 animate-in slide-in-from-top-2 duration-200">
        {children}
      </div>
    )}
  </div>
);

const RadioOption = ({ label, isSelected, onClick }: { label: string; isSelected: boolean; onClick: () => void }) => (
  <div 
    className="flex items-center gap-3 cursor-pointer group"
    onClick={onClick}
  >
    <div className={cn(
      "w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center",
      isSelected ? "border-[#4A1D59]" : "border-gray-200 group-hover:border-purple-200"
    )}>
      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#4A1D59]" />}
    </div>
    <span className={cn(
      "text-xs font-bold transition-colors",
      isSelected ? "text-[#4A1D59]" : "text-gray-400 group-hover:text-gray-600"
    )}>
      {label}
    </span>
  </div>
);

const SiteVisitFilterDropdown = () => {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({
    Location: 'Vikhroli',
    Age: '18 to 25',
    Source: 'Marketing',
    Budget: '71 lacs - 80 lacs'
  });

  const sections = {
    Location: ['Vikhroli', 'Ghatkopar', 'Chembur', 'Thane', 'Mulund'],
    Age: ['18 to 25', '26 to 35', '36 to 45', '46 to 55', '56 +'],
    Source: ['Marketing', 'Pre-Sales', 'Referral', 'Channel Partner (CP)', 'Developer Reference'],
    Budget: ['71 lacs - 80 lacs', '81 lacs - 90 lacs', '90 lacs - 1 Cr', '1.01 Cr - 1.20 Cr', '1.20 Cr & Above']
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="h-11 rounded-[16px] text-xs font-bold text-gray-600 border-gray-100 px-5 bg-white hover:bg-slate-50 shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2 text-gray-400" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 border-none bg-white shadow-2xl rounded-[32px] overflow-hidden" align="end">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-50 bg-white">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#1a1a1a]" />
            <h2 className="text-sm font-black text-[#1a1a1a] tracking-tight">Filter</h2>
          </div>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter List */}
        <ScrollArea className="max-h-[500px] p-4">
          <div className="space-y-2">
            {(Object.keys(sections) as Array<keyof typeof sections>).map((title) => (
              <FilterSection 
                key={title}
                title={title}
                isOpen={openSection === title}
                onToggle={() => setOpenSection(openSection === title ? null : title)}
              >
                {sections[title].map(opt => (
                  <RadioOption 
                    key={opt}
                    label={opt}
                    isSelected={selections[title] === opt}
                    onClick={() => setSelections(prev => ({ ...prev, [title]: opt }))}
                  />
                ))}
              </FilterSection>
            ))}
          </div>
        </ScrollArea>

        {/* Apply Button */}
        <div className="p-6 pt-2">
          <Button className="w-full h-11 rounded-2xl bg-[#371D45] hover:bg-[#25132F] text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-50 active:scale-[0.98] transition-all">
             Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SiteVisitFilterDropdown;
