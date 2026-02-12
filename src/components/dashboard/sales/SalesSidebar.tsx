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
    <span className="flex-1 text-left">{label}</span>
    {hasSubmenu && <ChevronDown className="w-4 h-4" />}
  </button>
);

const SalesSidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside
      className="h-[calc(100vh-64px)] flex flex-col"
      style={{
        width: '180px',
        background: '#FBF2FF',
      }}
    >
      <div className="p-3 flex-1 overflow-y-auto">
        <p className="text-xs text-muted-foreground px-3 mb-2">Main Menu</p>

        <nav className="space-y-1">
          <NavItem
            icon={<LayoutDashboard className="w-4 h-4" />}
            label="Dashboard"
            isActive
          />

          <div className="pl-3 space-y-1 text-xs">
            <button className="w-full text-left py-1.5 text-muted-foreground hover:text-foreground">
              — Sales Dashboard
            </button>
            <button className="w-full text-left py-1.5 text-muted-foreground hover:text-foreground">
              Leads
            </button>
            <button className="w-full text-left py-1.5 text-muted-foreground hover:text-foreground">
              Site Visit
            </button>
            <button className="w-full text-left py-1.5 text-muted-foreground hover:text-foreground">
              Revisit
            </button>
            <button className="w-full text-left py-1.5 text-muted-foreground hover:text-foreground">
              Sales Report
            </button>
            <button className="w-full text-left py-1.5 text-muted-foreground hover:text-foreground">
              Payment
            </button>
            <button className="w-full text-left py-1.5 text-muted-foreground hover:text-foreground">
              Cancellation
            </button>
            <button className="w-full text-left py-1.5 text-muted-foreground hover:text-foreground">
              Registration
            </button>
            <button className="w-full text-left py-1.5 text-muted-foreground hover:text-foreground">
              Incentive
            </button>
          </div>

          <NavItem
            icon={<FolderOpen className="w-4 h-4" />}
            label="Projects"
          />

          <p className="text-xs text-muted-foreground px-3 mt-4 mb-2">Others</p>

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
      <div className="p-3">
        <img
          src={sidebarIllustration}
          alt="Team"
          className="w-full h-auto opacity-80"
        />
      </div>
    </aside>
  );
};

export default SalesSidebar;
