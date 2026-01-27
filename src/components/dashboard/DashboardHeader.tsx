import React from 'react';
import { Search, Bell, Moon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import megaplexLogo from '@/assets/megaplex-logo.png';

const DashboardHeader: React.FC = () => {
  return (
    <header className="h-16 bg-[#351C43] flex items-center justify-between px-6 shrink-0 border-b border-white/10 relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={megaplexLogo} alt="Megaplex Prime" className="h-10 object-contain" />
      </div>

      {/* Search */}
      <div className="flex-1 flex justify-center mx-8">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A1D59]" />
          <Input
            type="text"
            placeholder="Search by Lead Name, Project, Team"
            className="w-full pl-12 h-10 bg-[#E2E8F0] border-none text-[#4A1D59] placeholder:text-[#4A1D59]/60 rounded-full focus-visible:ring-0"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="bg-[#F3E8FF] hover:bg-white text-[#4A1D59] rounded-lg w-10 h-10">
          <Moon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="bg-[#F3E8FF] hover:bg-white text-[#4A1D59] rounded-lg w-10 h-10 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        <Avatar className="h-10 w-10 border-2 border-white/20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-megaplex-gold text-megaplex-purple-dark font-semibold text-sm">
            SA
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
