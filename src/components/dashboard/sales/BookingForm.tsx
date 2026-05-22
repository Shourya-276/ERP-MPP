import React from 'react';
import { 
  X, 
  Plus, 
  Download, 
  Upload, 
  Check, 
  Calendar as CalendarIcon,
  Search,
  ChevronDown,
  Info,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

interface BookingFormProps {
  onClose: () => void;
  leadName?: string;
}

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
    <h3 className="text-lg font-black text-[#371D45] tracking-tight border-l-4 border-[#371D45] pl-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {children}
    </div>
  </div>
);

const LabelWithStar = ({ children, required }: { children: string; required?: boolean }) => (
  <Label className="text-[13px] font-black text-[#371D45] mb-2 block uppercase tracking-wider">
    {children} {required && <span className="text-red-500">*</span>}
  </Label>
);

const BookingForm: React.FC<BookingFormProps> = ({ onClose, leadName }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="bg-[#F1F5F9] w-full max-w-5xl h-full rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
        
        {/* Header */}
        <div className="bg-[#371D45] p-6 px-10 flex items-center justify-between shrink-0">
          <div className="sr-only">
            <DialogTitle>Booking Form</DialogTitle>
            <DialogDescription>
              Form to process apartment bookings for {leadName || 'lead'}.
            </DialogDescription>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight">Booking Form</h2>
            <p className="text-purple-200/60 text-xs font-bold uppercase tracking-widest">Complete all required fields to process the booking</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
          
          <div className="flex items-center gap-3">
             <div className="bg-[#FFF6D8] border border-[#FFE7A5] px-6 py-2.5 rounded-xl text-[11px] font-black text-[#371D45] shadow-sm flex items-center gap-4">
                Book
             </div>
             <button 
               onClick={onClose}
               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
             >
                <X className="w-4 h-4 text-gray-400" />
             </button>
          </div>

          {/* Apartment Details */}
          <FormSection title="Apartment Details">
            <div className="space-y-2">
              <LabelWithStar required>Project Name</LabelWithStar>
              <Select>
                <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold text-gray-500">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-gray-100 shadow-xl">
                  <SelectItem value="platinum">Swastik Platinum</SelectItem>
                  <SelectItem value="coral">Swastik Coral</SelectItem>
                  <SelectItem value="aaradhya">Vighnaharta Aaradhya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <LabelWithStar required>Booking Date</LabelWithStar>
              <div className="relative">
                <Input placeholder="dd-mm-yyyy" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
                <CalendarIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <LabelWithStar required>Wing</LabelWithStar>
              <Select>
                <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold text-gray-500">
                  <SelectValue placeholder="Select Wing" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="a">Wing A</SelectItem>
                  <SelectItem value="b">Wing B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <LabelWithStar required>Floor</LabelWithStar>
              <Select>
                <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold text-gray-500">
                  <SelectValue placeholder="Select Floor" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl max-h-60 overflow-y-auto">
                   {Array.from({length: 20}, (_, i) => (
                     <SelectItem key={i+1} value={(i+1).toString()}>{i+1} Floor</SelectItem>
                   ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <LabelWithStar required>Flat Number</LabelWithStar>
              <Input placeholder="e.g., A-501" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-4 md:col-span-2">
              <LabelWithStar required>Flat Type</LabelWithStar>
              <RadioGroup defaultValue="1bhk" className="flex flex-wrap gap-6">
                {['1 BHK', '2 BHK', '3 BHK', 'Jodi'].map(type => (
                  <div key={type} className="flex items-center space-x-3 bg-slate-50 border border-gray-100 px-6 py-4 rounded-2xl min-w-[140px] cursor-pointer hover:bg-white hover:shadow-sm transition-all">
                    <RadioGroupItem value={type.toLowerCase()} id={type} className="text-[#371D45]" />
                    <Label htmlFor={type} className="font-black text-sm text-[#371D45] cursor-pointer">{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <LabelWithStar required>Carpet Area (sq. ft.)</LabelWithStar>
              <Input placeholder="e.g., 650" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar required>Agreement Value (₹)</LabelWithStar>
              <Input placeholder="e.g., 5500000" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar>Agreement Value (in words)</LabelWithStar>
              <Input placeholder="Amount in words" className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 px-6 font-bold text-gray-400" />
            </div>
            <div className="space-y-2">
              <LabelWithStar required>All Inclusive Value (₹)</LabelWithStar>
              <Input placeholder="e.g., 6000000" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-4 md:col-span-2">
              <LabelWithStar required>Car Parking</LabelWithStar>
              <RadioGroup defaultValue="regular" className="flex gap-6">
                {['Regular', 'Premium'].map(type => (
                  <div key={type} className="flex items-center space-x-3 bg-slate-50 border border-gray-100 px-8 py-4 rounded-2xl min-w-[160px] cursor-pointer">
                    <RadioGroupItem value={type.toLowerCase()} id={type} />
                    <Label htmlFor={type} className="font-black text-sm text-[#371D45] cursor-pointer">{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2 md:col-span-2">
              <LabelWithStar>Booking Scheme</LabelWithStar>
              <Input placeholder="e.g., Early Bird Discount" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
          </FormSection>

          {/* Customer Information */}
          <FormSection title="Customer Information">
            <div className="space-y-2">
              <LabelWithStar required>Primary Applicant Name</LabelWithStar>
              <Input placeholder="Enter full name" defaultValue={leadName} className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar>Joint Applicant Name</LabelWithStar>
              <Input placeholder="Enter full name (optional)" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar required>Mobile Number</LabelWithStar>
              <Input placeholder="+91 XXXXX XXXXX" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar required>Email ID</LabelWithStar>
              <Input placeholder="email@example.com" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar required>Aadhaar Number</LabelWithStar>
              <Input placeholder="XXXX XXXX XXXX" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar required>PAN Number</LabelWithStar>
              <Input placeholder="ABCDE1234F" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
          </FormSection>

          {/* Address Details */}
          <FormSection title="Address Details">
            <div className="space-y-2">
              <LabelWithStar required>Residential Address</LabelWithStar>
              <Textarea placeholder="Enter complete residential address" className="min-h-[120px] rounded-[24px] border-gray-200 bg-white p-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar>Office Address</LabelWithStar>
              <Textarea placeholder="Enter office address (optional)" className="min-h-[120px] rounded-[24px] border-gray-200 bg-white p-6 font-bold" />
            </div>
            <div className="md:col-span-2 space-y-4">
              <LabelWithStar>Communication Preference</LabelWithStar>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-3 bg-slate-50 border border-gray-100 px-6 py-4 rounded-2xl flex-1 min-w-[280px]">
                  <Checkbox id="addr-res" className="rounded-lg w-5 h-5 border-gray-300" />
                  <Label htmlFor="addr-res" className="font-bold text-xs text-[#371D45] cursor-pointer">Send all communication to Residential Address</Label>
                </div>
                <div className="flex items-center space-x-3 bg-slate-50 border border-gray-100 px-6 py-4 rounded-2xl flex-1 min-w-[280px]">
                  <Checkbox id="addr-off" className="rounded-lg w-5 h-5 border-gray-300" />
                  <Label htmlFor="addr-off" className="font-bold text-xs text-[#371D45] cursor-pointer">Send all communication to Office Address</Label>
                </div>
              </div>
            </div>
          </FormSection>

          {/* Payment Information */}
          <FormSection title="Payment Information">
            <div className="md:col-span-2 space-y-4">
              <LabelWithStar required>Payment Mode</LabelWithStar>
              <RadioGroup defaultValue="rtgs" className="flex gap-6">
                {['Cheque', 'RTGS / UTR'].map(type => (
                  <div key={type} className="flex items-center space-x-3 bg-slate-50 border border-gray-100 px-8 py-4 rounded-2xl flex-1 cursor-pointer">
                    <RadioGroupItem value={type.toLowerCase().replace(/\s/g, '')} id={type} />
                    <Label htmlFor={type} className="font-black text-sm text-[#371D45] cursor-pointer">{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <LabelWithStar required>Booking Amount (₹)</LabelWithStar>
              <Input placeholder="e.g., 500000" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar required>UTR / Cheque Number</LabelWithStar>
              <Input placeholder="Enter number" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            {/* Installments would go here - simplified for now */}
            <div className="space-y-2">
              <LabelWithStar>Installment 1 Amount (₹)</LabelWithStar>
              <Input placeholder="e.g., 1000000" className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar>Installment 1 Date</LabelWithStar>
              <div className="relative">
                <Input placeholder="dd-mm-yyyy" className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 px-6 font-bold" />
                <CalendarIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              </div>
            </div>
            <div className="space-y-2">
              <LabelWithStar>Own Contribution (₹)</LabelWithStar>
              <Input placeholder="e.g., 2000000" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar>Loan Amount (₹)</LabelWithStar>
              <Input placeholder="e.g., 4000000" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
          </FormSection>

          {/* Source of Booking */}
          <FormSection title="Source of Booking">
            <div className="space-y-2">
              <LabelWithStar>Channel Partner Name</LabelWithStar>
              <Input placeholder="Enter channel partner name" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar>Channel Partner Mobile Number</LabelWithStar>
              <Input placeholder="+91 XXXXX XXXXX" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar>RERA Number</LabelWithStar>
              <Input placeholder="Enter RERA registration number" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
              <LabelWithStar>Brokerage Payable (%)</LabelWithStar>
              <Input placeholder="e.g., 2.5" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="md:col-span-2 space-y-4">
               <LabelWithStar>CP Signature</LabelWithStar>
               <div className="flex items-center gap-6">
                  <Button variant="outline" className="h-12 rounded-xl border-dashed border-2 border-gray-200 px-6 font-bold text-gray-400 bg-white hover:bg-slate-50 transition-all">
                     <Upload className="w-4 h-4 mr-2" /> Upload Signature
                  </Button>
                  <span className="text-xs font-bold text-gray-300">or use digital signature</span>
               </div>
            </div>
          </FormSection>

          {/* Declaration */}
          <div className="bg-[#FBF2FF] rounded-[32px] p-8 border border-purple-100 shadow-sm space-y-6">
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                   <Info className="w-5 h-5 text-purple-600" />
                </div>
                <div className="space-y-4">
                   <h3 className="text-lg font-black text-[#371D45] tracking-tight">Declaration</h3>
                   <p className="text-[11px] font-bold text-gray-500 leading-relaxed italic">
                      I/We, Mr./Mrs. <span className="text-[#371D45] font-black underline">{leadName || 'Applicant'}</span>, hereby declare that the above information furnished by me/us is true and correct to the best of my/our knowledge and belief. I/We understand that any false or misleading information provided may result in the cancellation of this booking and forfeiture of the booking amount. I/We have read and understood all the terms and conditions mentioned in the booking form and agreement, and I/we agree to abide by them. I/we authorize the company to verify the information provided and to contact me/us for any additional documentation or clarification as required. I/We also confirm that the funds used for this booking are from legitimate sources and comply with all applicable laws and regulations.
                   </p>
                   <div className="flex items-center space-x-3 pt-2">
                      <Checkbox id="decl" className="rounded-lg w-5 h-5 border-gray-300" />
                      <Label htmlFor="decl" className="font-bold text-[13px] text-[#371D45] cursor-pointer">I agree to the terms and conditions mentioned above <span className="text-red-500">*</span></Label>
                   </div>
                </div>
             </div>
          </div>

          {/* Signatures */}
          <FormSection title="Signatures">
            <div className="md:col-span-2 space-y-4">
               <LabelWithStar required>Customer Name</LabelWithStar>
               <Input placeholder="Enter customer name" defaultValue={leadName} className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="md:col-span-2 space-y-4">
               <LabelWithStar required>Customer Signature</LabelWithStar>
               <div className="w-full h-64 border-2 border-dashed border-gray-200 rounded-[32px] bg-slate-50/50 flex items-center justify-center group hover:bg-white transition-all cursor-crosshair relative">
                  <span className="text-sm font-black text-gray-300 group-hover:text-gray-400 transition-colors">Sign here</span>
                  <div className="absolute top-6 left-6 p-4 rounded-2xl bg-white/50 backdrop-blur shadow-sm border border-white">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                     <p className="text-xs font-black text-amber-500">Awaiting Signature</p>
                  </div>
               </div>
            </div>
            <div className="space-y-2">
               <LabelWithStar required>Sales Executive / Manager Name</LabelWithStar>
               <Input placeholder="Enter sales executive name" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2">
               <LabelWithStar required>Sales Head Name</LabelWithStar>
               <Input placeholder="Enter sales head name" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <LabelWithStar>Date</LabelWithStar>
              <div className="relative">
                <Input placeholder="dd-mm-yyyy" defaultValue="13-05-2026" className="h-14 rounded-2xl border-gray-200 bg-white px-6 font-bold" />
                <CalendarIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </FormSection>
        </div>

        {/* Action Footer */}
        <div className="bg-white p-8 px-10 border-t border-gray-100 flex items-center justify-end gap-4 shrink-0">
          <Button variant="outline" className="h-14 rounded-2xl px-10 border-gray-200 font-bold text-gray-500 hover:bg-slate-50 transition-all">
            <Download className="w-5 h-5 mr-2" /> Save Draft
          </Button>
          <Button className="h-14 rounded-2xl px-12 bg-[#5C3471] hover:bg-[#4A295C] text-white font-black text-sm tracking-tight shadow-xl shadow-purple-100 active:scale-[0.98] transition-all">
             <Send className="w-5 h-5 mr-3" /> Submit Booking
          </Button>
        </div>

      </div>
    </div>
  );
};

export default BookingForm;
