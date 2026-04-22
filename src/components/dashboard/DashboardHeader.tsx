import React from 'react';
import { Search, Bell, Moon, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { ReceptionistSidebarContent } from './receptionist/ReceptionistSidebar';
import megaplexLogo from '@/assets/megaplex-logo.png';

const DashboardHeader: React.FC = () => {
  return (
    <header className="h-16 bg-[#351C43] flex items-center justify-between px-4 sm:px-6 shrink-0 border-b border-white/10 relative z-50">
      {/* Mobile Menu & Logo */}
      <div className="flex items-center gap-3">
        <div className="min-[481px]:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 -ml-2">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 border-r-0">
              <SheetHeader className="p-6 bg-[#351C43] text-left">
                <SheetTitle className="text-white gold-text text-xl">Megaplex Prime</SheetTitle>
              </SheetHeader>
              <div className="pt-4 h-[calc(100vh-80px)]">
                <ReceptionistSidebarContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* <img src={megaplexLogo} alt="Megaplex Prime" className="h-8 md:h-10 object-contain" /> */}
      </div>
      
      {/* Search - Hidden on mobile */}
      <div className="flex-1 hidden min-[481px]:flex justify-center mx-8">
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
      <div className="flex items-center gap-2 md:gap-3">
        <Button variant="ghost" size="icon" className="bg-[#F3E8FF] hover:bg-white text-[#4A1D59] rounded-lg w-9 h-9 md:w-10 md:h-10">
          <Moon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="bg-[#F3E8FF] hover:bg-white text-[#4A1D59] rounded-lg w-9 h-9 md:w-10 md:h-10 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        <Avatar className="h-9 w-9 md:h-10 md:w-10 border-2 border-white/20">
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
