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
    <aside className="w-[120px] bg-megaplex-purple-light min-h-[calc(100vh-64px)] flex flex-col py-6">
      {/* Main Menu */}
      <div className="px-4 mb-6">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
              className={`w-full flex flex-col items-center gap-2 py-3 px-2 transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-sidebar-accent'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Others section */}
        <div className="px-4 mt-8 mb-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Others
          </span>
        </div>

        {otherItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex flex-col items-center gap-2 py-3 px-2 transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-sidebar-accent'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex flex-col items-center gap-2 py-3 px-2 text-red-500 hover:bg-red-50 transition-colors mt-2"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
