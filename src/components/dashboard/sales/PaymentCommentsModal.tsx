import React from 'react';
import { 
  X, 
  PencilLine, 
  Check, 
  ChevronDown,
  MessageSquare
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
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface PaymentCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  phoneNumber: string;
}

const PaymentCommentsModal: React.FC<PaymentCommentsModalProps> = ({ 
  isOpen, 
  onClose, 
  customerName, 
  phoneNumber 
}) => {
  const comments = [
    { text: "Recd Payment", status: "Client", addedBy: "Anita K", date: "28-02-2024 11:24", reminder: "No", action: "NA" },
    { text: "Sent Him DI and Receipt Via WhatsApp He will Initiate the same from bank", status: "Client", addedBy: "Diksha P", date: "28-02-2024 11:24", reminder: "No", action: "NA" },
    { text: "Updated Mortgage Details - Diksha", status: "Client", addedBy: "Anita K", date: "28-02-2024 11:24", reminder: "No", action: "NA" },
    { text: "Personal Reason", status: "Client", addedBy: "Anita K", date: "28-02-2024 11:24", reminder: "No", action: "NA" },
    { text: "Int in 619 sq carpet area", status: "Client", addedBy: "Anita K", date: "28-02-2024 11:24", reminder: "No", action: "icons" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1000px] p-8 border-none bg-white shadow-2xl rounded-[40px] overflow-hidden">
        <DialogHeader className="mb-6 space-y-0">
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">Comments:</h2>
             <div className="flex items-center gap-2">
                <Badge className="bg-[#F15025] hover:bg-[#F15025] text-white px-4 py-1.5 rounded-xl text-sm font-black border-none shadow-lg shadow-orange-100">
                   {customerName}
                </Badge>
                <span className="text-2xl font-black text-gray-300">/</span>
                <Badge className="bg-[#F15025] hover:bg-[#F15025] text-white px-4 py-1.5 rounded-xl text-sm font-black border-none shadow-lg shadow-orange-100">
                   {phoneNumber}
                </Badge>
             </div>
          </div>
          <DialogDescription className="sr-only">View and manage comments for {customerName}.</DialogDescription>
        </DialogHeader>

        {/* Table Area */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 mb-8">
           <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                 <tr className="bg-[#FBF2FF] text-[#4A1D59] text-[10px] font-black uppercase tracking-widest">
                    <th className="py-4 px-6 border-b border-purple-50">Comments</th>
                    <th className="py-4 px-6 border-b border-purple-50">Status</th>
                    <th className="py-4 px-6 border-b border-purple-50">Added By</th>
                    <th className="py-4 px-6 border-b border-purple-50">Added Date</th>
                    <th className="py-4 px-6 border-b border-purple-50 text-center">Reminder</th>
                    <th className="py-4 px-6 border-b border-purple-50 text-center">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {comments.map((c, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                       <td className="py-4 px-6 text-[11px] font-bold text-gray-700 leading-relaxed max-w-[300px]">
                          {c.text}
                       </td>
                       <td className="py-4 px-6 text-xs font-bold text-gray-500">{c.status}</td>
                       <td className="py-4 px-6 text-xs font-black text-[#4A1D59]">{c.addedBy}</td>
                       <td className="py-4 px-6 text-[10px] font-bold text-gray-400">{c.date}</td>
                       <td className="py-4 px-6">
                          <div className="flex justify-center">
                             <Badge className="bg-[#F15025] text-white px-5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-none shadow-sm shadow-orange-100">
                                {c.reminder}
                             </Badge>
                          </div>
                       </td>
                       <td className="py-4 px-6">
                          <div className="flex justify-center items-center gap-4">
                             {c.action === "NA" ? (
                                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">NA</span>
                             ) : (
                                <>
                                   <button className="text-gray-400 hover:text-[#4A1D59] transition-colors"><PencilLine className="w-4 h-4" /></button>
                                   <button className="text-red-400 hover:text-red-600 transition-colors"><X className="w-4 h-4" /></button>
                                </>
                             )}
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* Footer Area */}
        <div className="space-y-6">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Showing 1 to 5 of 5 entries</span>
              
              <div className="flex items-center gap-8">
                 <div className="flex items-center gap-3">
                    <span className="text-[11px] font-black text-[#4A1D59] uppercase tracking-widest">Set Reminder?</span>
                    <div className="w-6 h-6 rounded bg-[#4A1D59] flex items-center justify-center">
                       <Check className="w-4 h-4 text-white stroke-[3]" />
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Reminder Date:</p>
                       <div className="h-9 px-4 rounded-xl bg-slate-50 flex items-center text-xs font-bold text-gray-700 border border-slate-100">12/12/25</div>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Reminder Time:</p>
                       <div className="h-9 px-4 rounded-xl bg-slate-50 flex items-center justify-between gap-4 text-xs font-bold text-gray-700 border border-slate-100 min-w-[120px]">
                          10:00 AM <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex gap-4 items-start">
              <div className="flex-1">
                 <textarea 
                    placeholder="Comment" 
                    className="w-full h-32 p-6 rounded-[24px] bg-slate-50 border-none text-sm font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-purple-100 transition-all resize-none shadow-inner"
                 />
              </div>
              <div className="flex flex-col gap-3">
                 <Button className="h-12 px-10 rounded-2xl bg-[#5C3471] hover:bg-[#4A295C] text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-100 active:scale-95 transition-all">
                    Add Comment
                 </Button>
                 <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="h-12 px-10 rounded-2xl border-gray-100 text-gray-600 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                 >
                    Close
                 </Button>
              </div>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentCommentsModal;
