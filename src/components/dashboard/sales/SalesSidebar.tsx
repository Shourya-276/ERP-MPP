import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  MapPin,
  RotateCcw,
  FileText,
  CreditCard,
  XCircle,
  ClipboardList,
  Gift,
  FolderOpen,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import sidebarIllustration from '@/assets/sales-team-illustration.png';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, hasSubmenu, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive
      ? 'bg-[#4A1D59] text-white'
      : 'text-muted-foreground hover:bg-muted/50'
      }`}
  >
    {icon}
    <span className="flex-1 text-left font-medium">{label}</span>
    {hasSubmenu && <ChevronDown className="w-4 h-4" />}
  </button>
);

const SalesSidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  // Initialize state based on current path
  const [expandedSection, setExpandedSection] = React.useState<'dashboard' | 'projects' | null>(
    currentPath.startsWith('/sales') ? 'dashboard' : 
    currentPath.startsWith('/projects') ? 'projects' : 'dashboard'
  );

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleSection = (section: 'dashboard' | 'projects') => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  return (
    <aside
      className="h-[calc(100vh-64px)] flex flex-col shrink-0"
      style={{
        width: '200px',
        background: '#FBF2FF',
      }}
    >
      <div className="p-3 flex-1 overflow-y-auto no-scrollbar">
        <p className="text-[10px] font-black text-gray-400 px-3 mb-3 uppercase tracking-widest">Main Menu</p>

        <nav className="space-y-1">
          <NavItem
            icon={<LayoutDashboard className="w-4 h-4" />}
            label="Dashboard"
            isActive={expandedSection === 'dashboard'}
            hasSubmenu
            onClick={() => toggleSection('dashboard')}
          />

          {expandedSection === 'dashboard' && (
            <div className="pl-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <button 
                onClick={() => navigate('/sales')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/sales' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                — Sales Dashboard
              </button>
              <button 
                onClick={() => navigate('/sales/leads')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/sales/leads' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                Leads
              </button>
              <button 
                onClick={() => navigate('/sales/site-visit')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/sales/site-visit' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                Site Visit
              </button>
              <button 
                onClick={() => navigate('/sales/revisit')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/sales/revisit' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                Revisit
              </button>
              <button 
                onClick={() => navigate('/sales/report')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/sales/report' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                Sales Report
              </button>
              <button 
                onClick={() => navigate('/sales/payment')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/sales/payment' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                Payment
              </button>
              <button 
                onClick={() => navigate('/sales/cancellation')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/sales/cancellation' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                Cancellation
              </button>
              <button 
                onClick={() => navigate('/sales/registration')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/sales/registration' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                Registration
              </button>
              <button 
                onClick={() => navigate('/sales/incentive')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/sales/incentive' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                Incentive
              </button>
            </div>
          )}

          <NavItem
            icon={<FolderOpen className="w-4 h-4" />}
            label="Projects"
            isActive={expandedSection === 'projects'}
            hasSubmenu
            onClick={() => toggleSection('projects')}
          />

          {expandedSection === 'projects' && (
            <div className="pl-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <button 
                onClick={() => navigate('/projects/dashboard')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/projects/dashboard' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                — Project Dashboard
              </button>
              <button 
                onClick={() => navigate('/projects/market-value')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all ${currentPath === '/projects/market-value' ? 'text-[#4A1D59] font-bold bg-white/50 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'}`}
              >
                Market Value
              </button>
            </div>
          )}

          <p className="text-[10px] font-black text-gray-400 px-3 mt-6 mb-3 uppercase tracking-widest">Others</p>

          <NavItem
            icon={<Settings className="w-4 h-4" />}
            label="Settings"
          />
          <NavItem
            icon={<LogOut className="w-4 h-4" />}
            label="Logout"
            onClick={handleLogout}
          />
        </nav>
      </div>

      {/* Bottom illustration */}
      <div className="p-4 border-t border-purple-100/50">
        <img
          src={sidebarIllustration}
          alt="Team"
          className="w-full h-auto opacity-80 mix-blend-multiply"
        />
      </div>
    </aside>
  );
};

export default SalesSidebar;
