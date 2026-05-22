import React from 'react';
import { 
  X, 
  Landmark,
  Clock
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface PaymentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  unitNo: string;
}

const PaymentHistoryModal: React.FC<PaymentHistoryModalProps> = ({ 
  isOpen, 
  onClose, 
  customerName, 
  unitNo 
}) => {
  const history = [
    { sr: "1", date: "13-07-2022", credit: "10,00,000", receipt: "Installment" },
    { sr: "1", date: "13-07-2022", credit: "10,00,000", receipt: "Installment" },
    { sr: "1", date: "13-07-2022", credit: "10,00,000", receipt: "Installment" },
    { sr: "1", date: "13-07-2022", credit: "10,00,000", receipt: "Installment" },
    { sr: "1", date: "13-07-2022", credit: "10,00,000", receipt: "Installment" },
    { sr: "1", date: "13-07-2022", credit: "10,00,000", receipt: "Installment" },
    { sr: "1", date: "13-07-2022", credit: "10,00,000", receipt: "Installment" },
    { sr: "1", date: "13-07-2022", credit: "10,00,000", receipt: "Installment" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1000px] p-8 border-none bg-white shadow-2xl rounded-[40px] overflow-hidden">
        <DialogHeader className="mb-6 space-y-0">
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">Client Payment:</h2>
             <Badge className="bg-[#F15025] hover:bg-[#F15025] text-white px-5 py-1.5 rounded-xl text-sm font-black border-none shadow-lg shadow-orange-100">
                {customerName}: {unitNo}
             </Badge>
          </div>
          <DialogDescription className="sr-only">View payment history for {customerName}.</DialogDescription>
        </DialogHeader>

        {/* Table Area */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 mb-8">
           <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                 <tr className="bg-[#FBF2FF] text-[#4A1D59] text-[10px] font-black uppercase tracking-widest">
                    <th className="py-4 px-8 border-b border-purple-50 text-center">Sr. no</th>
                    <th className="py-4 px-8 border-b border-purple-50 text-center">Voucher Date</th>
                    <th className="py-4 px-8 border-b border-purple-50 text-center">Credit</th>
                    <th className="py-4 px-8 border-b border-purple-50 text-center">Receipt</th>
                    <th className="py-4 px-8 border-b border-purple-50 text-center">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {history.map((h, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                       <td className="py-4 px-8 text-center text-[11px] font-bold text-gray-400">{h.sr}</td>
                       <td className="py-4 px-8 text-center text-xs font-black text-[#1a1a1a]">{h.date}</td>
                       <td className="py-4 px-8 text-center text-xs font-black text-[#1a1a1a]">{h.credit}</td>
                       <td className="py-4 px-8 text-center text-xs font-bold text-gray-500">{h.receipt}</td>
                       <td className="py-4 px-8">
                          <div className="flex justify-center">
                             <button className="text-[#1a1a1a] hover:text-[#4A1D59] transition-colors p-1 rounded-lg hover:bg-purple-50">
                                <Landmark className="w-5 h-5" />
                             </button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* Footer Area with Progress Bar */}
        <div className="w-[300px]">
           <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
              <div className="h-full bg-[#4A1D59] w-[85%] rounded-full shadow-sm"></div>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentHistoryModal;
