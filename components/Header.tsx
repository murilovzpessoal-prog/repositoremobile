import React, { useMemo } from 'react';
import { ShieldCheck, Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  userName: string;
  onOpenMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onOpenMenu }) => {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Bom dia";
    if (hour >= 12 && hour < 18) return "Boa tarde";
    return "Boa noite";
  }, []);

  const displayName = userName.trim() === "" ? "Usuário" : userName.split(' ')[0];

  return (
    <header className="px-6 pt-12 pb-6 md:px-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="flex items-center justify-between lg:block">
        <div className="space-y-1">
          <h2 className="text-[32px] md:text-[42px] font-black text-white tracking-tighter leading-none italic">
            {greeting}, {displayName}.
          </h2>
          <p className="text-[#94A3B8] text-base md:text-lg font-medium tracking-tight">
            IA em <span className="text-emerald-500">alta performance</span>.
          </p>
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          onClick={onOpenMenu}
          className="lg:hidden p-3 bg-[#0F0F12] border border-white/5 rounded-xl text-white shadow-xl"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Global Search Bar - Hidden on small mobile */}
        <div className="relative group hidden sm:block">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-500 transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar projetos ou ferramentas..."
            className="bg-[#0F0F12] border border-white/5 rounded-2xl py-3.5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all w-full lg:w-[320px] font-medium"
          />
        </div>

        {/* Notifications */}
        <button className="w-12 h-12 rounded-2xl bg-[#0F0F12] border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/10 transition-all relative">
          <Bell size={20} />
          <div className="absolute top-3 right-3 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#0F0F12]" />
        </button>

        {/* System Status - Compact on mobile */}
        <div className="flex items-center gap-3 bg-[#0F0F12] border border-white/5 px-4 md:px-6 py-3 rounded-2xl shadow-xl">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Status</span>
            <span className="text-[11px] font-bold text-white uppercase tracking-tight">Sistema Online</span>
          </div>
          <ShieldCheck size={18} className="text-emerald-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;