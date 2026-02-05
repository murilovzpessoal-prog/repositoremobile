import React from 'react';
import { User as UserIcon, Zap, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeTab: string;
  setActiveTab: (id: string) => void;
  onLogout: () => void;
  onHoverItem?: (id: string) => void;
  userName?: string;
  userRole?: string;
  userPhoto?: string;
  academyProgress?: number;
}

const NexbuildLogo = () => (
  <div className="relative flex flex-col items-start gap-3 group">
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out">
        <rect x="2" y="2" width="36" height="36" rx="10" stroke="url(#logo_grad_border)" strokeWidth="0.2" className="opacity-20" />
        <path d="M11 29V11L29 29V11" stroke="url(#logo_grad_main)" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
        <path d="M29 11L11 29" stroke="white" strokeWidth="0.2" strokeOpacity="0.1" />
        <defs>
          <linearGradient id="logo_grad_main" x1="11" y1="11" x2="29" y2="29" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="0.6" stopColor="#A855F7" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="logo_grad_border" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="#A855F7" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-purple-600/5 blur-[20px] rounded-full opacity-50" />
    </div>
    <div className="flex flex-col space-y-1 opacity-40 group-hover:opacity-100 transition-opacity duration-700 ml-1">
      <span className="text-[10px] font-black text-white tracking-[0.5em] uppercase font-mono leading-none">GENESIS</span>
      <span className="text-[7px] font-bold text-gray-500 tracking-[0.3em] uppercase font-mono leading-none">ELITE PROTOCOL</span>
    </div>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  activeTab,
  setActiveTab,
  onLogout,
  onHoverItem,
  userName = "Usuário",
  userRole = "Membro",
  userPhoto = "",
  academyProgress = 0
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral' },
    { id: 'materializar_sas', label: 'Materializar SAS' },
    { id: 'projects', label: 'Meus Projetos' },
    { id: 'lp', label: 'Landing Page' },
    { id: 'prospector', label: 'Prospector' },
    { id: 'copywriter', label: 'Copywriter IA' },
    { id: 'contracts', label: 'Contratos' },
    { id: 'academy', label: 'Academy' },
    { id: 'challenge8d', label: 'Desafio 8D SaaS' },
    { id: 'team', label: 'Equipe' },
    { id: 'help', label: 'Ajuda' },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-[100] w-72 bg-[#020203] flex flex-col transition-all duration-500 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-[40px_0_100px_rgba(0,0,0,0.5)]`}>
      <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#A855F7]/10 to-transparent z-20" />

      {/* Mobile close button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-6 right-6 p-2 text-gray-600 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>

      <div className="pt-16 pb-12 px-12 relative">
        <div className="cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <NexbuildLogo />
        </div>
        <div className="mt-8 relative flex items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] relative z-10" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500 via-purple-500/20 to-transparent opacity-40 ml-[-2px]" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-12 py-4 space-y-1 no-scrollbar relative z-10 scroll-smooth">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              onMouseEnter={() => onHoverItem?.(item.id)}
              className={`w-full flex items-center py-3.5 transition-all duration-300 group relative ${isActive ? 'text-white' : 'text-gray-600 hover:text-white/70'
                }`}
            >
              <span className={`text-[13px] tracking-tight transition-all duration-300 antialiased ${isActive ? "font-black" : "font-medium"
                }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -left-12 w-[2px] h-4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Persistence Visibility: Progress Hub */}
      <div className="px-12 py-6 border-t border-white/[0.02] bg-white/[0.01]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={10} className="text-purple-500" />
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Protocolo Academy</span>
          </div>
          <span className="text-[10px] font-black text-white italic">{academyProgress}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-purple-600 transition-all duration-1000" style={{ width: `${academyProgress}%` }} />
        </div>
      </div>

      <div className="p-12 mt-auto border-t border-white/[0.02]">
        <div className="space-y-8">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveTab('settings')}>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-purple-500/40 transition-colors">
              {userPhoto ? (
                <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={18} className="text-gray-700" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[12px] font-black text-white uppercase tracking-tight antialiased truncate max-w-[100px]">{userName || "Usuário"}</span>
                <span className="text-[8px] font-black text-white/20 border border-white/10 px-1.5 py-0.5 rounded tracking-widest uppercase shrink-0">Pro</span>
              </div>
              <span className="text-[10px] text-gray-700 font-bold tracking-tight uppercase antialiased opacity-60 truncate">{userRole || "Acesso Master"}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/[0.03]">
            <button
              onClick={() => setActiveTab('settings')}
              className={`text-left text-[9px] font-black uppercase tracking-[0.3em] transition-all italic antialiased ${activeTab === 'settings' ? 'text-white' : 'text-gray-700 hover:text-white/60'
                }`}
            >
              Configurações
            </button>
            <button
              onClick={onLogout}
              className="text-left text-[9px] font-black text-red-950/30 hover:text-red-600/60 uppercase tracking-[0.3em] transition-all italic antialiased"
            >
              Sair da Conta
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;