import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Tablet, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Tablet, label: 'Reception Desk', path: '/receptionist' },
];

const otherItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const DashboardSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-[205px] bg-megaplex-purple-light min-h-[calc(100vh-64px)] flex flex-col py-4">
      {/* Main Menu */}
      <div className="px-4 mb-3">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          Main Menu
        </span>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 py-3 px-6 transition-all mx-auto mb-1 ${isActive
                ? 'bg-[#E6D5F0] text-[#4A1D59] font-bold rounded-[30px] w-[189px]'
                : 'text-foreground hover:bg-black/5 rounded-[30px] w-[189px]'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Others section */}
        <div className="px-4 mt-6 mb-3">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Others
          </span>
        </div>

        {otherItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 py-3 px-6 transition-all mx-auto mb-1 ${isActive
                ? 'bg-[#E6D5F0] text-[#4A1D59] font-bold rounded-[30px] w-[189px]'
                : 'text-foreground hover:bg-black/5 rounded-[30px] w-[189px]'
                }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-[189px] flex items-center gap-3 py-3 px-6 text-red-500 hover:bg-black/5 transition-colors mx-auto mb-1 rounded-[30px]"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
