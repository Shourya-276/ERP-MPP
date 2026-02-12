import React from 'react';
import { Target, TrendingUp, Users, Award } from 'lucide-react';
import megaplexLogo from '@/assets/megaplex-logo.png';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const features = [
  { icon: Target, title: 'Leads', description: 'Track & convert' },
  { icon: TrendingUp, title: 'Sales', description: 'Monitor growth' },
  { icon: Users, title: 'Teams', description: 'Collaborate better' },
  { icon: Award, title: 'Performance', description: 'Measure success' },
];

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 auth-gradient flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/5 blur-xl" />
        <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-white/5 blur-2xl" />

        {/* Logo */}
        <div className="mb-8 animate-fade-in invisible">
          {/* <img src={megaplexLogo} alt="Megaplex Prime" className="h-24 object-contain" /> */}
        </div>

        {/* Tagline */}
        <h2 className="text-3xl font-bold mb-4 text-center animate-fade-in">
          Great work starts here ✨
        </h2>
        <p className="text-white/80 text-center mb-12 max-w-sm animate-fade-in">
          Login to manage projects, teams, and performance with our comprehensive Real Estate ERP platform.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm animate-fade-in">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card rounded-xl p-4 transition-all hover:bg-white/12"
            >
              <div className="flex items-center gap-3 mb-2">
                <feature.icon className="w-5 h-5 text-megaplex-gold-light" />
                <span className="font-semibold">{feature.title}</span>
              </div>
              <p className="text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-12 flex items-center gap-4 animate-fade-in">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white/20" />
            <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white/20" />
            <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white/20" />
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white/20 flex items-center justify-center text-xs font-bold text-yellow-800">
              +
            </div>
          </div>
          <div>
            <p className="font-semibold">Used by 50+ sales teams</p>
            <p className="text-sm text-white/70">Trusted by real estate professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
