import React, { useState } from 'react';
import { 
  Settings, 
  Columns,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const salesReportColumns = [
  "Sr no",
  "Project Name",
  "Booking Date",
  "Month/Year",
  "1st Applicant",
  "2nd Applicant Name",
  "Contact No.",
  "Flat No",
  "Wing",
  "Configuration",
  "Rera Carpet",
  "Registration",
  "1st Appli. Aadhar card",
  "2nd Appli. Aadhar card",
  "1st Appli. Pan No",
  "2nd Appli. Pan No",
  "Email Address",
  "Resident Address",
  "Location",
  "Booking Scheme",
  "Source Name",
  "Telecallers/Executive",
  "Sales Manager",
  "Closing Manager",
  "Broker Contact Details",
  "Floor No",
  "Rera carpet",
  "PerSq.Ft Rate",
  "Rate Chart",
  "Difference (PSF)",
  "Agreement Value",
  "Car Park Value",
  "AV + Car Park Value",
  "Final AV Value",
  "GST 5%",
  "Stamp Duty 6%",
  "Registration Charges",
  "Misc. Expenses",
  "Other Charges",
  "Total All Inclusive",
  "Car Parking (Poss)",
  "GST on CP (Poss)",
  "Booked in",
  "Bank Name (Loan)",
  "Loan Amount",
  "Banker Name",
  "Banker Contact",
  "Remark"
];

const SalesReportColumnModifier = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "Sr no", "Project Name", "Booking Date", "1st Applicant", "Total All Inclusive"
  ]);

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
      <PopoverContent className="w-[240px] p-4 border-none bg-white shadow-2xl rounded-[28px] animate-in zoom-in-95 duration-200" align="end">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#371D45]" />
            <h2 className="text-xs font-black text-[#371D45] tracking-tight uppercase">Column Modifier</h2>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setSelectedColumns([])}
              className="flex-1 h-7 rounded-lg border-gray-100 text-[9px] font-black text-gray-400 hover:bg-gray-50 transition-all uppercase tracking-widest"
            >
              Clear All
            </Button>
            <Button 
              onClick={() => setSelectedColumns([...salesReportColumns])}
              className="flex-1 h-7 rounded-lg bg-[#5C3471] hover:bg-[#4A295C] text-white text-[9px] font-black shadow-md shadow-purple-50 transition-all uppercase tracking-widest"
            >
              Select All
            </Button>
          </div>

          {/* Columns List */}
          <ScrollArea className="h-[300px] pr-2">
            <div className="space-y-2">
              {salesReportColumns.map((col) => (
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

export default SalesReportColumnModifier;
