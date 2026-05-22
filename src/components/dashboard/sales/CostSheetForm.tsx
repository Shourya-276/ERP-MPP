import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  ChevronDown,
  Info,
  Check,
  Save
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface CostSheetFormProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: any;
}

const FilterDropdown = ({ title, options, selected, onToggle }: any) => (
  <div className="w-[200px] bg-white rounded-xl shadow-2xl border border-gray-100 p-4 animate-in zoom-in-95 duration-200">
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
        <div className="w-5 h-5 rounded bg-[#371D45] flex items-center justify-center">
          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
        </div>
        <span className="text-sm font-black text-[#371D45] uppercase tracking-tight">{title}</span>
      </div>
      <div className="space-y-3">
        {options.map((opt: string) => (
          <div key={opt} className="flex items-center gap-3 cursor-pointer group" onClick={() => onToggle(opt)}>
             <div className={cn(
               "w-5 h-5 rounded border-2 transition-all flex items-center justify-center",
               selected.includes(opt) ? "bg-[#371D45] border-[#371D45]" : "border-gray-200 group-hover:border-purple-200"
             )}>
               {selected.includes(opt) && <Check className="w-3 h-3 text-white stroke-[3]" />}
             </div>
             <span className={cn(
               "text-xs font-bold transition-colors",
               selected.includes(opt) ? "text-[#371D45]" : "text-gray-400 group-hover:text-gray-600"
             )}>
               {opt}
             </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CostSheetForm: React.FC<CostSheetFormProps> = ({ isOpen, onClose, lead }) => {
  const [selectedGst, setSelectedGst] = useState(['5%']);
  const [selectedStamp, setSelectedStamp] = useState(['6%']);
  const [selectedParking, setSelectedParking] = useState(['Regular']);
  const [carParkingCount, setCarParkingCount] = useState(1);

  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[1000px] p-0 border-none bg-white shadow-2xl rounded-[32px] overflow-hidden max-h-[95vh] flex flex-col">
          <DialogHeader className="bg-[#4A1D59] p-6 flex flex-row items-center justify-between space-y-0 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden">
                <div className="w-full h-full bg-[#1e2a5a] flex flex-col items-center justify-center text-white text-[6px] font-bold leading-none text-center">
                  <div className="w-6 h-6 border-2 border-white rounded-sm mb-0.5 flex items-center justify-center">S</div>
                  SWASTIK GROUP
                </div>
              </div>
              <DialogTitle className="text-2xl font-black text-white tracking-[0.2em] uppercase">Cost Sheet</DialogTitle>
            </div>
            <DialogDescription className="sr-only">Generate a cost sheet for the lead.</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-white">
            <div className="flex justify-end text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Date: 12-01-2026
            </div>

            {/* Core Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Client Name <span className="text-red-500">*</span></Label>
                <Input defaultValue={lead?.name || "Shruti Patil"} className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
                <button className="text-[10px] font-black text-[#4A1D59] hover:underline">+ Add Name</button>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Project Name <span className="text-red-500">*</span></Label>
                <Input defaultValue="Swastik Legacy" className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Configuration <span className="text-red-500">*</span></Label>
                <Input defaultValue="1 BHK" className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Floor <span className="text-red-500">*</span></Label>
                <Input defaultValue="8 th" className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
              </div>
            </div>

            {/* Area & Rate */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Unit Number <span className="text-red-500">*</span></Label>
                <Input placeholder="eg. A-1201" className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Rera Carpet Area <span className="text-red-500">*</span></Label>
                <Input placeholder="eg. 396" className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Rate per square foot (psf) <span className="text-red-500">*</span></Label>
                <Input placeholder="eg. 23500rs" className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
              </div>
            </div>

            {/* Taxes */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">GST <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-11 justify-between rounded-xl bg-slate-50/50 border-none font-bold text-xs">
                      {selectedGst.join(', ') || 'Select'} <ChevronDown className="w-4 h-4 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 border-none bg-transparent shadow-none" side="bottom" align="start">
                    <FilterDropdown 
                      title="Select GST" 
                      options={['0%', '5%', '6%']} 
                      selected={selectedGst}
                      onToggle={(opt: string) => setSelectedGst(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [opt])}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">GST Amt <span className="text-red-500">*</span></Label>
                <Input defaultValue="0" className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Stamp Duty <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-11 justify-between rounded-xl bg-slate-50/50 border-none font-bold text-xs">
                      {selectedStamp.join(', ') || 'Select'} <ChevronDown className="w-4 h-4 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 border-none bg-transparent shadow-none" side="bottom" align="start">
                    <FilterDropdown 
                      title="Select Stamp Duty" 
                      options={['0%', '5%', '6%']} 
                      selected={selectedStamp}
                      onToggle={(opt: string) => setSelectedStamp(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [opt])}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Metro cess <span className="text-red-500">*</span></Label>
                <div className="h-11 rounded-xl bg-slate-50/50 flex items-center px-4 font-black text-[#4A1D59] text-xs">1%</div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Stamp Duty Amt <span className="text-red-500">*</span></Label>
                <Input defaultValue="0" className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
              </div>
            </div>

            {/* Parking & Charges */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Parking <span className="text-red-500">*</span></Label>
                <Button 
                  onClick={() => setIsAgreementOpen(true)}
                  className="w-full h-11 rounded-xl bg-[#4A1D59] hover:bg-[#371D45] text-white font-black text-[10px] uppercase tracking-widest"
                >
                  + Add Parking
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Car Parking</Label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map(num => (
                    <button 
                      key={num}
                      onClick={() => setCarParkingCount(num)}
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs transition-all",
                        carParkingCount === num ? "bg-red-500 text-white shadow-md shadow-red-200" : "bg-slate-100 text-gray-500 hover:bg-slate-200"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Registration Charges <span className="text-red-500">*</span></Label>
                <Input placeholder="eg. A-1201" className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Miscellaneous(Scn) <span className="text-red-500">*</span></Label>
                <Input placeholder="eg. 396" className="h-11 rounded-xl bg-slate-50/50 border-none font-bold" />
              </div>
            </div>

            {/* Sale Value */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Sale Value <span className="text-red-500">*</span></Label>
              <Input defaultValue="eg. 1,34,50,000" className="h-14 rounded-2xl bg-slate-50/50 border-none font-black text-lg text-[#1a1a1a]" />
            </div>

            <div className="bg-yellow-50/50 rounded-xl p-3 flex justify-between items-center border border-yellow-100/50">
               <span className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Total (A)</span>
               <span className="text-sm font-black text-[#1a1a1a]">1,34,50,000</span>
            </div>

            {/* Other Charges Table */}
            <div className="space-y-4">
               <div className="overflow-hidden rounded-2xl border border-gray-50">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-[#FBF2FF] text-[#4A1D59] text-[10px] font-black uppercase tracking-widest">
                       <th className="p-4">SR. NO.</th>
                       <th className="p-4">OTHER CHARGES</th>
                       <th className="p-4">AMOUNT (In Rs.)</th>
                       <th className="p-4 text-center">ACTION</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                     <tr>
                       <td className="p-4 text-xs font-bold text-gray-400">1</td>
                       <td className="p-4 text-xs font-bold text-gray-600 leading-relaxed">
                          Possession Charges<br/>Maintainence Charges
                       </td>
                       <td className="p-4">
                          <Input placeholder="Enter amount" className="h-9 rounded-lg bg-slate-50/50 border-none text-xs font-bold" />
                       </td>
                       <td className="p-4 text-center">
                          <button className="text-red-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
               <div className="bg-[#FBF2FF]/50 rounded-xl p-3 flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Total (B)</span>
                  <span className="text-sm font-black text-[#1a1a1a]">0</span>
               </div>
            </div>

            {/* Grand Total */}
            <div className="flex bg-yellow-100/30 rounded-2xl overflow-hidden border border-yellow-100">
               <div className="flex-1 p-5 border-r border-yellow-100 flex items-center">
                  <span className="text-xs font-black text-[#4A1D59] uppercase tracking-widest">Grand Total (A+B)</span>
               </div>
               <div className="flex-1 p-5 flex items-center justify-center">
                  <span className="text-xl font-black text-[#1a1a1a]">1,34,50,000/-</span>
               </div>
            </div>

            {/* Payment Structure */}
            <div className="space-y-4 pt-4 border-t border-dashed border-gray-100">
               <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Payment Structure</h4>
               <div className="overflow-hidden rounded-2xl border border-gray-50">
                 <table className="w-full text-left">
                   <tbody className="divide-y divide-gray-50">
                     {[
                       "Token amount of 1LACS dated 18th Oct 2025",
                       "10% stamp duty 6%, Reg Amount in 7-10 Days",
                       "Token amount of 1LACS dated 18th Oct 2025"
                     ].map((term, i) => (
                       <tr key={i}>
                         <td className="p-4 w-12 text-xs font-bold text-gray-400">{i + 1}</td>
                         <td className="p-4 text-xs font-bold text-gray-500">{term}</td>
                         <td className="p-4 w-12 text-center">
                            <button className="text-red-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               <button className="flex items-center gap-2 text-[10px] font-black text-[#4A1D59] hover:underline px-2">
                  <Plus className="w-3.5 h-3.5" /> Add Payment Term
               </button>
            </div>

            {/* Note */}
            <p className="text-[10px] font-bold text-red-500 italic">
              Note: This cost sheet will be valid for 7 days from the date of generation.
            </p>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-12 pt-8">
               <div className="space-y-3">
                  <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Client Signature</Label>
                  <div className="h-20 rounded-2xl border-2 border-slate-100 bg-slate-50/30"></div>
               </div>
               <div className="space-y-3">
                  <Label className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest">Sr. Manager Signature</Label>
                  <div className="h-20 rounded-2xl border-2 border-slate-100 bg-slate-50/30"></div>
               </div>
            </div>

            {/* Footer Save */}
            <div className="flex justify-center pt-8">
               <Button className="h-14 px-12 rounded-2xl bg-[#4A1D59] hover:bg-[#371D45] text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-purple-200 active:scale-95 transition-all flex items-center gap-3">
                  <Save className="w-5 h-5" /> Save Cost Sheet
               </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAgreementOpen} onOpenChange={setIsAgreementOpen}>
        <DialogContent className="max-w-[500px] p-8 border-none bg-white shadow-2xl rounded-[32px] overflow-hidden">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsAgreementOpen(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#4A1D59] hover:bg-slate-100 transition-all">
                <ChevronDown className="w-6 h-6 rotate-90" />
              </button>
              <DialogTitle className="text-2xl font-black text-[#4A1D59] tracking-tight">Agreement Value</DialogTitle>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-black text-[#4A1D59] uppercase tracking-widest flex items-center gap-1">Base Ag. Value <span className="text-red-500">*</span></Label>
                <Input placeholder="eg.15956500" className="h-12 rounded-xl bg-slate-50 border-none font-bold placeholder:text-gray-300" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-black text-[#4A1D59] uppercase tracking-widest flex items-center gap-1">Ag. with Car <span className="text-red-500">*</span></Label>
                <Input placeholder="eg.15956500" className="h-12 rounded-xl bg-slate-50 border-none font-bold placeholder:text-gray-300" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-black text-[#4A1D59] uppercase tracking-widest flex items-center gap-1">Parking Type <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-12 justify-between rounded-xl bg-slate-50 border-none font-bold text-sm text-gray-400">
                      {selectedParking.join(', ') || 'Select Parking'} <ChevronDown className="w-5 h-5 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 border-none bg-transparent shadow-none" side="bottom" align="start">
                    <FilterDropdown 
                      title="Select Parking" 
                      options={['Premium', 'Regular']} 
                      selected={selectedParking}
                      onToggle={(opt: string) => setSelectedParking(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [opt])}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-black text-[#4A1D59] uppercase tracking-widest flex items-center gap-1">Show Parking With Cost Sheet <span className="text-red-500">*</span></Label>
                <Input defaultValue="1,45,50,000" className="h-12 rounded-xl bg-slate-50 border-none font-black text-gray-400" />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => setIsAgreementOpen(false)}
                className="h-12 px-10 rounded-2xl bg-[#5C3471] hover:bg-[#4A295C] text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-100 active:scale-95 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save and Close
              </Button>
            </div>
          </div>
          <DialogDescription className="sr-only">Set the agreement value and parking details.</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CostSheetForm;
