import React from 'react';
import { Search, Bell, Moon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import megaplexLogo from '@/assets/megaplex-logo.png';

const DashboardHeader: React.FC = () => {
  return (
    <header className="h-16 bg-megaplex-purple-dark flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={megaplexLogo} alt="Megaplex Prime" className="h-10 object-contain" />
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <Input
            type="text"
            placeholder="Search by Lead Name, Project, Team"
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
          <Moon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
            5
          </span>
        </Button>
        <Avatar className="h-9 w-9 border-2 border-white/20">
          <AvatarImage src="" />
          <AvatarFallback className="bg-megaplex-gold text-megaplex-purple-dark font-semibold text-sm">
            SA
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
