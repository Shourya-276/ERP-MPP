import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SalesSidebar from '@/components/dashboard/sales/SalesSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Download, 
  Edit2, 
  Eye, 
  History, 
  Phone, 
  Trash2,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  Calendar,
  CheckCircle2,
  XCircle,
  RotateCcw,
  FileText
} from 'lucide-react';
import catImage from '@/assets/cat.png';
import LeadPreviewPanel from '@/components/dashboard/sales/LeadPreviewPanel';
import CostSheetForm from '@/components/dashboard/sales/CostSheetForm';
import SiteVisitFilterDropdown from '@/components/dashboard/sales/SiteVisitFilterDropdown';
import RevisitColumnModifier from '@/components/dashboard/sales/RevisitColumnModifier';

const RevisitStatCard = ({ label, value, trend, icon, bgGradient, borderTopColor, iconBg }: any) => (
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

const RevisitPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('All Revisit');
  const [activeFilterTab, setActiveFilterTab] = useState('All');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCostSheetOpen, setIsCostSheetOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/" replace />;
  
  const revisits = [
    { id: '#13123', name: 'Rahul Sharma', contact: '******2413', requirement: '1 BHK, 2 BHK', budget: '₹90L - ₹1.5 Cr', revisitDate: '13/12/25', count: '1', lastVisit: '1/12/25', status: 'Hot' },
    { id: '#13123', name: 'Rahul Sharma', contact: '******2413', requirement: '1 BHK, 2 BHK', budget: '₹90L - ₹1.5 Cr', revisitDate: '13/12/25', count: '1', lastVisit: '1/12/25', status: 'Warm' },
    { id: '#13123', name: 'Rahul Sharma', contact: '******2413', requirement: '1 BHK, 2 BHK', budget: '₹90L - ₹1.5 Cr', revisitDate: '13/12/25', count: '1', lastVisit: '1/12/25', status: 'Cold' },
    { id: '#13123', name: 'Rahul Sharma', contact: '******2413', requirement: '1 BHK, 2 BHK', budget: '₹90L - ₹1.5 Cr', revisitDate: '13/12/25', count: '1', lastVisit: '1/12/25', status: 'Lost' },
    { id: '#13123', name: 'Rahul Sharma', contact: '******2413', requirement: '1 BHK, 2 BHK', budget: '₹90L - ₹1.5 Cr', revisitDate: '13/12/25', count: '1', lastVisit: '1/12/25', status: 'Ready To Revisit' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-[#FF6B6B]';
      case 'Warm': return 'bg-[#FFB347]';
      case 'Cold': return 'bg-[#89CFF0]';
      case 'Lost': return 'bg-[#C0C0C0]';
      case 'Ready To Revisit': return 'bg-[#4CAF50]';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <DashboardHeader />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <SalesSidebar />

        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-6 uppercase tracking-widest font-black">
            <span>Dashboard</span>
            <span className="text-gray-300">/</span>
            <span>Revisits</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#4A1D59] uppercase">{activeTab}</span>
          </div>

          {/* Top Navigation Bar */}
          <div className="bg-[#EAE2F1] -mx-6 px-6 py-2 mb-6 flex items-center gap-2">
            {['All Revisit', 'Revisit Report'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-full text-sm font-black transition-all ${activeTab === tab 
                  ? 'bg-[#371D45] text-white shadow-lg' 
                  : 'text-[#371D45] hover:bg-white/20'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Stat Cards Container */}
          <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-1">
            <RevisitStatCard 
              label="Scheduled" 
              value="12" 
              trend={{ value: '5.2%', isPositive: true }}
              icon={<Calendar />}
              bgGradient="linear-gradient(151.16deg, rgba(43, 127, 255, 0.1) 7.98%, rgba(21, 93, 252, 0.1) 92.02%)"
              borderTopColor="#BEDBFF80"
              iconBg="#2B7FFF"
            />
            <RevisitStatCard 
              label="Completed" 
              value="9" 
              trend={{ value: '5.2%', isPositive: true }}
              icon={<CheckCircle2 />}
              bgGradient="linear-gradient(151.26deg, rgba(173, 70, 255, 0.1) 8%, rgba(152, 16, 250, 0.1) 92%)"
              borderTopColor="#E9D4FF80"
              iconBg="#AD46FF"
            />
            <RevisitStatCard 
              label="Missed" 
              value="3" 
              trend={{ value: '5.2%', isPositive: false }}
              icon={<XCircle />}
              bgGradient="linear-gradient(151.26deg, rgba(246, 51, 154, 0.1) 8%, rgba(230, 0, 118, 0.1) 92%)"
              borderTopColor="#FCCEE880"
              iconBg="#F6339A"
            />
            <RevisitStatCard 
              label="Multi-Revisit" 
              value="4" 
              trend={{ value: '5.2%', isPositive: false }}
              icon={<RotateCcw />}
              bgGradient="linear-gradient(151.16deg, rgba(255, 105, 0, 0.2) 7.98%, rgba(245, 73, 0, 0.1) 92.02%)"
              borderTopColor="#FFD6A780"
              iconBg="#FF6900"
            />
          </div>

          {/* Revisit Table Card */}
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black text-[#1a1a1a] tracking-tight">Revisit Table</h2>
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

            {/* Filter Tabs & Advanced Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
                {['All', 'Hot/Prospect', 'Warm/Interested', 'Cold/Followup', 'Lost/Dead', 'Ready To Revisit'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilterTab(tab)}
                    className={`px-4 py-3 text-[13px] font-black whitespace-nowrap transition-all flex flex-col items-center gap-1.5 ${activeFilterTab === tab ? 'text-[#371D45]' : 'text-[#B29AC0] hover:text-[#371D45]'}`}
                  >
                    <span>{tab}</span>
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeFilterTab === tab ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                      style={{ 
                        background: tab === 'All' 
                          ? 'linear-gradient(90deg, #D00000 5.29%, #F9EF30 25%, #7ACFFA 50%, #939393 75%, #1D9825 100%)' 
                          : tab === 'Hot/Prospect' ? '#D00000'
                          : tab === 'Warm/Interested' ? '#F98030'
                          : tab === 'Cold/Followup' ? '#7ACFFA'
                          : tab === 'Lost/Dead' ? '#939393'
                          : tab === 'Ready To Revisit' ? '#1D9825'
                          : '#4A1D59'
                      }}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <RevisitColumnModifier />
                <SiteVisitFilterDropdown />
                <Button className="h-11 rounded-[16px] text-xs font-black text-[#4A1D59] border border-purple-100 bg-[#FBF2FF] px-6 hover:bg-purple-100 transition-colors">
                  <Download className="w-4 h-4 mr-2" /> Download Excel
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-[24px]">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-[#FBF2FF]/80 text-[#4A1D59] text-[11px] font-black uppercase tracking-widest">
                    <th className="py-3 px-6 text-left border-b border-purple-50">Sr. no</th>
                    <th className="py-3 px-6 text-left border-b border-purple-50">Client Name</th>
                    <th className="py-3 px-6 text-left border-b border-purple-50">Contact Number</th>
                    <th className="py-3 px-6 text-left border-b border-purple-50">Requirement</th>
                    <th className="py-3 px-6 text-left border-b border-purple-50">Budget</th>
                    <th className="py-3 px-6 text-left border-b border-purple-50">Revisit Date</th>
                    <th className="py-3 px-6 text-center border-b border-purple-50">Revisit Count</th>
                    <th className="py-3 px-6 text-center border-b border-purple-50">Last Visit Date</th>
                    <th className="py-3 px-6 text-center border-b border-purple-50">Status</th>
                    <th className="py-3 px-6 text-center border-b border-purple-50">Cost sheet</th>
                    <th className="py-3 px-6 text-center border-b border-purple-50">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[...Array(10)].map((_, i) => {
                    const rev = revisits[i % revisits.length];
                    return (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                        <td className="py-3 px-6 text-[11px] font-bold text-gray-400">{rev.id}</td>
                        <td className="py-3 px-6">
                          <button 
                            onClick={() => {
                              setSelectedLead(rev);
                              setIsPreviewOpen(true);
                            }}
                            className="text-sm font-black text-gray-900 hover:text-purple-600 transition-colors text-left"
                          >
                            {rev.name}
                          </button>
                        </td>
                        <td className="py-3 px-6 text-xs font-bold text-gray-600">{rev.contact}</td>
                        <td className="py-3 px-6 text-xs font-bold text-[#371D45]/80">{rev.requirement}</td>
                        <td className="py-3 px-6 text-xs font-bold text-[#371D45]/80">{rev.budget}</td>
                        <td className="py-3 px-6 text-xs font-bold text-gray-500">{rev.revisitDate}</td>
                        <td className="py-3 px-6 text-center text-xs font-bold text-gray-500">{rev.count}</td>
                        <td className="py-3 px-6 text-center text-xs font-bold text-gray-500">{rev.lastVisit}</td>
                        <td className="py-3 px-6">
                          <div className="flex justify-center">
                            <Badge className={`${getStatusColor(rev.status)} text-white px-5 py-1 rounded-[12px] text-[10px] font-black uppercase tracking-wider border-none shadow-sm w-[130px] justify-center`}>
                              {rev.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex items-center justify-center gap-2">
                             <Button 
                                onClick={() => {
                                  setSelectedLead(rev);
                                  setIsCostSheetOpen(true);
                                }}
                                className="h-8 rounded-lg bg-[#5C3471] hover:bg-[#4A295C] text-white text-[10px] font-black uppercase px-3 shadow-md active:scale-95 transition-all"
                             >
                                Create Cost Sheet
                             </Button>
                             <button className="p-1.5 hover:bg-slate-100 rounded-lg text-gray-400 transition-colors"><Eye className="w-4 h-4" /></button>
                             <button className="p-1.5 hover:bg-slate-100 rounded-lg text-gray-400 transition-colors"><Download className="w-4 h-4" /></button>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center gap-1.5 transition-all">
                            <button className="p-1.5 hover:bg-blue-50 rounded-xl text-blue-400 hover:text-blue-600 transition-all shadow-sm bg-white border border-gray-50" title="Edit"><Edit2 className="w-4 h-4" /></button>
                            <button className="p-1.5 hover:bg-green-50 rounded-xl text-green-400 hover:text-green-600 transition-all shadow-sm bg-white border border-gray-50" title="View"><Eye className="w-4 h-4" /></button>
                            <button className="p-1.5 hover:bg-amber-50 rounded-xl text-amber-400 hover:text-amber-600 transition-all shadow-sm bg-white border border-gray-50" title="History"><History className="w-4 h-4" /></button>
                            <button className="p-1.5 hover:bg-green-50 rounded-xl text-green-500 hover:text-green-700 transition-all shadow-sm bg-white border border-gray-50" title="WhatsApp"><MessageCircle className="w-4 h-4" /></button>
                            <button className="p-1.5 hover:bg-blue-50 rounded-xl text-blue-500 hover:text-blue-700 transition-all shadow-sm bg-white border border-gray-50" title="Call"><Phone className="w-4 h-4" /></button>
                            <button className="p-1.5 hover:bg-red-50 rounded-xl text-red-400 hover:text-red-600 transition-all shadow-sm bg-white border border-gray-50" title="Delete"><Trash2 className="w-4 h-4" /></button>
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

      <LeadPreviewPanel 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        lead={selectedLead} 
      />

      <CostSheetForm 
        isOpen={isCostSheetOpen} 
        onClose={() => setIsCostSheetOpen(false)} 
        lead={selectedLead} 
      />
    </div>
  );
};

export default RevisitPage;
