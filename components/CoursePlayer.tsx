import React, { useState } from 'react';
import {
  Play,
  ChevronLeft as ChevronLeftIcon,
  LayoutGrid,
  Clock,
  PlayCircle,
  Settings,
  Code,
  Layers,
  TrendingUp,
  Sparkles,
  Command,
  Zap
} from 'lucide-react';
import ModuleLessons from './ModuleLessons';

interface ModuleCard {
  id: number;
  title: string;
  duration: string;
  lessonsCount: number;
  image: string;
  description: string;
  icon: React.ReactNode;
  active?: boolean;
}

const MODULES: ModuleCard[] = [
  {
    id: 1,
    title: 'FUNDAMENTOS E ECOSSISTEMA',
    description: 'A base soberana para construir softwares de alta performance.',
    duration: '45 min',
    lessonsCount: 8,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    icon: <Settings size={24} strokeWidth={1.5} />,
    active: true
  },
  {
    id: 2,
    title: 'ENGENHARIA DE SOFTWARE',
    description: 'Protocolos de desenvolvimento moderno com IA integrada.',
    duration: '1h 20 min',
    lessonsCount: 12,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    icon: <Code size={24} strokeWidth={1.5} />
  },
  {
    id: 3,
    title: 'PORTFÓLIO E MODELOS PRONTOS',
    description: 'Acelere sua entrega com estruturas validadas.',
    duration: '2h 10 min',
    lessonsCount: 3,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    icon: <Layers size={24} strokeWidth={1.5} />
  },
  {
    id: 4,
    title: 'PROSPECÇÃO, VENDAS E ESCALA',
    description: 'Transforme código em faturamento exponencial.',
    duration: '3h',
    lessonsCount: 3,
    image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop',
    icon: <TrendingUp size={24} strokeWidth={1.5} />
  }
];

interface CoursePlayerProps {
  onBack: () => void;
  progress: number;
  onUpdateProgress: (val: number) => void;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({ onBack, progress, onUpdateProgress }) => {
  const [selectedModule, setSelectedModule] = useState<ModuleCard | null>(null);

  if (selectedModule) {
    return (
      <ModuleLessons
        moduleTitle={selectedModule.title}
        moduleDescription={selectedModule.description}
        moduleNumber={selectedModule.id}
        onBack={() => setSelectedModule(null)}
        globalProgress={progress}
        onUpdateProgress={onUpdateProgress}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col font-['Inter'] selection:bg-[#7C3AED]/30 pb-32">
      <div className="px-4 md:px-10 py-6 md:py-10 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group px-4 py-2 bg-white/[0.04] rounded-xl border border-white/10 shadow-2xl"
          >
            <ChevronLeftIcon size={14} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Voltar</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-3">
              <Command size={12} className="text-purple-500" />
              <span className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em] italic">Membros_Elite</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-4 md:px-10 mb-8 md:mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="relative rounded-2xl md:rounded-[56px] overflow-hidden bg-[#0A0A0C] border border-white/20 min-h-[300px] md:min-h-[560px] shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] group">
          <img
            src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover opacity-45 grayscale-[0.2] group-hover:grayscale-0"
            alt="Academy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/40 to-transparent" />

          <div className="relative p-6 md:p-20 h-full flex flex-col justify-center space-y-4 md:space-y-10 max-w-5xl z-10">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg backdrop-blur-md">
                <Sparkles size={10} className="text-purple-300 animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-black text-purple-300 uppercase tracking-[0.3em] italic">ACADEMY_ENG_IA</span>
              </div>
            </div>

            <div className="space-y-2 md:space-y-6">
              <h1 className="text-3xl md:text-[86px] font-black leading-[0.9] tracking-tighter text-white italic uppercase">
                NEXBUILD <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-100 to-white pr-4">ACADEMY</span>
              </h1>
              <p className="text-gray-300 text-[11px] md:text-2xl font-medium leading-relaxed max-w-3xl italic opacity-90">
                Onde a engenharia de software encontra o futuro da IA.
              </p>
            </div>

            <button
              onClick={() => setSelectedModule(MODULES[0])}
              className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] italic shadow-2xl transition-all w-fit hover:scale-105 active:scale-95"
            >
              <Play size={14} fill="black" />
              CONTINUAR_ACESSO
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 space-y-6 md:space-y-12">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center text-purple-300 border border-purple-500/30">
            <LayoutGrid size={16} />
          </div>
          <h3 className="text-xl md:text-4xl font-black text-white tracking-tighter italic uppercase font-['Montserrat']">Módulos_Elite</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
          {MODULES.map((module) => (
            <div
              key={module.id}
              onClick={() => setSelectedModule(module)}
              className={`group relative aspect-square rounded-2xl md:rounded-[42px] overflow-hidden border transition-all duration-700 cursor-pointer shadow-2xl ${module.active
                ? 'border-purple-500/80 ring-1 ring-white/10'
                : 'border-white/10 hover:border-purple-500/40'
                }`}
            >
              <div className="absolute inset-0 overflow-hidden bg-black">
                <img
                  src={module.image}
                  className="w-full h-full object-cover grayscale-[0.3] brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-700"
                  alt={module.title}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/20" />

              <div className="absolute top-4 right-4 z-30">
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg flex items-center justify-center border ${module.active ? 'bg-purple-600 border-white/20 text-white' : 'bg-white/10 border-white/10 text-purple-300'
                  }`}>
                  {React.cloneElement(module.icon as React.ReactElement, { size: 16 })}
                </div>
              </div>

              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
                <h4 className="text-[11px] md:text-[14px] font-bold text-white tracking-widest leading-tight uppercase italic w-full drop-shadow-lg">
                  {module.title}
                </h4>
              </div>

              <div className="absolute inset-x-4 bottom-4 z-20">
                <div className="w-full flex items-center bg-black/60 backdrop-blur-3xl border border-white/10 px-3 py-2 rounded-xl">
                  <div className="flex-1 flex items-center gap-2 text-gray-400">
                    <Clock size={10} className="text-purple-300" />
                    <span className="text-[8px] font-black">{module.duration}</span>
                  </div>
                  <div className="w-px h-3 bg-white/20 mx-1" />
                  <div className="flex-1 flex items-center gap-2 text-gray-400 justify-end">
                    <PlayCircle size={10} className="text-purple-300" />
                    <span className="text-[8px] font-black uppercase">SESSÃO</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;