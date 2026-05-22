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
  Briefcase, 
  Wallet, 
  Coins, 
  ShieldCheck, 
  X, 
  MessageSquare, 
  History, 
  Trash2, 
  Phone, 
  ChevronUp,
  FileText
} from 'lucide-react';
import catImage from '@/assets/cat.png';
import SiteVisitFilterDropdown from '@/components/dashboard/sales/SiteVisitFilterDropdown';
import PaymentColumnModifier from '@/components/dashboard/sales/PaymentColumnModifier';
import PaymentCommentsModal from '@/components/dashboard/sales/PaymentCommentsModal';
import PaymentHistoryModal from '@/components/dashboard/sales/PaymentHistoryModal';
import { cn } from '@/lib/utils';

const PaymentStatCard = ({ label, value, trend, icon, bgGradient, borderTopColor, iconBg }: any) => (
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
      {React.cloneElement(icon as React.ReactElement, { className: 'w-7 h-7 text-white' })}
    </div>
  </div>
);

const PaymentPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/" replace />;
  
  const payments = [
    { 
      sr: '1', 
      customer: 'Dattatray Raut', 
      unit: 'A-2102', 
      loan: '0', 
      mobile: '******4325', 
      psf: '21,324', 
      avgValue: '1,34,67,532', 
      totalReceipts: '1,34,67,532', 
      rcvdPercent: '86%', 
      rcvdValue: '1,34,67,532', 
      rcvblPercent: '14%', 
      rcvblValue: '34,67,532',
      carParking: 'N/A',
      bookingDate: '2022-07-12',
      bank: 'N/A',
      status: 'Confirmed',
      ledger: 'N/A'
    },
  ];

  const [isCommentsOpen, setIsCommentsOpen] = React.useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

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
            <span className="text-[#4A1D59]">Payment</span>
          </div>

          {/* Stat Cards Container */}
          <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-1">
            <PaymentStatCard 
              label="Collected" 
              value="12" 
              trend={{ value: '5.2%', isPositive: true }}
              icon={<Briefcase />}
              bgGradient="linear-gradient(151.16deg, rgba(43, 127, 255, 0.1) 7.98%, rgba(21, 93, 252, 0.1) 92.02%)"
              borderTopColor="#BEDBFF80"
              iconBg="#2B7FFF"
            />
            <PaymentStatCard 
              label="Pending" 
              value="9" 
              trend={{ value: '5.2%', isPositive: true }}
              icon={<FileText />}
              bgGradient="linear-gradient(151.26deg, rgba(173, 70, 255, 0.1) 8%, rgba(152, 16, 250, 0.1) 92%)"
              borderTopColor="#E9D4FF80"
              iconBg="#AD46FF"
            />
            <PaymentStatCard 
              label="Part-Payments" 
              value="7" 
              trend={{ value: '5.2%', isPositive: false }}
              icon={<Coins />}
              bgGradient="linear-gradient(151.26deg, rgba(246, 51, 154, 0.1) 8%, rgba(230, 0, 118, 0.1) 92%)"
              borderTopColor="#FCCEE880"
              iconBg="#F6339A"
            />
            <PaymentStatCard 
              label="Completion %" 
              value="48%" 
              trend={{ value: '5.2%', isPositive: false }}
              icon={<ShieldCheck />}
              bgGradient="linear-gradient(151.16deg, rgba(255, 105, 0, 0.2) 7.98%, rgba(245, 73, 0, 0.1) 92.02%)"
              borderTopColor="#FFD6A780"
              iconBg="#FF6900"
            />
          </div>

          {/* Pending Payments Alert Banner */}
          <div className="mb-8 p-4 rounded-[24px] bg-white border border-orange-100 flex items-center justify-between shadow-sm relative overflow-hidden group">
             <div className="absolute top-2 right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-black border-2 border-white">!</div>
             <div className="flex flex-col gap-1">
                <h4 className="text-sm font-black text-orange-600 uppercase tracking-tight">Pending Payments</h4>
                <p className="text-[11px] font-bold text-gray-400">Review and complete payments that are currently on hold</p>
             </div>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <span className="text-sm font-black text-orange-600">12 Payments</span>
                   <ChevronUp className="w-5 h-5 text-orange-400" />
                </div>
                <Button className="h-11 rounded-[16px] px-8 bg-[#F15025] hover:bg-[#D43E19] text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-100 transition-all active:scale-95">
                   Review
                </Button>
             </div>
          </div>

          {/* Payment Report Card */}
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black text-[#1a1a1a] tracking-tight whitespace-nowrap">Payment Report</h2>
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
              <PaymentColumnModifier />
              <SiteVisitFilterDropdown />
              <Button className="h-11 rounded-[16px] text-xs font-black text-[#4A1D59] border border-purple-100 bg-[#FBF2FF] px-6 hover:bg-purple-100 transition-colors">
                <Download className="w-4 h-4 mr-2" /> Download Excel
              </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-[24px]">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-[#FBF2FF]/80 text-[#4A1D59] text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    <th className="py-3 px-4 text-left border-b border-purple-50">Sr. no</th>
                    <th className="py-3 px-4 text-left border-b border-purple-50">Customer Name</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Unit No</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Loan Flag</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Mobile No</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">PSF</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Avg Value</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Total Receipts</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Rcvd(%)</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Rcvd(₹)</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Rcvbl(%)</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Rcvbl(₹)</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Car Parking</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Booking Date</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Bank</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Status</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Ledger</th>
                    <th className="py-3 px-4 text-center border-b border-purple-50">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[...Array(12)].map((_, i) => {
                    const item = payments[0];
                    return (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-all whitespace-nowrap">
                        <td className="py-4 px-4 text-[11px] font-bold text-gray-400">{item.sr}</td>
                        <td className="py-4 px-4 text-xs font-black text-[#1a1a1a]">{item.customer}</td>
                        <td className="py-4 px-4 text-center text-xs font-black text-[#4A1D59]">{item.unit}</td>
                        <td className="py-4 px-4 text-center text-xs font-bold text-gray-700">{item.loan}</td>
                        <td className="py-4 px-4 text-center text-xs font-bold text-gray-500">{item.mobile}</td>
                        <td className="py-4 px-4 text-center text-xs font-bold text-gray-700">{item.psf}</td>
                        <td className="py-4 px-4 text-center text-xs font-bold text-gray-700">{item.avgValue}</td>
                        <td className="py-4 px-4 text-center text-xs font-black text-[#1a1a1a]">{item.totalReceipts}</td>
                        <td className="py-4 px-4 text-center">
                           <Badge className="bg-[#412B63] text-white border-none px-4 py-1.5 rounded-xl text-[10px] font-black shadow-lg shadow-purple-50">
                              {item.rcvdPercent}
                           </Badge>
                        </td>
                        <td className="py-4 px-4 text-center text-xs font-black text-[#1a1a1a]">{item.rcvdValue}</td>
                        <td className="py-4 px-4 text-center">
                           <Badge className="bg-[#F15025] text-white border-none px-4 py-1.5 rounded-xl text-[10px] font-black shadow-lg shadow-orange-50">
                              {item.rcvblPercent}
                           </Badge>
                        </td>
                        <td className="py-4 px-4 text-center text-xs font-black text-[#1a1a1a]">{item.rcvblValue}</td>
                        <td className="py-4 px-4 text-center text-[10px] font-bold text-gray-400">{item.carParking}</td>
                        <td className="py-4 px-4 text-center text-xs font-bold text-gray-500">{item.bookingDate}</td>
                        <td className="py-4 px-4 text-center text-[10px] font-bold text-gray-400">{item.bank}</td>
                        <td className="py-4 px-4 text-center">
                           <Badge className="bg-green-100 text-green-600 border-green-200 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                              {item.status}
                           </Badge>
                        </td>
                        <td className="py-4 px-4 text-center text-[10px] font-bold text-gray-400">{item.ledger}</td>
                        <td className="py-4 px-4 text-center">
                           <div className="flex items-center justify-center gap-3">
                              <button 
                                onClick={() => setIsCommentsOpen(true)}
                                className="text-blue-400 hover:text-blue-600 transition-colors"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setIsHistoryOpen(true)}
                                className="text-purple-400 hover:text-purple-600 transition-colors"
                              >
                                <History className="w-4 h-4" />
                              </button>
                              <button className="text-green-500 hover:text-green-700 transition-colors"><Phone className="w-4 h-4" /></button>
                              <button className="text-red-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                           </div>
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

      <PaymentCommentsModal 
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        customerName="Dattatray Raut"
        phoneNumber="999999991"
      />

      <PaymentHistoryModal 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        customerName="Mrs. Durgadevi Jaiswal"
        unitNo="A-1301"
      />
    </div>
  );
};

export default PaymentPage;
