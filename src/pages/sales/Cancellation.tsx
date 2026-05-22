import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SalesSidebar from '@/components/dashboard/sales/SalesSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  RefreshCcw, 
  XCircle,
  Filter
} from 'lucide-react';
import catImage from '@/assets/cat.png';
import CancellationColumnModifier from '@/components/dashboard/sales/CancellationColumnModifier';
import SiteVisitFilterDropdown from '@/components/dashboard/sales/SiteVisitFilterDropdown';

const StatCard = ({ label, value, trend, icon, bgGradient, borderTopColor, iconBg }: any) => (
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

const CancellationPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/" replace />;
  
  const leads = [
    { 
      sr: '1', 
      customer: 'Dattatray Raut', 
      contact: '******9123', 
      wing: 'A', 
      floor: '14', 
      unit: 'A-2102', 
      agreementValue: '79,35,900', 
      allInclusive: '90,21,2131', 
      reason: 'Not Interested'
    },
  ];

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
            <span className="text-[#4A1D59]">Cancellation</span>
          </div>

          {/* Stat Cards Container */}
          <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-1">
            <StatCard 
              label="Requests" 
              value="4" 
              trend={{ value: '5.2%', isPositive: true }}
              icon={<Clock />}
              bgGradient="linear-gradient(151.16deg, rgba(43, 127, 255, 0.1) 7.98%, rgba(21, 93, 252, 0.1) 92.02%)"
              borderTopColor="#BEDBFF80"
              iconBg="#2B7FFF"
            />
            <StatCard 
              label="Approved" 
              value="3" 
              trend={{ value: '5.2%', isPositive: true }}
              icon={<CheckCircle />}
              bgGradient="linear-gradient(151.26deg, rgba(173, 70, 255, 0.1) 8%, rgba(152, 16, 250, 0.1) 92%)"
              borderTopColor="#E9D4FF80"
              iconBg="#AD46FF"
            />
            <StatCard 
              label="Refunds" 
              value="7" 
              trend={{ value: '5.2%', isPositive: false }}
              icon={<RefreshCcw />}
              bgGradient="linear-gradient(151.26deg, rgba(246, 51, 154, 0.1) 8%, rgba(230, 0, 118, 0.1) 92%)"
              borderTopColor="#FCCEE880"
              iconBg="#F6339A"
            />
            <StatCard 
              label="Cancellation %" 
              value="4%" 
              trend={{ value: '5.2%', isPositive: false }}
              icon={<XCircle />}
              bgGradient="linear-gradient(151.16deg, rgba(255, 105, 0, 0.2) 7.98%, rgba(245, 73, 0, 0.1) 92.02%)"
              borderTopColor="#FFD6A780"
              iconBg="#FF6900"
            />
          </div>

          {/* Cancelled Leads Card */}
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black text-[#1a1a1a] tracking-tight whitespace-nowrap">Cancelled Leads</h2>
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
              <CancellationColumnModifier />
              <Button variant="outline" className="h-11 rounded-[16px] text-xs font-black text-gray-600 border-gray-100 px-5 bg-white hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#4A1D59]" /> Filter
              </Button>
              <Button className="h-11 rounded-[16px] text-xs font-black text-[#4A1D59] border border-purple-100 bg-[#FBF2FF] px-6 hover:bg-purple-100 transition-colors shadow-sm">
                <Download className="w-4 h-4 mr-2" /> Download Excel
              </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-[24px] megaplex-scrollbar pb-2">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-[#FBF2FF]/80 text-[#4A1D59] text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    <th className="py-3 px-4 text-left border-b border-purple-50">Sr. no</th>
                    <th className="py-3 px-4 text-left border-b border-purple-50">Customer Name</th>
                    <th className="py-3 px-4 text-left border-b border-purple-50">Contact No</th>
                    <th className="py-3 px-4 text-left border-b border-purple-50">Wing</th>
                    <th className="py-3 px-4 text-left border-b border-purple-50">Floor</th>
                    <th className="py-3 px-4 text-left border-b border-purple-50">Unit No</th>
                    <th className="py-3 px-4 text-left border-b border-purple-50">Agreement Value</th>
                    <th className="py-3 px-4 text-left border-b border-purple-50">All Inclusive</th>
                    <th className="py-3 px-4 text-left border-b border-purple-50">Reason for Cancellation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[...Array(10)].map((_, i) => {
                    const item = leads[0];
                    return (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-all whitespace-nowrap">
                        <td className="py-4 px-4 text-[11px] font-bold text-gray-400">{i + 1}</td>
                        <td className="py-4 px-4 text-xs font-black text-[#1a1a1a]">{item.customer}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-500">{item.contact}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-700">{item.wing}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-700">{item.floor}</td>
                        <td className="py-4 px-4 text-xs font-black text-[#4A1D59]">{item.unit}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-700">{item.agreementValue}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-700">{item.allInclusive}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-500">{item.reason}</td>
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

export default CancellationPage;
