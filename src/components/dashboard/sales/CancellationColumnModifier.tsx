import React, { useState } from 'react';
import { Settings, Check } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const CANCELLATION_COLUMNS = [
  "Sr no",
  "Booking Date",
  "Month/Year",
  "1st Applicant",
  "2nd Applicant Name",
  "Contact No.",
  "Flat No.",
  "Wing",
  "Configuration",
  "RERA Carpet",
  "Registration",
  "1st App. Aadhar Card",
  "2nd App. Aadhar Card",
  "1st App. PAN No.",
  "2nd App. PAN No.",
  "Email Address",
  "Resident Add.",
  "Location",
  "Booking Scheme",
  "Source",
  "Source Name",
  "Telecallers/Exe",
  "Sales Manager",
  "Closing Manager",
  "Broker's Details",
  "Floor No.",
  "Rera Carpet",
  "Per sq.ft rate",
  "Rate Chart PSF",
  "Difference (PSF)",
  "Agreement Value",
  "Car Park Value",
  "AV + Car Park Value",
  "Final AV Value",
  "GST (5%)",
  "Stamp Duty (6%)",
  "Registration Chgs",
  "Misc. Expenses",
  "Other Charges",
  "Total All-Inclusive",
  "Car Parking (POS)",
  "GST on CP (POS)",
  "Booked in",
  "Bank Name (Loan)",
  "Loan Amount",
  "Banker Name",
  "Banker Contact",
  "Cancellation Date",
  "Cancellation Remark"
];

export default function CancellationColumnModifier() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(["Sr no", "1st Applicant", "Contact No.", "Wing", "Floor No.", "Flat No.", "Agreement Value", "Total All-Inclusive", "Cancellation Remark"]);

  const toggleColumn = (column: string) => {
    setSelectedColumns(prev =>
      prev.includes(column)
        ? prev.filter(c => c !== column)
        : [...prev, column]
    );
  };

  const selectAll = () => setSelectedColumns(CANCELLATION_COLUMNS);
  const clearAll = () => setSelectedColumns([]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="h-11 rounded-[16px] text-xs font-black text-gray-600 border-gray-100 px-5 bg-white hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2"
        >
          <Settings className="w-4 h-4 text-[#4A1D59]" />
          Column Modifier
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-3 bg-white border border-gray-100 shadow-2xl rounded-[20px]" align="end" sideOffset={8}>
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-gray-50">
            <Settings className="w-3.5 h-3.5 text-[#4A1D59]" />
            <h4 className="font-black text-[#1a1a1a] text-[11px] uppercase tracking-tight">Column Modifier</h4>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={clearAll}
              className="flex-1 h-7 rounded-lg text-[9px] font-black uppercase tracking-widest border-gray-100 hover:bg-slate-50 text-gray-500"
            >
              Clear
            </Button>
            <Button 
              onClick={selectAll}
              className="flex-1 h-7 rounded-lg text-[9px] font-black uppercase tracking-widest bg-[#4A1D59] hover:bg-[#371D45] text-white"
            >
              All
            </Button>
          </div>

          <ScrollArea className="h-[300px] pr-2">
            <div className="space-y-0.5">
              {CANCELLATION_COLUMNS.map((column) => (
                <div
                  key={column}
                  onClick={() => toggleColumn(column)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer group transition-colors"
                >
                  <div className={cn(
                    "w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center",
                    selectedColumns.includes(column) 
                      ? "bg-[#4A1D59] border-[#4A1D59]" 
                      : "border-slate-200 group-hover:border-purple-200"
                  )}>
                    {selectedColumns.includes(column) && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </div>
                  <span className={cn(
                    "text-xs font-bold transition-colors",
                    selectedColumns.includes(column) ? "text-[#1a1a1a]" : "text-gray-400 group-hover:text-gray-600"
                  )}>
                    {column}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
