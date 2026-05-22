import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  RotateCcw,
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
      className="w-full py-2.5 flex items-center justify-between group"
    >
      <span className={cn(
        "text-[10px] font-black transition-colors uppercase tracking-widest",
        isOpen ? "text-[#4A1D59]" : "text-gray-400 group-hover:text-gray-600"
      )}>
        {title}
      </span>
      <div className={cn(
        "w-5 h-5 rounded-md flex items-center justify-center transition-all",
        isOpen ? "bg-[#4A1D59] text-white" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
      )}>
        {isOpen ? <Minus className="w-2.5 h-2.5" /> : <Plus className="w-2.5 h-2.5" />}
      </div>
    </button>
    {isOpen && (
      <div className="pb-3 animate-in slide-in-from-top-1 duration-200">
        {children}
      </div>
    )}
  </div>
);

const RadioOption = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-2.5 py-1.5 group cursor-pointer"
  >
    <div className={cn(
      "w-3.5 h-3.5 rounded-full border-2 transition-all flex items-center justify-center",
      selected ? "border-[#4A1D59] bg-white" : "border-gray-200 group-hover:border-purple-200"
    )}>
      {selected && <div className="w-1.5 h-1.5 rounded-full bg-[#4A1D59]" />}
    </div>
    <span className={cn(
      "text-[11px] font-bold transition-colors",
      selected ? "text-[#1a1a1a]" : "text-gray-400 group-hover:text-gray-600"
    )}>
      {label}
    </span>
  </button>
);

const RegistrationFilterPanel: React.FC<FilterDropdownProps> = ({ onApply, onClear }) => {
  const [openSections, setOpenSections] = useState<string[]>(['Registration Status']);
  const [filters, setFilters] = useState({
    location: '',
    age: '',
    source: '',
    budget: '',
    status: 'All'
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };

  const locationOptions = ['Vikhroli', 'Ghatkopar', 'Chembur', 'Thane', 'Mulund'];
  const ageOptions = ['20 - 30', '31 - 40', '41 - 50', '51+'];
  const sourceOptions = ['Marketing', 'Pre-Sales', 'Referral', 'Channel Partner (CP)', 'Developer Reference'];
  const budgetOptions = ['71 lacs - 80 lacs', '81 lacs - 90 lacs', '90 lacs - 1 Cr', '1.01 Cr - 1.20 Cr', '1.20 Cr & Above'];
  const statusOptions = ['All', 'Registered', 'Not-Registered'];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="h-11 rounded-[16px] text-xs font-black text-gray-600 border-gray-100 px-5 bg-white hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2"
        >
          <Filter className="w-4 h-4 text-[#4A1D59]" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0 border border-gray-100 bg-white shadow-2xl rounded-[24px] overflow-hidden" align="end" sideOffset={8}>
        {/* Header */}
        <div className="p-4 pb-3 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-[11px] font-black text-[#4A1D59] tracking-tight uppercase">Filters</h2>
          <button 
            onClick={() => {
              setFilters({
                location: '',
                age: '',
                source: '',
                budget: '',
                status: 'All'
              });
              onClear?.();
            }}
            className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-red-400 transition-all group"
          >
            <RotateCcw className="w-2.5 h-2.5 group-hover:rotate-[-45deg] transition-transform" />
            Clear
          </button>
        </div>

        {/* Filter List */}
        <ScrollArea className="max-h-[320px] px-4">
          <div className="py-1">
            <FilterSection 
              title="Location" 
              isOpen={openSections.includes('Location')} 
              onToggle={() => toggleSection('Location')}
            >
              <div className="space-y-1">
                {locationOptions.map(opt => (
                  <RadioOption 
                    key={opt} 
                    label={opt} 
                    selected={filters.location === opt} 
                    onClick={() => setFilters(prev => ({ ...prev, location: opt }))} 
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection 
              title="Age" 
              isOpen={openSections.includes('Age')} 
              onToggle={() => toggleSection('Age')}
            >
              <div className="space-y-1">
                {ageOptions.map(opt => (
                  <RadioOption 
                    key={opt} 
                    label={opt} 
                    selected={filters.age === opt} 
                    onClick={() => setFilters(prev => ({ ...prev, age: opt }))} 
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection 
              title="Source" 
              isOpen={openSections.includes('Source')} 
              onToggle={() => toggleSection('Source')}
            >
              <div className="space-y-1">
                {sourceOptions.map(opt => (
                  <RadioOption 
                    key={opt} 
                    label={opt} 
                    selected={filters.source === opt} 
                    onClick={() => setFilters(prev => ({ ...prev, source: opt }))} 
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection 
              title="Budget" 
              isOpen={openSections.includes('Budget')} 
              onToggle={() => toggleSection('Budget')}
            >
              <div className="space-y-1">
                {budgetOptions.map(opt => (
                  <RadioOption 
                    key={opt} 
                    label={opt} 
                    selected={filters.budget === opt} 
                    onClick={() => setFilters(prev => ({ ...prev, budget: opt }))} 
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection 
              title="Registration Status" 
              isOpen={openSections.includes('Registration Status')} 
              onToggle={() => toggleSection('Registration Status')}
            >
              <div className="space-y-1">
                {statusOptions.map(opt => (
                  <RadioOption 
                    key={opt} 
                    label={opt} 
                    selected={filters.status === opt} 
                    onClick={() => setFilters(prev => ({ ...prev, status: opt }))} 
                  />
                ))}
              </div>
            </FilterSection>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-gray-50 bg-white">
          <Button 
            onClick={onApply}
            className="w-full h-9 rounded-lg bg-[#4A1D59] hover:bg-[#371D45] text-white font-black text-[9px] uppercase tracking-widest shadow-lg shadow-purple-50 active:scale-[0.98] transition-all"
          >
             Show Results
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RegistrationFilterPanel;
