import React, { useState } from 'react';
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
  FileText,
  ClipboardList,
  X,
  SlidersHorizontal
} from 'lucide-react';
import catImage from '@/assets/cat.png';
import SiteVisitFilterDropdown from '@/components/dashboard/sales/SiteVisitFilterDropdown';
import SalesReportColumnModifier from '@/components/dashboard/sales/SalesReportColumnModifier';
import { cn } from '@/lib/utils';

const ReportStatCard = ({ label, value, trend, icon, bgGradient, borderTopColor, iconBg }: any) => (
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

const SalesReportPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<'table' | 'unit'>('table');
  
  if (!isAuthenticated) return <Navigate to="/" replace />;
  
  const inventory = [
    { sr: '1', unit: 'A-1106', status: 'Booked', source: 'Marketing', floor: '11', areaFeet: '811', areaMtr: '75.37', type: '3 BHK', rrYear: '2025-2026', rrRate: '1,49,560', rrFactor: '1.10', marketVal: '1,36,39,538', carPark: '5,21,217', total: '1,41,60,745' },
    { sr: '1', unit: 'A-1106', status: 'Hold', source: 'Marketing', floor: '11', areaFeet: '811', areaMtr: '75.37', type: '3 BHK', rrYear: '2025-2026', rrRate: '1,49,560', rrFactor: '1.10', marketVal: '1,36,39,538', carPark: '5,21,217', total: '1,41,60,745' },
    { sr: '1', unit: 'A-1106', status: 'Booked', source: 'Marketing', floor: '11', areaFeet: '811', areaMtr: '75.37', type: '3 BHK', rrYear: '2025-2026', rrRate: '1,49,560', rrFactor: '1.10', marketVal: '1,36,39,538', carPark: '5,21,217', total: '1,41,60,745' },
    { sr: '1', unit: 'A-1106', status: 'Hold', source: 'Marketing', floor: '11', areaFeet: '811', areaMtr: '75.37', type: '3 BHK', rrYear: '2025-2026', rrRate: '1,49,560', rrFactor: '1.10', marketVal: '1,36,39,538', carPark: '5,21,217', total: '1,41,60,745' },
    { sr: '1', unit: 'A-1106', status: 'Booked', source: 'Marketing', floor: '11', areaFeet: '811', areaMtr: '75.37', type: '3 BHK', rrYear: '2025-2026', rrRate: '1,49,560', rrFactor: '1.10', marketVal: '1,36,39,538', carPark: '5,21,217', total: '1,41,60,745' },
  ];

  const floors = [22, 21, 20, 19, 18, 17, 16];
  const unitColors = {
    Booked: 'border-green-400 bg-green-50/10 text-green-700',
    Hold: 'border-yellow-400 bg-yellow-50/10 text-yellow-700',
    Refugee: 'border-red-400 bg-red-50 text-red-600'
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
            <span className="text-[#4A1D59]">Sales Report</span>
          </div>

          {/* Stat Cards Container */}
          <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-1">
            <ReportStatCard 
              label="Bookings Made" 
              value="23" 
              trend={{ value: '5.2%', isPositive: true }}
              icon={<Briefcase />}
              bgGradient="linear-gradient(151.16deg, rgba(43, 127, 255, 0.1) 7.98%, rgba(21, 93, 252, 0.1) 92.02%)"
              borderTopColor="#BEDBFF80"
              iconBg="#2B7FFF"
            />
            <ReportStatCard 
              label="Value Booked" 
              value="₹14.4Cr" 
              trend={{ value: '5.2%', isPositive: true }}
              icon={<Wallet />}
              bgGradient="linear-gradient(151.26deg, rgba(173, 70, 255, 0.1) 8%, rgba(152, 16, 250, 0.1) 92%)"
              borderTopColor="#E9D4FF80"
              iconBg="#AD46FF"
            />
            <ReportStatCard 
              label="Pending Docs" 
              value="7" 
              trend={{ value: '5.2%', isPositive: false }}
              icon={<FileText />}
              bgGradient="linear-gradient(151.26deg, rgba(246, 51, 154, 0.1) 8%, rgba(230, 0, 118, 0.1) 92%)"
              borderTopColor="#FCCEE880"
              iconBg="#F6339A"
            />
            <ReportStatCard 
              label="Registration Pending" 
              value="9" 
              trend={{ value: '5.2%', isPositive: false }}
              icon={<ClipboardList />}
              bgGradient="linear-gradient(151.16deg, rgba(255, 105, 0, 0.2) 7.98%, rgba(245, 73, 0, 0.1) 92.02%)"
              borderTopColor="#FFD6A780"
              iconBg="#FF6900"
            />
          </div>

          {/* Inventory/Unit Table Card */}
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black text-[#1a1a1a] tracking-tight">
                  {viewMode === 'table' ? 'Inventory Table' : 'Unit Wise Table'}
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

            {/* Filter Badges for Unit View */}
            {viewMode === 'unit' && (
              <div className="flex gap-3 mb-6">
                 <Badge className="bg-green-100 text-green-700 border-green-200 px-5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Booked</Badge>
                 <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 px-5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Hold</Badge>
                 <Badge className="bg-red-100 text-red-700 border-red-200 px-5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Refugee Area</Badge>
              </div>
            )}

            {/* Advanced Actions Bar */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <SalesReportColumnModifier />
              <SiteVisitFilterDropdown />
              <Button 
                variant="outline" 
                onClick={() => setViewMode(viewMode === 'table' ? 'unit' : 'table')}
                className="h-11 rounded-[16px] text-xs font-black text-gray-600 border-gray-100 px-5 bg-white hover:bg-slate-50 shadow-sm transition-all"
              >
                 {viewMode === 'table' ? 'View Unit Wise' : 'View Table Wise'}
              </Button>
              <Button className="h-11 rounded-[16px] text-xs font-black text-[#4A1D59] border border-purple-100 bg-[#FBF2FF] px-6 hover:bg-purple-100 transition-colors">
                <Download className="w-4 h-4 mr-2" /> Download Excel
              </Button>
            </div>

            {/* View Switching */}
            {viewMode === 'table' ? (
              <div className="overflow-x-auto rounded-[24px]">
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-[#FBF2FF]/80 text-[#4A1D59] text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                      <th className="py-3 px-4 text-left border-b border-purple-50">Sr. no</th>
                      <th className="py-3 px-4 text-left border-b border-purple-50">Unit</th>
                      <th className="py-3 px-4 text-center border-b border-purple-50">Status</th>
                      <th className="py-3 px-4 text-left border-b border-purple-50">Source</th>
                      <th className="py-3 px-4 text-center border-b border-purple-50">Floor</th>
                      <th className="py-3 px-4 text-center border-b border-purple-50">Area Feet</th>
                      <th className="py-3 px-4 text-center border-b border-purple-50">Area Mtr[A]</th>
                      <th className="py-3 px-4 text-center border-b border-purple-50">Type</th>
                      <th className="py-3 px-4 text-center border-b border-purple-50">RR Year</th>
                      <th className="py-3 px-4 text-right border-b border-purple-50">RR Rate[B]</th>
                      <th className="py-3 px-4 text-center border-b border-purple-50">RR Factor[C]</th>
                      <th className="py-3 px-4 text-center border-b border-purple-50">Market Value[A*B*1.1*C]</th>
                      <th className="py-3 px-4 text-center border-b border-purple-50">Car Park Value[13.94*B*0.25]</th>
                      <th className="py-3 px-4 text-center border-b border-purple-50">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[...Array(12)].map((_, i) => {
                      const item = inventory[i % inventory.length];
                      return (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-all whitespace-nowrap">
                          <td className="py-3 px-4 text-[11px] font-bold text-gray-400">{item.sr}</td>
                          <td className="py-3 px-4 text-xs font-black text-[#1a1a1a]">{item.unit}</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center">
                              {item.status === 'Booked' ? (
                                <Badge className="bg-green-50 text-green-600 border-green-100 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                  Booked
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-white text-yellow-600 border-yellow-200 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm shadow-yellow-50">
                                  Hold
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-xs font-bold text-gray-500">{item.source}</td>
                          <td className="py-3 px-4 text-center text-xs font-bold text-gray-700">{item.floor}</td>
                          <td className="py-3 px-4 text-center text-xs font-bold text-gray-700">{item.areaFeet}</td>
                          <td className="py-3 px-4 text-center text-xs font-bold text-gray-700">{item.areaMtr}</td>
                          <td className="py-3 px-4 text-center text-xs font-bold text-gray-700">{item.type}</td>
                          <td className="py-3 px-4 text-center text-xs font-bold text-gray-500">{item.rrYear}</td>
                          <td className="py-3 px-4 text-right text-xs font-black text-[#1a1a1a]">{item.rrRate}</td>
                          <td className="py-3 px-4 text-center text-xs font-bold text-[#1a1a1a]">{item.rrFactor}</td>
                          <td className="py-3 px-4 text-center text-xs font-black text-[#1a1a1a]">{item.marketVal}</td>
                          <td className="py-3 px-4 text-center text-xs font-black text-[#1a1a1a]">{item.carPark}</td>
                          <td className="py-3 px-4 text-center text-sm font-black text-[#4A1D59]">{item.total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-4">
                 {floors.map(floor => (
                   <div key={floor} className="flex gap-4 items-stretch">
                      <div className="w-24 bg-[#FBF2FF] rounded-2xl flex items-center justify-center border border-purple-100">
                         <span className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest whitespace-nowrap">Floor {floor}</span>
                      </div>
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3">
                         {[1, 2, 3, 4, 5].map(unit => {
                           const isRefugee = (floor === 18 && unit === 1) || (floor === 17 && unit > 2) || (floor === 16 && unit === 1);
                           const status = unit % 2 === 0 ? 'Hold' : 'Booked';
                           
                           if (isRefugee) {
                             return (
                               <div key={unit} className="h-24 rounded-2xl border-2 border-red-400 bg-red-50 flex items-center justify-center">
                                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Refugee Area</span>
                               </div>
                             );
                           }

                           return (
                             <div key={unit} className={cn(
                               "h-24 rounded-2xl border-2 p-3 flex flex-col justify-between transition-all hover:shadow-md cursor-pointer group",
                               status === 'Booked' ? unitColors.Booked : unitColors.Hold
                             )}>
                               <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-1.5">
                                     <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center opacity-50">
                                        <span className="text-[8px]">i</span>
                                     </div>
                                     <span className="text-xs font-black uppercase tracking-tight">A-{floor}0{unit}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                     {unit % 3 === 0 && <span className="text-[8px] font-black">XL</span>}
                                     <Briefcase className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                  </div>
                               </div>
                               <div className="space-y-0.5">
                                  <p className="text-[9px] font-bold opacity-60">Mr. Sunil D'Souza</p>
                               </div>
                             </div>
                           );
                         })}
                      </div>
                   </div>
                 ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalesReportPage;
