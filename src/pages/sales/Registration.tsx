import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SalesSidebar from '@/components/dashboard/sales/SalesSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  PhoneIncoming, 
  CheckSquare, 
  ClipboardList, 
  XCircle,
  ChevronUp
} from 'lucide-react';
import catImage from '@/assets/cat.png';
import RegistrationColumnModifier from '@/components/dashboard/sales/RegistrationColumnModifier';
import RegistrationFilterPanel from '@/components/dashboard/sales/RegistrationFilterPanel';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  bgGradient: string;
  borderTopColor: string;
  iconBg: string;
}

const StatCard = ({ label, value, trend, icon, bgGradient, borderTopColor, iconBg }: StatCardProps) => (
  <div 
    className="rounded-[24px] p-5 flex-1 shadow-sm flex items-center justify-between min-w-[240px] relative overflow-hidden border border-white"
    style={{ background: bgGradient, borderTop: `1px solid ${borderTopColor}` }}
  >
    <div className="relative z-10 space-y-1">
      <p className="text-[13px] font-black text-[#371D45] tracking-tight">{label}</p>
      <div className="flex items-center gap-3">
        <h3 className="text-3xl font-black text-[#1a1a1a]">{value}</h3>
        {trend && (
          <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {trend.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value}
          </div>
        )}
      </div>
    </div>
    <div 
      className="w-14 h-14 rounded-[18px] flex items-center justify-center shadow-lg shadow-black/5"
      style={{ background: iconBg }}
    >
      {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: 'w-7 h-7 text-white' })}
    </div>
  </div>
);

interface RegisteredLead {
  sr: string;
  client: string;
  contact: string;
  bookingDate: string;
  regDate: string;
  timeline: string;
  revisitDate: string;
  revisitCount: string;
  lastVisit: string;
  status: string;
}

interface PendingLead {
  sr: string;
  client: string;
  contact: string;
  requirement: string;
  budget: string;
  remarks: string;
  revisitDate: string;
  revisitCount: string;
  lastVisit: string;
  status: string;
}

const RegistrationPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isReviewMode, setIsReviewMode] = React.useState(false);
  
  if (!isAuthenticated) return <Navigate to="/" replace />;
  
  const registeredLeads: RegisteredLead[] = [
    { 
      sr: '#13123', 
      client: 'Rahul Sharma', 
      contact: '******2413', 
      bookingDate: '01/06/2026', 
      regDate: '12/06/2026', 
      timeline: '12 days', 
      revisitDate: '21/11/25', 
      revisitCount: '3', 
      lastVisit: '1/12/25',
      status: 'Registered'
    },
  ];

  const pendingLeads: PendingLead[] = [
    {
      sr: '#13123',
      client: 'Rahul Sharma',
      contact: '******2413',
      requirement: '1 BHK, 2 BHK',
      budget: '₹90L - ₹1.5 Cr',
      remarks: 'Documentation pending',
      revisitDate: '13/12/25',
      revisitCount: '1',
      lastVisit: '1/12/25',
      status: 'Not Registered'
    }
  ];

  const currentLeads = isReviewMode ? pendingLeads : registeredLeads;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <DashboardHeader />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <SalesSidebar />

        <main className="flex-1 overflow-y-auto p-6 scroll-smooth no-scrollbar">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-6 uppercase tracking-widest font-black">
            <span>Projects</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#4A1D59]">Registration</span>
          </div>

          {/* Stat Cards Container */}
          <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-1">
            <StatCard 
              label="Registration Pending" 
              value="4" 
              trend={{ value: '5.2%', isPositive: true }}
              icon={<PhoneIncoming />}
              bgGradient="linear-gradient(151.16deg, rgba(43, 127, 255, 0.1) 7.98%, rgba(21, 93, 252, 0.1) 92.02%)"
              borderTopColor="#BEDBFF80"
              iconBg="#2B7FFF"
            />
            <StatCard 
              label="Completed" 
              value="3" 
              trend={{ value: '5.2%', isPositive: true }}
              icon={<CheckSquare />}
              bgGradient="linear-gradient(151.26deg, rgba(173, 70, 255, 0.1) 8%, rgba(152, 16, 250, 0.1) 92%)"
              borderTopColor="#E9D4FF80"
              iconBg="#AD46FF"
            />
            <StatCard 
              label="Pending Docs" 
              value="7" 
              trend={{ value: '5.2%', isPositive: false }}
              icon={<ClipboardList />}
              bgGradient="linear-gradient(151.26deg, rgba(246, 51, 154, 0.1) 8%, rgba(230, 0, 118, 0.1) 92%)"
              borderTopColor="#FCCEE880"
              iconBg="#F6339A"
            />
            <StatCard 
              label="Completion %" 
              value="4%" 
              trend={{ value: '5.2%', isPositive: false }}
              icon={<XCircle />}
              bgGradient="linear-gradient(151.16deg, rgba(255, 105, 0, 0.2) 7.98%, rgba(245, 73, 0, 0.1) 92.02%)"
              borderTopColor="#FFD6A780"
              iconBg="#FF6900"
            />
          </div>

          {/* Pending Registrations Alert Banner */}
          <div className={cn(
            "mb-8 p-4 rounded-[24px] border transition-all duration-300 flex items-center justify-between shadow-sm relative overflow-hidden group",
            isReviewMode ? "bg-orange-50 border-orange-200" : "bg-white border-orange-100"
          )}>
             <div className="absolute top-2 right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-black border-2 border-white">!</div>
             <div className="flex flex-col gap-1">
                <h4 className="text-sm font-black text-orange-600 uppercase tracking-tight">Pending Registrations</h4>
                <p className="text-[11px] font-bold text-gray-400">Review and complete registrations that are currently on hold</p>
             </div>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <span className="text-sm font-black text-orange-600">24 Registrations</span>
                   <ChevronUp className={cn("w-5 h-5 text-orange-400 transition-transform", isReviewMode && "rotate-180")} />
                </div>
                <Button 
                  onClick={() => setIsReviewMode(!isReviewMode)}
                  className="h-11 rounded-[16px] px-8 bg-[#F15025] hover:bg-[#D43E19] text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-100 transition-all active:scale-95"
                >
                   {isReviewMode ? 'Close Review' : 'Review'}
                </Button>
             </div>
          </div>

          {/* Leads Card */}
          <div className={cn(
            "bg-white rounded-[32px] shadow-sm border transition-all duration-500 p-6 relative",
            isReviewMode ? "border-orange-200 ring-4 ring-orange-50" : "border-gray-100"
          )}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className={cn(
                  "text-3xl font-black tracking-tight whitespace-nowrap transition-colors",
                  isReviewMode ? "text-orange-600" : "text-[#1a1a1a]"
                )}>
                  {isReviewMode ? 'Pending Registrations' : 'Registered Leads'}
                </h2>
              </div>
              
              <div className="flex flex-1 max-w-2xl relative group">
                <img 
                  src={catImage} 
                  alt="Cat" 
                  className="absolute -left-28 -top-14 w-32 h-32 object-contain drop-shadow-xl select-none pointer-events-none z-10" 
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4A1D59] transition-colors" />
                <Input 
                  placeholder="Search by Lead Name, Lead ID..." 
                  className="pl-14 h-14 bg-slate-50/80 border-none rounded-[20px] text-base font-medium placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-purple-100 transition-all"
                />
              </div>
            </div>

            {/* Advanced Actions Bar */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <RegistrationColumnModifier />
              <RegistrationFilterPanel />
              <Button className="h-11 rounded-[16px] text-xs font-black text-[#4A1D59] border border-purple-100 bg-[#FBF2FF] px-6 hover:bg-purple-100 transition-colors shadow-sm">
                <Download className="w-4 h-4 mr-2" /> Download Excel
              </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-[24px] megaplex-scrollbar pb-2">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className={cn(
                    "text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors",
                    isReviewMode ? "bg-orange-50/80 text-orange-700" : "bg-[#FBF2FF]/80 text-[#4A1D59]"
                  )}>
                    <th className="py-3 px-4 text-left border-b border-orange-100">Sr. no</th>
                    <th className="py-3 px-4 text-left border-b border-orange-100">Client Name</th>
                    <th className="py-3 px-4 text-left border-b border-orange-100">Contact Number</th>
                    
                    {isReviewMode ? (
                      <>
                        <th className="py-3 px-4 text-left border-b border-orange-100">Requirement</th>
                        <th className="py-3 px-4 text-left border-b border-orange-100">Budget</th>
                        <th className="py-3 px-4 text-left border-b border-orange-100">Remarks</th>
                      </>
                    ) : (
                      <>
                        <th className="py-3 px-4 text-left border-b border-purple-50">Booking Date</th>
                        <th className="py-3 px-4 text-left border-b border-purple-50">Reg Date</th>
                        <th className="py-3 px-4 text-left border-b border-purple-50">Reg. Timeline</th>
                      </>
                    )}
                    
                    <th className="py-3 px-4 text-left border-b border-orange-100">Revisit Date</th>
                    <th className="py-3 px-4 text-left border-b border-orange-100">Revisit Count</th>
                    <th className="py-3 px-4 text-left border-b border-orange-100">Last Visit Date</th>
                    <th className="py-3 px-4 text-left border-b border-orange-100">Registration Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[...Array(10)].map((_, i) => {
                    const item = isReviewMode ? (pendingLeads[0] as any) : (registeredLeads[0] as any);
                    return (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-all whitespace-nowrap">
                        <td className="py-4 px-4 text-[11px] font-bold text-gray-400">{isReviewMode ? item.sr : item.sr}</td>
                        <td className="py-4 px-4 text-xs font-black text-[#1a1a1a]">{item.client}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-500">{item.contact}</td>
                        
                        {isReviewMode ? (
                          <>
                            <td className="py-4 px-4 text-xs font-bold text-[#4A1D59]">{item.requirement}</td>
                            <td className="py-4 px-4 text-xs font-black text-orange-600">{item.budget}</td>
                            <td className="py-4 px-4 text-xs font-bold text-gray-500">{item.remarks}</td>
                          </>
                        ) : (
                          <>
                            <td className="py-4 px-4 text-xs font-bold text-gray-700">{item.bookingDate}</td>
                            <td className="py-4 px-4 text-xs font-bold text-gray-700">{item.regDate}</td>
                            <td className="py-4 px-4 text-xs font-bold text-[#4A1D59]">{item.timeline}</td>
                          </>
                        )}
                        
                        <td className="py-4 px-4 text-xs font-bold text-gray-700">{item.revisitDate}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-700 text-center">{item.revisitCount}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-700">{item.lastVisit}</td>
                        <td className="py-4 px-4">
                           <Badge className={cn(
                             "px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-wider",
                             item.status === 'Registered' ? "bg-green-100 text-green-600 border-green-200" : "bg-orange-100 text-orange-600 border-orange-200"
                           )}>
                              {item.status}
                           </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegistrationPage;
