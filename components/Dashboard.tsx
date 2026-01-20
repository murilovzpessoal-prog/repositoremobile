import React from 'react';
import { 
  ArrowRight, 
  Database, 
  Activity, 
  Globe, 
  PenTool, 
  Search, 
  FileText, 
  LayoutTemplate,
  Zap,
  Box,
  TrendingUp,
  Clock,
  MoreHorizontal,
  ChevronRight,
  User,
  Layout,
  MousePointer2
} from 'lucide-react';
import { ToolCardData } from '../types';
import { UserActivity } from '../App';

interface DashboardProps {
  projectsCount?: number;
  activities?: UserActivity[];
  onTabChange?: (id: string) => void;
}

const TOOLS: ToolCardData[] = [
  {
    title: 'Prospector',
    subtitle: 'Busca Inteligente',
    icon: <Search size={22} />,
    iconBg: 'bg-blue-500/10 text-blue-400'
  },
  {
    title: 'Copywriter AI',
    subtitle: 'Sempre Coerente',
    icon: <PenTool size={22} />,
    iconBg: 'bg-purple-500/10 text-purple-400'
  },
  {
    title: 'Contratos',
    subtitle: 'Jurídico Automático',
    icon: <FileText size={22} />,
    iconBg: 'bg-cyan-500/10 text-cyan-400'
  },
  {
    title: 'Landing Pages',
    subtitle: 'Conversão em Hub',
    icon: <LayoutTemplate size={22} />,
    iconBg: 'bg-indigo-500/10 text-indigo-400'
  }
];

