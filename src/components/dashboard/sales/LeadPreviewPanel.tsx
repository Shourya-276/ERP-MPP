import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent 
} from "@/components/ui/sheet";
import { 
  ArrowLeft, 
  Edit2, 
  Calendar, 
  History, 
  MessageCircle, 
  Phone, 
  Trash2,
  MapPin,
  Mail,
  User,
  Check,
  TrendingUp,
  Tag,
  Clock,
  Briefcase,
  PhoneOff,
  MoreVertical,
  Send,
  Paperclip,
  ChevronDown,
  X,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DateTimePicker from './DateTimePicker';
import BookingForm from './BookingForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeadPreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
}

const InfoGrid = ({ title, items }: { title: string; items: { label: string; value: any }[] }) => (
  <div className="space-y-4">
    <h3 className="text-base font-black text-[#371D45] tracking-tight">{title}</h3>
    <div className="bg-[#FBF2FF]/40 border border-purple-50 rounded-3xl p-6 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
      {items.map((item, i) => (
        <div key={i} className="space-y-1">
          <p className="text-[10px] font-black text-[#371D45]/60 uppercase tracking-widest">{item.label}</p>
          <p className="text-sm font-bold text-[#371D45]">{item.value || '---'}</p>
        </div>
      ))}
    </div>
  </div>
);

const TimelineItem = ({ user, time, children, note, isContact }: any) => (
  <div className="relative pl-8 pb-8 last:pb-0">
    <div className="absolute left-[3px] top-1.5 w-3 h-3 rounded-full bg-gray-200 border-2 border-white z-10"></div>
    <div className="flex justify-between items-start mb-2">
      <p className="text-[13px] font-black text-[#371D45]">done by <span className="text-[#371D45] underline decoration-purple-200">{user}</span></p>
      <p className="text-[11px] font-bold text-gray-400">{time}</p>
    </div>
    <div className="space-y-3">
      {children}
      {(note || isContact) && (
        <div className={cn(
          "rounded-xl p-3 text-xs font-bold border",
          isContact ? "bg-[#FFFCEF] border-[#FFE7A5]/30 text-amber-900" : "bg-[#FFF8E7] border-[#FFE7A5]/50 text-amber-950"
        )}>
          {isContact ? (
             <span>Contact initiated through <span className="font-black">Call</span></span>
          ) : (
             <div className="flex items-center justify-between">
                <span><span className="font-black">Notes:</span> {note}</span>
                {note.includes('Cost sheet') && <span className="text-purple-600 underline cursor-pointer">view</span>}
             </div>
          )}
        </div>
      )}
    </div>
  </div>
);

const NoteCard = ({ author, content, time }: any) => (
  <div className="flex flex-col items-end gap-1 ml-16">
    <div className="w-full bg-[#FFF9E7] border border-[#FFE7A5]/40 rounded-2xl p-4 shadow-sm">
      <p className="text-sm font-black text-[#371D45] mb-2">{author}</p>
      <p className="text-[13px] font-bold text-gray-600 leading-relaxed whitespace-pre-line">{content}</p>
      <p className="text-[10px] font-bold text-gray-400 mt-2 text-right">{time}</p>
    </div>
  </div>
);

