import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SalesSidebar from '@/components/dashboard/sales/SalesSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  TrendingUp, 
  Calendar, 
  Info, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  ChevronDown,
  Building2,
  FileCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import IncentiveDateFilter from '@/components/dashboard/sales/IncentiveDateFilter';

const StatCard = ({ label, value, subtext, subtext2, icon, bgGradient, borderTopColor, iconBg, iconColor }: any) => (
  <div 
    className="rounded-[24px] p-6 flex-1 shadow-sm flex items-center justify-between min-w-[300px] relative overflow-hidden border border-white"
    style={{ background: bgGradient, borderTop: `1px solid ${borderTopColor}` }}
  >
    <div className="relative z-10 space-y-2">
      <p className="text-[13px] font-black text-[#371D45] tracking-tight">{label}</p>
      <h3 className="text-3xl font-black text-[#1a1a1a]">{value}</h3>
      <div className="space-y-0.5">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{subtext}</p>
        {subtext2 && <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{subtext2}</p>}
      </div>
    </div>
    <div 
      className="w-14 h-14 rounded-[20px] flex items-center justify-center shadow-lg shadow-black/5"
      style={{ background: iconBg }}
    >
      {React.cloneElement(icon as React.ReactElement, { className: cn('w-7 h-7', iconColor) })}
    </div>
  </div>
);

const IncentivePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeQuarter, setActiveQuarter] = useState('Q1');
  const [expandedMonth, setExpandedMonth] = useState<string | null>('February 2026');

  if (!isAuthenticated) return <Navigate to="/" replace />;

  const receivedIncentives = [
    { month: 'June 2025', amount: '₹ 1,25,000', paidOn: 'Dec 15, 2025', ref: 'INC-2025-12-0847' },
    { month: 'May 2025', amount: '₹ 98,000', paidOn: 'Nov 15, 2025', ref: 'INC-2025-11-0723' },
    { month: 'April 2025', amount: '₹ 1,45,000', paidOn: 'Oct 15, 2025', ref: 'INC-2025-10-0645' },
    { month: 'March 2025', amount: '₹ 87,500', paidOn: 'Sep 15, 2025', ref: 'INC-2025-09-0534' },
    { month: 'February 2025', amount: '₹ 1,10,000', paidOn: 'Aug 15, 2025', ref: 'INC-2025-08-0421' },
    { month: 'January 2025', amount: '₹ 1,10,000', paidOn: 'July 15, 2025', ref: 'INC-2025-08-0421' },
    { month: 'December 2024', amount: '₹ 1,10,000', paidOn: 'June 15, 2025', ref: 'INC-2025-08-0421' },
  ];

  const receivableIncentives = [
    { 
      month: 'February 2026', 
      amount: '₹ 38,000', 
      sub: 'For work done in August 2025 • Expected: Feb 15, 2026',
      deals: [
        { name: 'Emerald Heights', type: 'Booking', deal: '₹ 45L', amount: '₹ 22,500' },
        { name: 'Royal Gardens', type: 'Registration', deal: '₹ 52L', amount: '₹ 15,500' },
      ]
    },
    { month: 'March 2026', amount: '₹ 95,500', sub: 'For work done in September 2025 • Expected: Mar 15, 2026' },
    { month: 'April 2026', amount: '₹ 1,23,000', sub: 'For work done in October 2025 • Expected: Apr 15, 2026' },
    { month: 'May 2026', amount: '₹ 78,500', sub: 'For work done in November 2025 • Expected: May 15, 2026' },
    { month: 'June 2026', amount: '₹ 62,000', sub: 'For work done in December 2025 • Expected: Jun 15, 2026' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <DashboardHeader />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <SalesSidebar />

        <main className="flex-1 overflow-y-auto p-6 scroll-smooth no-scrollbar megaplex-scrollbar">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-black">
                <span>Team</span>
                <span className="text-gray-300">/</span>
                <span className="text-[#4A1D59]">Incentive</span>
              </div>
              <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">Incentive Analytics</h2>
            </div>

            <div className="flex items-center gap-2 bg-white p-1.5 rounded-[18px] shadow-sm border border-gray-100">
              {['Q1', 'Q2', 'Q3', 'Q4'].map(q => (
                <button
                  key={q}
                  onClick={() => setActiveQuarter(q)}
                  className={cn(
                    "px-5 py-2 rounded-[12px] text-[11px] font-black transition-all",
                    activeQuarter === q ? "bg-[#4A1D59] text-white shadow-lg shadow-purple-100" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {q}
                </button>
              ))}
              <div className="w-[1px] h-4 bg-gray-100 mx-1" />
              <IncentiveDateFilter />
            </div>
          </div>

          {/* Top Stat Cards */}
          <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-1">
            <StatCard 
              label="Incentives Received" 
              value="₹ 2,85,000" 
              subtext="Total paid till date"
              subtext2="Last paid: January 2026"
              icon={<Wallet />}
              bgGradient="linear-gradient(151.16deg, rgba(34, 197, 94, 0.05) 7.98%, rgba(21, 128, 61, 0.05) 92.02%)"
              borderTopColor="#bbf7d0"
              iconBg="#f0fdf4"
              iconColor="text-green-600"
            />
            <StatCard 
              label="Receivable This Month" 
              value="₹ 92,500" 
              subtext="Scheduled for current payout cycle"
              subtext2="Expected: Jan 15, 2026"
              icon={<TrendingUp />}
              bgGradient="linear-gradient(151.16deg, rgba(239, 68, 68, 0.05) 7.98%, rgba(185, 28, 28, 0.05) 92.02%)"
              borderTopColor="#fecaca"
              iconBg="#fef2f2"
              iconColor="text-red-500"
            />
            <StatCard 
              label="Total Receivable" 
              value="₹ 1,68,000" 
              subtext="Upcoming incentives (next months)"
              subtext2="Next 6 months"
              icon={<Calendar />}
              bgGradient="linear-gradient(151.26deg, rgba(173, 70, 255, 0.05) 8%, rgba(152, 16, 250, 0.05) 92%)"
              borderTopColor="#E9D4FF80"
              iconBg="#FBF2FF"
              iconColor="text-purple-500"
            />
          </div>

          {/* Detailed Receivable Banner */}
          <div className="mb-8 rounded-[32px] bg-white border border-blue-50 shadow-sm overflow-hidden">
            <div className="p-6 bg-blue-50/30 flex items-center justify-between border-b border-blue-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Info className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-black text-blue-900 tracking-tight">Receivable This Month</h4>
                  <p className="text-[11px] font-bold text-blue-600/60 uppercase tracking-widest">Incentives scheduled for payout in current cycle</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Total Amount</p>
                <p className="text-lg font-black text-blue-600 tracking-tight">₹ 92,500</p>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black text-[#1a1a1a]">Incentive Month: July 2025</h3>
                    <Badge className="bg-blue-100 text-blue-600 border-none px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">Processing</Badge>
                  </div>
                  <p className="text-xs font-bold text-gray-400">Final verification in progress</p>
                  <div className="flex items-center gap-2 text-xs font-black text-[#1a1a1a] bg-slate-50 w-fit px-4 py-2 rounded-xl border border-slate-100">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Expected Payout Date: <span className="text-[#4A1D59]">January 15, 2026</span></span>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tighter">₹ 92,500</h2>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#FBF2FF] border-t border-purple-50 flex items-center gap-3">
              <Info className="w-4 h-4 text-[#4A1D59]" />
              <p className="text-[11px] font-bold text-[#4A1D59]/80">Payment will be processed within 2 business days of the expected payout date. You will receive a confirmation email once the transfer is complete.</p>
            </div>
          </div>

          {/* History and Upcoming Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Received Incentives */}
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-base font-black text-[#1a1a1a]">Received Incentives</h3>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Confirmed and paid incentives</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Received</p>
                  <p className="text-xl font-black text-green-600 tracking-tight">₹ 5,65,500</p>
                </div>
              </div>

              <div className="space-y-4">
                {receivedIncentives.map((item, idx) => (
                  <div key={idx} className="group p-5 rounded-[24px] border border-gray-50 hover:border-purple-100 hover:bg-[#FBF2FF]/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-[#1a1a1a]">{item.month}</span>
                        <Badge className="bg-green-100 text-green-600 border-none px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider">Paid</Badge>
                      </div>
                      <span className="text-sm font-black text-[#1a1a1a]">{item.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <span>Paid on: <span className="text-gray-600">{item.paidOn}</span></span>
                      <span>Ref: <span className="text-gray-600">{item.ref}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Total Receivable */}
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-base font-black text-[#1a1a1a]">Total Receivable</h3>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Upcoming incentives over the next months</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                  <p className="text-xl font-black text-[#4A1D59] tracking-tight">₹ 4,67,000</p>
                </div>
              </div>

              <div className="space-y-4">
                {receivableIncentives.map((item, idx) => {
                  const isExpanded = expandedMonth === item.month;
                  return (
                    <div key={idx} className="space-y-3">
                      <button 
                        onClick={() => setExpandedMonth(isExpanded ? null : item.month)}
                        className={cn(
                          "w-full text-left p-5 rounded-[24px] border transition-all flex items-center justify-between group",
                          isExpanded ? "bg-[#FBF2FF] border-[#4A1D59]/20 shadow-sm" : "bg-white border-gray-50 hover:bg-slate-50"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                            isExpanded ? "bg-[#4A1D59] text-white" : "bg-slate-100 text-gray-400 group-hover:bg-slate-200"
                          )}>
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-black text-[#1a1a1a]">{item.month}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.sub}</p>
                          </div>
                        </div>
                        <span className="text-sm font-black text-[#1a1a1a]">{item.amount}</span>
                      </button>

                      {isExpanded && item.deals && (
                        <div className="mx-5 p-6 rounded-[24px] bg-slate-50/80 border border-slate-100 space-y-4 animate-in slide-in-from-top-2 duration-300">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-slate-200 pb-2">Breakdown by Deal:</p>
                          <div className="space-y-4">
                            {item.deals.map((deal, didx) => (
                              <div key={didx} className="flex items-center justify-between group/deal">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#4A1D59]">
                                    {deal.type === 'Booking' ? <Building2 className="w-4 h-4" /> : <FileCheck className="w-4 h-4" />}
                                  </div>
                                  <div className="space-y-0.5">
                                    <h5 className="text-xs font-black text-[#1a1a1a] group-hover/deal:text-[#4A1D59] transition-colors">{deal.name}</h5>
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                      <span className="w-1.5 h-1.5 rounded-full bg-purple-200" />
                                      {deal.type} Deal: <span className="text-gray-600">{deal.deal}</span>
                                    </div>
                                  </div>
                                </div>
                                <span className="text-xs font-black text-[#1a1a1a]">{deal.amount}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IncentivePage;
