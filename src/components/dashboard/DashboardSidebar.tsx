import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Tablet, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Tablet, label: 'iPad View', path: '/ipad-view' },
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
    <aside className="w-[180px] bg-megaplex-purple-light min-h-[calc(100vh-64px)] flex flex-col py-4">
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
              className={`w-full flex items-center gap-3 py-2.5 px-4 transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground rounded-lg mx-2 w-[calc(100%-16px)]'
                  : 'text-foreground hover:bg-sidebar-accent'
              }`}
            >
              <item.icon className="w-4 h-4" />
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
              className={`w-full flex items-center gap-3 py-2.5 px-4 transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground rounded-lg mx-2 w-[calc(100%-16px)]'
                  : 'text-foreground hover:bg-sidebar-accent'
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
          className="w-full flex items-center gap-3 py-2.5 px-4 text-red-500 hover:bg-red-50 transition-colors mt-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
