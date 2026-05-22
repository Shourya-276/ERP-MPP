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

const PAYMENT_COLUMNS = [
  "Sr no",
  "Booking Date",
  "Customer Name",
  "Flat No",
  "Wing",
  "Exp. Date of Payment",
  "Decided Amount",
  "No. of Payment",
  "Particulars",
  "Amount Received",
  "Taxes Amount",
  "Amount Receiving Date",
  "Month",
  "Payment Method",
  "Payment Date",
  "Bank",
  "Account Number",
  "IFSC",
  "Check No. & Trans No.",
  "Receipt No.",
  "Payment Received",
  "Remark",
  "SM Name"
];

export default function PaymentColumnModifier() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(["Sr no", "Customer Name", "Flat No", "Amount Received"]);

  const toggleColumn = (column: string) => {
    setSelectedColumns(prev =>
      prev.includes(column)
        ? prev.filter(c => c !== column)
        : [...prev, column]
    );
  };

  const selectAll = () => setSelectedColumns(PAYMENT_COLUMNS);
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
      <PopoverContent className="w-[240px] p-4 bg-white border-none shadow-2xl rounded-[24px]" align="end">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
            <Settings className="w-4 h-4 text-purple-600" />
            <h4 className="font-black text-[#1a1a1a] text-sm uppercase tracking-tight">Column Modifier</h4>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={clearAll}
              className="flex-1 h-8 rounded-lg text-[10px] font-black uppercase tracking-widest border-gray-100 hover:bg-slate-50"
            >
              Clear All
            </Button>
            <Button 
              onClick={selectAll}
              className="flex-1 h-8 rounded-lg text-[10px] font-black uppercase tracking-widest bg-[#4A1D59] hover:bg-[#371D45] text-white"
            >
              Select All
            </Button>
          </div>

          <ScrollArea className="h-[320px] pr-4">
            <div className="space-y-1">
              {PAYMENT_COLUMNS.map((column) => (
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
