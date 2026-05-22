import React, { useState } from 'react';
import { 
  Settings, 
  Columns,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const allColumns = [
  "Sr no",
  "Month",
  "Budget",
  "Date",
  "Client name",
  "Contact Number",
  "Location",
  "Configuration",
  "Source",
  "Sub Source",
  "Sales Manager",
  "Sourcing Manager",
  "Purpose",
  "OC",
  "Loan",
  "SOP",
  "Remark"
];

const ColumnModifierDropdown = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(["Sr no", "Date", "Client name", "Contact Number", "Remark", "Source"]);

  const toggleColumn = (col: string) => {
    setSelectedColumns(prev => 
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-11 rounded-[16px] text-xs font-bold text-gray-600 border-gray-100 px-5 bg-white hover:bg-slate-50 shadow-sm">
          <Columns className="w-4 h-4 mr-2 text-gray-400" /> Column Modifier
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-5 border-none bg-white shadow-2xl rounded-[28px] animate-in zoom-in-95 duration-200" align="end">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#371D45]" />
            <h2 className="text-sm font-black text-[#371D45] tracking-tight uppercase">Column Modifier</h2>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setSelectedColumns([])}
              className="flex-1 h-8 rounded-lg border-gray-100 text-[10px] font-black text-gray-400 hover:bg-gray-50 transition-all uppercase tracking-widest"
            >
              Clear
            </Button>
            <Button 
              onClick={() => setSelectedColumns([...allColumns])}
              className="flex-1 h-8 rounded-lg bg-[#5C3471] hover:bg-[#4A295C] text-white text-[10px] font-black shadow-md shadow-purple-50 transition-all uppercase tracking-widest"
            >
              All
            </Button>
          </div>

          {/* Columns List */}
          <ScrollArea className="h-[320px] pr-2">
            <div className="space-y-3">
              {allColumns.map((col) => (
                <div key={col} className="flex items-center space-x-3 group cursor-pointer" onClick={() => toggleColumn(col)}>
                  <div className={`w-4 h-4 rounded-md border-2 transition-all flex items-center justify-center ${
                    selectedColumns.includes(col) 
                      ? "bg-[#371D45] border-[#371D45]" 
                      : "border-gray-200 group-hover:border-purple-200"
                  }`}>
                    {selectedColumns.includes(col) && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <span className={`text-[11px] font-bold transition-colors ${
                    selectedColumns.includes(col) ? "text-[#371D45]" : "text-gray-400 group-hover:text-gray-600"
                  }`}>
                    {col}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnModifierDropdown;