const Dashboard: React.FC<DashboardProps> = ({ projectsCount = 0, activities = [], onTabChange }) => {
  const getActivityIcon = (type: UserActivity['type']) => {
    switch (type) {
      case 'project': return <Layout size={12} className="text-blue-400" />;
      case 'lead': return <MousePointer2 size={12} className="text-purple-400" />;
      case 'contract': return <FileText size={12} className="text-cyan-400" />;
      case 'profile': return <User size={12} className="text-emerald-400" />;
      default: return <Zap size={12} className="text-gray-400" />;
    }
  };

  const handleToolClick = (title: string) => {
    if (!onTabChange) return;
    switch (title) {
      case 'Prospector': onTabChange('prospector'); break;
      case 'Copywriter AI': onTabChange('copywriter'); break;
      case 'Contratos': onTabChange('contracts'); break;
      case 'Landing Pages': onTabChange('lp'); break;
    }
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700">
      
      {/* Top Row: Hero + Active Projects */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        
        {/* Main Featured Card - Materializar Saas */}
        <div className="col-span-12 lg:col-span-8 relative group overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#0F0F12] border border-white/5 p-6 md:p-10 flex flex-col justify-between min-h-[360px] md:min-h-[440px] shadow-2xl transition-all duration-500 hover:border-purple-500/30">
          
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(124,58,237,0.1),transparent_50%)]" />
          <div className="absolute -bottom-20 -right-20 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />
          
          <div className="relative z-10 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Zap size={10} className="text-yellow-400" />
              <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">IA Architect 4.0</span>
            </div>
            
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none italic pr-4">
                Materializar <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 pr-2">Saas</span>
              </h3>
              <p className="text-sm md:text-lg text-[#94A3B8] max-w-lg leading-relaxed font-medium">
                Transforme sua ideia em um prompt de desenvolvimento pronto para ser implementado por uma IA.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mt-6 md:mt-auto gap-6">
            <button 
              onClick={() => onTabChange?.('materializar_sas')}
              className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-black px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-xl"
            >
              <span>Iniciar Projeto</span>
              <ArrowRight size={18} />
            </button>
            
            <div className="flex -space-x-3 self-center md:self-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#0F0F12] bg-[#1A1A20] flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#0F0F12] bg-[#1A1A20] flex items-center justify-center text-[9px] font-bold text-gray-500">
                +12
              </div>
            </div>
          </div>
        </div>

        {/* Database Stats Card */}
        <div className="col-span-12 lg:col-span-4 rounded-[24px] md:rounded-[32px] bg-[#0F0F12] border border-white/5 p-6 md:p-10 flex flex-col relative overflow-hidden shadow-2xl group transition-all duration-500 hover:border-blue-500/30 min-h-[300px]">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-all duration-700" />
          
          <div className="flex items-center justify-between mb-6 md:mb-10 relative z-10">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/5 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5">
              <Database size={20} md:size={24} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col items-end">
               <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 mb-1">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[7px] md:text-[8px] font-black text-emerald-500 uppercase tracking-widest leading-none">Live Sync</span>
               </div>
            </div>
          </div>
          
          <div className="space-y-1 relative z-10">
            <div className="relative">
              <h4 className="text-6xl md:text-[96px] font-black text-white leading-none tracking-tighter italic">{projectsCount}</h4>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[9px] font-bold">
                <TrendingUp size={10} />
                <span>+0%</span>
              </div>
              <p className="text-[#94A3B8] text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em]">Projetos Ativos</p>
            </div>
          </div>

          <div className="mt-auto space-y-3 md:space-y-5 pt-6 md:pt-8 border-t border-white/5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] md:text-xs font-bold text-white tracking-tight">Cloud Storage</span>
              <span className="text-lg md:text-xl font-black text-blue-500">0<span className="text-xs ml-0.5">%</span></span>
            </div>
            <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Tools & Recent Activity */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 pb-12">
        
        {/* Growth Engine Grid */}
        <div className="col-span-12 lg:col-span-8 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-purple-500" />
              <h4 className="text-[9px] md:text-[11px] font-black tracking-[0.25em] text-gray-500 uppercase">Growth Engine</h4>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {TOOLS.map((tool, idx) => (
              <div 
                key={idx}
                onClick={() => handleToolClick(tool.title)}
                className="group bg-[#0F0F12] border border-white/5 p-4 md:p-6 rounded-xl md:rounded-[24px] hover:bg-[#16161D] hover:border-white/10 transition-all duration-300 cursor-pointer shadow-lg"
              >
                <div className="flex items-center gap-4 md:gap-5">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner ${tool.iconBg}`}>
                    {React.cloneElement(tool.icon as React.ReactElement, { size: 20 })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-white font-bold text-base md:text-lg leading-tight tracking-tight">{tool.title}</h5>
                    <p className="text-xs md:text-sm text-[#94A3B8] font-medium truncate">{tool.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-600 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrated Recent Activity */}
        <div className="col-span-12 lg:col-span-4 flex flex-col">
          <div className="bg-[#0F0F12] border border-white/5 rounded-[24px] md:rounded-[32px] p-6 shadow-2xl flex flex-col h-full min-h-[300px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Activity size={16} className="text-emerald-500" />
                <h4 className="text-[9px] md:text-[10px] font-black tracking-[0.25em] text-gray-500 uppercase">Atividade</h4>
              </div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            
            <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar max-h-[400px]">
              {activities.length === 0 ? (
                <div className="flex items-center justify-center h-full text-[9px] font-bold text-gray-700 uppercase tracking-widest italic">
                  Nenhuma atividade
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map((act) => (
                    <div key={act.id} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-3 group/item hover:bg-white/[0.04] transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center shrink-0">
                         {getActivityIcon(act.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] md:text-[11px] font-bold text-white tracking-tight truncate uppercase italic">{act.label}</p>
                        <p className="text-[8px] md:text-[9px] text-gray-500 font-medium truncate">{act.description}</p>
                      </div>
                      <span className="text-[7px] md:text-[8px] font-black text-gray-700 uppercase tracking-widest shrink-0">{act.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="mt-6 pt-5 border-t border-white/5 flex items-center justify-center gap-2 text-[9px] md:text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] transition-colors group">
              Ver Logs
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;