const LeadPreviewPanel: React.FC<LeadPreviewPanelProps> = ({ isOpen, onClose, lead }) => {
  const [activeMiniTab, setActiveMiniTab] = useState('Overview');
  const [historyFilter, setHistoryFilter] = useState('All');
  const [isChatView, setIsChatView] = useState(false);
  const [chatTarget, setChatTarget] = useState('Lead');
  
  // Status Editing State
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedSubStatus, setSelectedSubStatus] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const subStatuses: Record<string, string[]> = {
    'Callback': ['Follow up', 'Plan Postponed', 'To Schedule A Meeting', 'Busy', 'Not Reachable', 'Not Answered', 'Need More Info', 'To Schedule Site Visit'],
    'Schedule Meeting': ['On call', 'In Person', 'Online'],
    'Schedule Site Visit': ['First Visit', 'Revisit'],
    'Not Interested': ['Unmatched Budget', 'Different Location', 'Different Requirements'],
    'Drop': ['Wrong/Invalid No', 'Purchased From Others', 'Not looking', 'Ringing Not Received'],
    'Expression Of Interest': []
  };

  const needsDate = ['Callback', 'Schedule Meeting', 'Schedule Site Visit'].includes(selectedStatus || '');

  if (!lead) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(val) => {
      if (!val) {
        setIsChatView(false);
        setActiveMiniTab('Overview');
        setSelectedStatus(null);
        setSelectedSubStatus(null);
      }
      onClose();
    }}>
      <SheetContent className="sm:max-w-[600px] w-full p-0 border-none bg-[#F1F5F9] overflow-y-auto flex flex-col">
        {selectedStatus === 'Book' && (
          <BookingForm 
            leadName={lead.name}
            onClose={() => setSelectedStatus(null)} 
          />
        )}
        {/* Header Actions */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={isChatView ? () => setIsChatView(false) : onClose}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-black text-[#371D45] tracking-tight">Lead Preview</h2>
          </div>
          
          <div className="flex items-center gap-1.5">
            {[
              { icon: Edit2, color: 'text-blue-400 hover:bg-blue-50' },
              { icon: Calendar, color: 'text-green-400 hover:bg-green-50' },
              { icon: History, color: 'text-orange-400 hover:bg-orange-50' },
              { icon: MessageCircle, color: 'text-green-500 hover:bg-green-50', onClick: () => setIsChatView(true) },
              { icon: Phone, color: 'text-blue-500 hover:bg-blue-50' },
              { icon: Trash2, color: 'text-red-400 hover:bg-red-50' },
            ].map((action, i) => (
              <button 
                key={i} 
                onClick={action.onClick}
                className={cn("p-2 rounded-xl transition-all active:scale-90", action.color)}
              >
                <action.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isChatView ? (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
               <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                  <p className="text-lg font-black text-[#371D45]">
                     <span className="opacity-60 font-bold">Lead:</span> {lead.name}
                  </p>
               </div>
               <div className="flex gap-4">
                  {['Lead', 'Project'].map(pill => (
                    <button
                      key={pill}
                      onClick={() => setChatTarget(pill)}
                      className={cn(
                        "px-8 py-2.5 rounded-full text-xs font-black transition-all border-2",
                        chatTarget === pill ? "bg-[#FFF6D8] border-[#FFE7A5] text-[#371D45]" : "bg-white border-gray-100 text-gray-400"
                      )}
                    >
                      {pill}
                    </button>
                  ))}
               </div>
               <div className="space-y-3">
                  <p className="text-base font-black text-[#371D45] tracking-tight">Select Template</p>
                  <Select>
                     <SelectTrigger className="h-14 bg-gray-100/50 border-none rounded-2xl px-6 font-bold text-gray-500 focus:ring-0">
                        <SelectValue placeholder="Select Template" />
                     </SelectTrigger>
                     <SelectContent className="rounded-2xl border-gray-100 shadow-xl">
                        <SelectItem value="site-visit">Site Visit Reminder</SelectItem>
                        <SelectItem value="follow-up">General Follow-up</SelectItem>
                        <SelectItem value="cost-sheet">Share Cost Sheet</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div className="space-y-3">
                  <p className="text-base font-black text-[#371D45] tracking-tight">Message</p>
                  <div className="bg-[#FFF9E7] border border-[#FFE7A5]/40 rounded-3xl p-8 space-y-6 min-h-[240px]">
                     <p className="text-sm font-bold text-gray-400 leading-relaxed">
                        Ex. Dear Nichola ferrell, As per our telephonic Discussion your site visit is confirm.This is a reminder message please confirm the time sir.
                     </p>
                     <p className="text-sm font-bold text-gray-400">Thank you</p>
                     <div className="space-y-0">
                        <p className="text-sm font-bold text-gray-400">Regards,</p>
                        <p className="text-sm font-bold text-gray-400">Vikram Surelia</p>
                     </div>
                  </div>
               </div>
               <button className="flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-[#371D45] text-[#371D45] font-black text-xs uppercase tracking-widest hover:bg-purple-50 transition-all active:scale-95">
                  <Paperclip className="w-4 h-4" />
                  Attachment
               </button>
            </div>
          ) : (
            <>
              {/* Profile Card */}
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBF2FF] rounded-full -mr-16 -mt-16 opacity-50"></div>
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <Avatar className="w-24 h-24 border-4 border-[#FBF2FF] shadow-lg">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} />
                    <AvatarFallback>{lead.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-black text-[#371D45] text-center">{lead.name}</h3>
                </div>
                <div className="flex-1 space-y-4 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold">+91 1234123456</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold">abcabc@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 md:col-span-2">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold">Vikhroli East, Central Mumbai, India</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-50 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-[#FBF2FF] text-[#371D45] border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Buy • Residential • Flat • 1 BHK • ~ INR 87.78 Lacs
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Mini Tabs */}
              <div className="flex items-center gap-8 border-b border-gray-200 pb-px shrink-0">
                {['Overview', 'Status', 'History', 'Notes'].map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveMiniTab(tab)}
                    className={cn(
                      "pb-3 text-sm font-black transition-all relative",
                      activeMiniTab === tab ? "text-[#371D45]" : "text-gray-400 hover:text-gray-600"
                    )}
                  >
                    {tab}
                    {activeMiniTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#371D45] rounded-full"></div>}
                  </button>
                ))}
              </div>

              <div className="flex-1">
                {activeMiniTab === 'Overview' ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-[#371D45] tracking-tight">Lead Status</h3>
                        <Button onClick={() => setActiveMiniTab('Status')} size="sm" className="bg-[#371D45] hover:bg-[#25132F] rounded-xl font-black text-[10px] uppercase tracking-widest px-4">Change Status</Button>
                      </div>
                      <div className="bg-[#FFF8E7] border border-[#FFE7A5] rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-3 text-amber-900">
                            <User className="w-4 h-4" />
                            <span className="text-xs font-black">Not Interested - Unmatched Budget</span>
                        </div>
                        <div className="flex items-center gap-3 text-amber-900/60 pl-7">
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold italic">Not interested</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <p className="text-sm font-black text-[#371D45] tracking-tight">Tags</p>
                      <div className="flex flex-wrap gap-2.5">
                        {['Hot', 'Warm', 'Cold', 'Lost', 'Ready To Revisit'].map(tag => (
                          <button 
                            key={tag} 
                            className={cn(
                              "px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border-2 flex items-center gap-2",
                              tag === 'Lost' 
                                ? "bg-[#FFF6D8] border-[#FFE7A5] text-[#371D45] shadow-sm" 
                                : "bg-white border-gray-100 text-gray-400"
                            )}
                          >
                            <Tag className="w-3.5 h-3.5" />
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <p className="text-sm font-black text-[#371D45] tracking-tight">Assigned To</p>
                      <div className="bg-[#FBF2FF] rounded-[24px] p-4 flex items-center gap-4 border border-purple-100">
                        <Avatar className="w-12 h-12 border-2 border-white">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana" />
                            <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-black text-[#371D45]">Sanjana Maurya</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sales Executive</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <InfoGrid 
                        title="Lead Enquiry Info" 
                        items={[
                          { label: 'Gender', value: 'Male' },
                          { label: 'Date', value: '' },
                          { label: 'Marital Status', value: '' },
                          { label: 'Anniversary Date', value: '' },
                          { label: 'Lead Source', value: '99 Acres' },
                          { label: 'Sub-Source', value: 'The Avenue' },
                          { label: 'Enquired For', value: '' },
                          { label: 'Purpose', value: '' },
                          { label: 'Buyer', value: '' },
                          { label: 'Payment Plan', value: '' },
                        ]} 
                      />
                    </div>
                  </div>
                ) : activeMiniTab === 'Status' ? (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    {!selectedStatus ? (
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <h3 className="text-lg font-black text-[#371D45] tracking-tight">Current Lead Status</h3>
                          <div className="bg-[#FFF8E7] border border-[#FFE7A5] rounded-2xl p-5 space-y-3">
                            <div className="flex items-center gap-3 text-amber-900">
                                <User className="w-4 h-4" />
                                <span className="text-xs font-black">Not Interested - Unmatched Budget</span>
                            </div>
                            <div className="flex items-center gap-3 text-amber-900/60 pl-7">
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold italic">Not interested</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                          {Object.keys(subStatuses).concat(['Book']).map(action => (
                            <button 
                              key={action} 
                              onClick={() => setSelectedStatus(action)}
                              className="px-6 py-3 rounded-xl text-[11px] font-black border-2 border-gray-100 text-gray-600 hover:border-[#371D45] hover:text-[#371D45] bg-white transition-all active:scale-95"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3">
                           <div className="bg-[#FFF6D8] border border-[#FFE7A5] px-6 py-2.5 rounded-xl text-[11px] font-black text-[#371D45] shadow-sm flex items-center gap-4">
                              {selectedStatus}
                           </div>
                           <button 
                             onClick={() => { setSelectedStatus(null); setSelectedSubStatus(null); }}
                             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                           >
                             <X className="w-4 h-4 text-gray-400" />
                           </button>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                          {subStatuses[selectedStatus]?.map(sub => (
                            <button 
                              key={sub} 
                              onClick={() => setSelectedSubStatus(sub)}
                              className={cn(
                                "px-5 py-2.5 rounded-xl text-[11px] font-black border-2 transition-all active:scale-95",
                                selectedSubStatus === sub 
                                  ? "bg-[#371D45] border-[#371D45] text-white shadow-lg" 
                                  : "bg-white border-gray-100 text-gray-400 hover:border-purple-200"
                              )}
                            >
                              {sub}
                            </button>
                          ))}
                        </div>

                        {needsDate && (
                          <div className="space-y-3">
                             <p className="text-base font-black text-[#371D45] tracking-tight">Schedule Date</p>
                             <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
                                <PopoverTrigger asChild>
                                   <div className="relative cursor-pointer group">
                                      <Input 
                                        readOnly
                                        value={scheduledDate}
                                        placeholder="ex. 19/06/2025, 12:00 pm" 
                                        className="h-14 rounded-2xl border-gray-200 focus:ring-[#371D45] bg-white px-6 font-bold text-gray-500 cursor-pointer group-hover:border-purple-200 transition-all"
                                      />
                                      <CalendarIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                   </div>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto" align="start">
                                   <DateTimePicker 
                                      onSet={(val) => { setScheduledDate(val); setIsPickerOpen(false); }} 
                                      onCancel={() => setIsPickerOpen(false)} 
                                   />
                                </PopoverContent>
                             </Popover>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-3">
                      <p className="text-sm font-black text-[#371D45] tracking-tight">Assigned To</p>
                      <div className="bg-[#FBF2FF] rounded-[24px] p-4 flex items-center gap-4 border border-purple-100">
                        <Avatar className="w-12 h-12 border-2 border-white">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana" />
                            <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-black text-[#371D45]">Sanjana Maurya</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-black text-[#371D45] tracking-tight">Notes</p>
                      <Textarea 
                        placeholder="ex. I want to say" 
                        className="min-h-[120px] rounded-2xl border-gray-200 focus:ring-[#371D45] bg-white p-4 font-bold text-sm"
                      />
                    </div>
                  </div>
                ) : activeMiniTab === 'History' ? (
                  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center justify-between bg-white/50 p-2 rounded-2xl border border-gray-100">
                        {['All', 'Status', 'Assignment', 'Notes'].map(filter => (
                          <button 
                            key={filter}
                            onClick={() => setHistoryFilter(filter)}
                            className="flex items-center gap-3 px-4 py-2 transition-all group"
                          >
                            <div className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                              historyFilter === filter ? "border-[#371D45] bg-[#371D45]" : "border-gray-300 group-hover:border-purple-200"
                            )}>
                                {historyFilter === filter && <div className="w-2 h-2 rounded-full bg-white"></div>}
                            </div>
                            <span className={cn(
                              "text-sm font-bold transition-all",
                              historyFilter === filter ? "text-[#371D45]" : "text-gray-400 group-hover:text-gray-600"
                            )}>{filter}</span>
                          </button>
                        ))}
                    </div>

                    <div className="space-y-8 relative">
                        <div className="absolute left-[95px] top-6 bottom-0 w-[1px] border-l-2 border-dashed border-gray-200"></div>
                        <div className="space-y-8">
                          <div className="flex gap-10">
                              <div className="w-16 shrink-0 pt-1">
                                <p className="text-sm font-black text-[#371D45] text-right">Today</p>
                              </div>
                              <div className="relative flex-1">
                                <div className="absolute -left-[14.5px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#FFF6D8] border-2 border-white shadow-sm z-20"></div>
                                <div className="space-y-8 pt-1">
                                    <TimelineItem user="Anjali Pokharkar" time="05:03 pm">
                                      <div className="space-y-2">
                                          <p className="text-[11px] font-bold text-gray-500 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                            Reason updated <span className="font-black text-[#371D45]/60 ml-2">Not Answered → Different Requirements</span>
                                          </p>
                                          <div className="rounded-xl p-3 text-xs font-bold bg-[#FFF8E7] border border-[#FFE7A5]/50 text-amber-950">
                                            <span className="font-black">Notes:</span> booked with competitor
                                          </div>
                                          <p className="text-[11px] font-bold text-gray-500 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                            Lead Status updated <span className="font-black text-[#371D45]/60 ml-2">Callback → Not Interested</span>
                                          </p>
                                      </div>
                                    </TimelineItem>
                                    <TimelineItem user="Anjali Pokharkar" time="05:03 pm" isContact />
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>
                  </div>
                ) : activeMiniTab === 'Notes' ? (
                  <div className="space-y-10 animate-in slide-in-from-right-4 duration-300 pb-20">
                    <div className="space-y-8">
                        <div className="flex gap-6">
                          <p className="text-sm font-black text-[#371D45] w-24 pt-4">16-12-2024</p>
                          <div className="flex-1">
                            <NoteCard author="Sanjana Maurya" content="Not interested" time="01:24 PM" />
                          </div>
                        </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {isChatView ? (
           <div className="sticky bottom-0 bg-white/80 backdrop-blur-md p-6 border-t border-gray-100 shrink-0">
              <Button className="w-full h-14 rounded-2xl bg-[#5C3471] hover:bg-[#4A295C] text-white font-black text-sm tracking-tight shadow-xl shadow-purple-100 active:scale-[0.98] transition-all">
                 Send Message
              </Button>
           </div>
        ) : activeMiniTab === 'Status' ? (
          <div className="sticky bottom-0 bg-white/80 backdrop-blur-md p-6 border-t border-gray-100 flex gap-3 shrink-0">
             <Button variant="outline" onClick={() => { setActiveMiniTab('Overview'); setSelectedStatus(null); setSelectedSubStatus(null); }} className="flex-1 h-12 rounded-xl text-gray-500 font-bold border-gray-100">
                Cancel
             </Button>
             <Button className="flex-1 h-12 rounded-xl bg-[#4A1D59] hover:bg-[#351C43] text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-100">
                Save and Next
             </Button>
             <Button className="flex-1 h-12 rounded-xl bg-[#371D45] hover:bg-[#25132F] text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-100">
                Save and Close
             </Button>
          </div>
        ) : activeMiniTab === 'Notes' ? (
           <div className="sticky bottom-0 bg-white/80 backdrop-blur-md p-6 border-t border-gray-100 shrink-0">
              <div className="relative bg-white border border-gray-200 rounded-[24px] p-2 flex items-center gap-4 shadow-sm focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                 <Textarea 
                   placeholder="Type here" 
                   className="flex-1 min-h-[60px] border-none focus-visible:ring-0 resize-none py-3 px-4 font-bold text-sm text-gray-600"
                 />
                 <button className="w-12 h-12 rounded-2xl bg-[#371D45] flex items-center justify-center text-white hover:bg-[#25132F] transition-all shadow-lg active:scale-95 shrink-0">
                    <Check className="w-6 h-6 stroke-[3]" />
                 </button>
              </div>
           </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default LeadPreviewPanel;
