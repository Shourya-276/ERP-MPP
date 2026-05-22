import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SalesSidebar from '@/components/dashboard/sales/SalesSidebar';
import { 
  Hourglass, 
  ClipboardCheck, 
  FileText, 
  XCircle, 
  Home, 
  Car, 
  Building, 
  Percent, 
  Eye, 
  MapPin,
  Calendar,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import welcomeIllustration from '@/assets/project-dashboard-illustration.png';
import manImage from '@/assets/man-project.png';
import buildingImage from '@/assets/building behind man.png';
import LocationSummaryModal from '@/components/dashboard/sales/LocationSummaryModal';

const StatCard = ({ label, value, subValue, total, icon, boxColor, progressColor, type = 'default', customPercentage, onViewMore }: any) => {
  const percentage = customPercentage !== undefined ? customPercentage : (total ? (parseInt(value) / total) * 100 : value);
  
  return (
    <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden group hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#1a1a1a]">{value}</span>
            {subValue && <span className="text-sm font-bold text-gray-400">/ {subValue}</span>}
          </div>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
        </div>
        <div 
          className="w-12 h-12 rounded-[16px] flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: boxColor }}
        >
          {React.cloneElement(icon, { 
            className: 'w-6 h-6',
            style: { color: progressColor || 'white' }
          })}
        </div>
      </div>
      
      {type !== 'no-progress' && (
        <div className="space-y-2">
          <div 
            className="h-1.5 w-full rounded-full overflow-hidden"
            style={{ backgroundColor: boxColor }}
          >
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${typeof percentage === 'number' ? percentage : parseInt(percentage)}%`,
                backgroundColor: progressColor || '#4A1D59' 
              }}
            />
          </div>
        </div>
      )}

      {label === 'Leads Location Summary' && (
        <button 
          onClick={onViewMore}
          className="text-[10px] font-black text-[#4A1D59] uppercase tracking-widest hover:underline w-fit"
        >
          View More
        </button>
      )}
    </div>
  );
};

const ProjectDashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showLocationModal, setShowLocationModal] = React.useState(false);
  
  if (!isAuthenticated) return <Navigate to="/" replace />;

  const chartData = [
    { month: 'Jan', value: 240 },
    { month: 'Feb', value: 310 },
    { month: 'Mar', value: 260 },
    { month: 'Apr', value: 330 },
    { month: 'May', value: 280 },
    { month: 'Jun', value: 340 },
    { month: 'Jul', value: 300 },
    { month: 'Aug', value: 320 },
    { month: 'Sep', value: 270 },
    { month: 'Oct', value: 290 },
    { month: 'Nov', value: 300 },
    { month: 'Dec', value: 330 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <DashboardHeader />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <SalesSidebar />

        <main className="flex-1 overflow-y-auto p-6 scroll-smooth no-scrollbar megaplex-scrollbar">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-6 uppercase tracking-widest font-black">
            <span>Projects</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#4A1D59]">Project Dashboard</span>
          </div>

          {/* Welcome Banner */}
          <div 
            className="relative mb-8 rounded-[40px] p-8 border border-orange-100/50"
            style={{ background: 'linear-gradient(95.19deg, #FFFAE5 0%, #FFF5D6 49.86%, #FFE780 99.71%)' }}
          >
             <div className="relative z-10 space-y-4 max-w-2xl">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full w-fit border border-orange-200/50 shadow-sm">
                   <Sparkles className="w-4 h-4 text-orange-400" />
                   <span className="text-[11px] font-black text-orange-600 uppercase tracking-widest">Welcome Back</span>
                </div>
                <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight leading-tight">
                  Welcome to Swastik Developers, Raj!
                </h1>
                <div className="flex items-center gap-3">
                   <p className="text-sm font-bold text-gray-500">
                     You have <span className="text-[#4A1D59] bg-purple-100 px-3 py-1 rounded-lg">7 new leads</span> and <span className="text-[#4A1D59] bg-purple-100 px-3 py-1 rounded-lg">5 notifications</span>
                   </p>
                </div>
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Let's get started!</p>
             </div>
             
             {/* Illustrations */}
             <div className="absolute right-0 bottom-[-55px] w-full h-full pointer-events-none">
                <img 
                  src={buildingImage} 
                  alt="Building" 
                  className="absolute right-[160px] bottom-[-10px] w-[240px] h-auto object-contain drop-shadow-2xl animate-in slide-in-from-bottom-10 duration-700 opacity-90 z-0" 
                />
                <img 
                  src={manImage} 
                  alt="Welcome Man" 
                  className="absolute right-[-20px] bottom-[5px] w-[340px] h-auto object-contain drop-shadow-2xl animate-in slide-in-from-right-10 duration-700 z-10" 
                />
             </div>
          </div>

          {/* Statistics Section Wrap */}
          <div className="rounded-[40px] p-8 space-y-6 mb-8" style={{ background: '#F5D5D280' }}>
            {/* Selectors Row */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 flex flex-wrap items-center justify-between gap-6">
               <div className="flex flex-wrap items-center gap-8">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-[#BAA1C8] uppercase tracking-widest">Developers</p>
                     <h4 className="text-sm font-black text-[#1a1a1a]">Swastik Developers</h4>
                  </div>
                  <div className="w-[1px] h-10 bg-[#EAE2F1] hidden md:block" />
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-[#BAA1C8] uppercase tracking-widest">Project</p>
                     <h4 className="text-sm font-black text-[#1a1a1a]">Swastik Platinum</h4>
                  </div>
                  <div className="w-[1px] h-10 bg-[#EAE2F1] hidden md:block" />
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-[#BAA1C8] uppercase tracking-widest">Building</p>
                     <button className="flex items-center gap-3 group">
                        <span className="text-sm font-black text-[#1a1a1a] group-hover:text-[#4A1D59] transition-colors">Main Building</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#4A1D59] transition-all" />
                     </button>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-[1px] h-10 bg-[#EAE2F1] hidden md:block" />
                  <button className="p-3.5 bg-[#EAE2F1] text-[#4A1D59] rounded-[18px] transition-all border-none shadow-sm hover:bg-[#DED2E9]">
                     <Calendar className="w-5 h-5" />
                  </button>
               </div>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <StatCard label="Pending Bookings" value="25" icon={<Hourglass />} boxColor="#93C5FD" progressColor="#2563EB" type="no-progress" />
               <StatCard label="Approved Bookings" value="49" icon={<ClipboardCheck />} boxColor="#6EE7B7" progressColor="#059669" type="no-progress" />
               <StatCard label="Unapproved Bookings" value="76" icon={<FileText />} boxColor="#C4B5FD" progressColor="#7C3AED" type="no-progress" />
               <StatCard label="Rejected Bookings" value="5" icon={<XCircle />} boxColor="#FD7474" progressColor="#DC2626" type="no-progress" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <StatCard label="Available Units" value="129" subValue="205" total={205} icon={<Home />} boxColor="#FFD3BA" progressColor="#FF6900" />
               <StatCard label="Available Parking" value="82" subValue="205" total={205} icon={<Car />} boxColor="#CFE76E" progressColor="#79B600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <StatCard label="Slab Completed" value="63%" icon={<Building />} boxColor="#E7A26E" progressColor="#B67300" />
               <StatCard label="Current Due" value="87%" icon={<Percent />} boxColor="#80D7CE" progressColor="#01B19F" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <StatCard 
                 label="Leads/ Followups /Booked" 
                 value="230 / 122 / 97" 
                 icon={<Eye />} 
                 boxColor="#FFBAFD" 
                 progressColor="#FF00D4" 
                 total={230} 
                 customPercentage={42}
               />
               <StatCard 
                 label="Leads Location Summary" 
                 value="3" 
                 icon={<MapPin />} 
                 boxColor="#FAF29C" 
                 progressColor="#B69200" 
                 total={10}
                 customPercentage={35}
                 onViewMore={() => setShowLocationModal(true)}
               />
            </div>

            {/* Monthly Units Sold Chart */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
               <h3 className="text-xl font-black text-[#1a1a1a] tracking-tight mb-10">Monthly Units Sold</h3>
               <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} 
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} 
                        />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ 
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                            padding: '12px 16px'
                          }}
                          itemStyle={{ fontSize: '12px', fontWeight: 900, color: '#4A1D59' }}
                          labelStyle={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}
                        />
                        <Bar 
                          dataKey="value" 
                          radius={[8, 8, 8, 8]} 
                          barSize={40}
                        >
                           {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill="#93C5FD" className="hover:fill-[#4A1D59] transition-colors duration-300" />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        </main>
      </div>

      <LocationSummaryModal 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)} 
      />
    </div>
  );
};

export default ProjectDashboard;
