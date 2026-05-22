import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  RotateCcw,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterDropdownProps {
  onApply?: () => void;
  onClear?: () => void;
}

const FilterSection = ({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}: { 
  title: string; 
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode 
}) => (
  <div className="border-b border-gray-100 last:border-none">
    <button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className="w-full py-4 flex items-center justify-between group"
    >
      <span className={cn(
        "text-[11px] font-black transition-colors uppercase tracking-widest",
        isOpen ? "text-[#371D45]" : "text-gray-400 group-hover:text-gray-600"
      )}>
        {title}
      </span>
      <div className={cn(
        "w-6 h-6 rounded-lg flex items-center justify-center transition-all",
        isOpen ? "bg-[#371D45] text-white" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
      )}>
        {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
      </div>
    </button>
    {isOpen && (
      <div className="pb-4 animate-in slide-in-from-top-2 duration-200">
        {children}
      </div>
    )}
  </div>
);

const LeadsFilterDropdown: React.FC<FilterDropdownProps> = ({ onApply, onClear }) => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };

  const statusOptions = ['Hot', 'Warm', 'Cold', 'Lost', 'Revisit'];
  const sourceOptions = ['99 Acres', 'Housing', 'Facebook', 'Google'];
  const locationOptions = ['Vikhroli', 'Ghatkopar', 'Mulund', 'Thane'];
  const budgetOptions = ['< 50 L', '50 L - 1 Cr', '1 Cr - 2 Cr', '> 2 Cr'];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="h-11 rounded-[16px] text-xs font-bold text-gray-600 border-gray-100 px-5 bg-white hover:bg-slate-50 shadow-sm"
        >
          <Filter className="w-4 h-4 mr-2 text-gray-400" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0 border-none bg-white shadow-2xl rounded-[32px] overflow-hidden" align="end">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-black text-[#371D45] tracking-tight uppercase">Filters</h2>
          <button 
            onClick={() => {
              setOpenSections([]);
              onClear?.();
            }}
            className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-400 transition-all group"
          >
            <RotateCcw className="w-3 h-3 group-hover:rotate-[-45deg] transition-transform" />
            Clear
          </button>
        </div>

        {/* Filter List */}
        <ScrollArea className="max-h-[400px] px-6">
          <div className="py-2">
            <FilterSection 
              title="Status" 
              isOpen={openSections.includes('Status')} 
              onToggle={() => toggleSection('Status')}
            >
              <div className="flex flex-wrap gap-1.5">
                {statusOptions.map(opt => (
                  <button 
                    key={opt}
                    className="px-3 py-1.5 rounded-lg border border-gray-100 text-[10px] font-black text-gray-500 hover:border-[#371D45] hover:text-[#371D45] transition-all bg-white"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection 
              title="Location" 
              isOpen={openSections.includes('Location')} 
              onToggle={() => toggleSection('Location')}
            >
              <div className="grid grid-cols-2 gap-1.5">
                {locationOptions.map(opt => (
                  <button 
                    key={opt}
                    className="px-3 py-2 rounded-lg border border-gray-100 text-[10px] font-black text-gray-500 hover:border-[#371D45] hover:text-[#371D45] transition-all bg-white text-left"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection 
              title="Source" 
              isOpen={openSections.includes('Source')} 
              onToggle={() => toggleSection('Source')}
            >
              <div className="flex flex-wrap gap-1.5">
                {sourceOptions.map(opt => (
                  <button 
                    key={opt}
                    className="px-3 py-1.5 rounded-full border border-gray-50 text-[9px] font-black text-gray-400 hover:bg-[#FBF2FF] hover:border-purple-200 hover:text-[#371D45] transition-all uppercase"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection 
              title="Budget" 
              isOpen={openSections.includes('Budget')} 
              onToggle={() => toggleSection('Budget')}
            >
              <div className="grid grid-cols-2 gap-1.5">
                {budgetOptions.map(opt => (
                  <button 
                    key={opt}
                    className="px-3 py-2 rounded-lg border border-gray-100 text-[10px] font-black text-gray-500 hover:border-[#371D45] hover:text-[#371D45] transition-all bg-white"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </FilterSection>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50 bg-white">
          <Button 
            onClick={onApply}
            className="w-full h-10 rounded-xl bg-[#371D45] hover:bg-[#25132F] text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-purple-50 active:scale-[0.98] transition-all"
          >
             Show Results
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LeadsFilterDropdown;
