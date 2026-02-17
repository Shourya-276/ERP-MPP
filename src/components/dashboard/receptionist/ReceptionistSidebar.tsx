import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Tablet, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import megaplexLogo from '@/assets/megaplex-logo.png';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    to: string;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg w-full transition-colors mt-auto"
            >
                {icon}
                <span className="font-medium text-sm">{label}</span>
            </button>
        );
    }

    return (
        <NavLink
            to={to}
            className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-all",
                isActive
                    ? "bg-[#F3E8FF] text-[#4A1D59] font-semibold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
        >
            {icon}
            <span className="font-medium text-sm">{label}</span>
        </NavLink>
    );
};

export const ReceptionistSidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="w-64 bg-white border-r flex flex-col p-4 shrink-0">
            <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 px-4 mb-2 uppercase">Main Menu</p>
                <SidebarItem
                    icon={<LayoutDashboard className="w-5 h-5" />}
                    label="Dashboard"
                    to="/receptionist"
                />
                <SidebarItem
                    icon={<Tablet className="w-5 h-5" />}
                    label="iPad View"
                    to="/receptionist/ipad-view"
                />
            </div>

            <div className="mt-8 space-y-1">
                <p className="text-xs font-semibold text-gray-400 px-4 mb-2 uppercase">Others</p>
                <SidebarItem
                    icon={<Settings className="w-5 h-5" />}
                    label="Settings"
                    to="/receptionist/settings"
                />
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg w-full transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};
