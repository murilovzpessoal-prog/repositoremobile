import React, { useState, useEffect } from 'react';
import {
  Zap,
  Calendar,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  Award,
  Rocket,
  Trophy,
  Target,
  Sparkles,
  Command,
  Download,
  Info,
  Clock,
  X,
  ExternalLink
} from 'lucide-react';
import { ChallengeDayProgress } from '../App';

interface Challenge8DProps {
  completedDays: ChallengeDayProgress[];
  onUpdateProgress: (days: ChallengeDayProgress[]) => void;
}

interface DayDetails {
  id: number;
  title: string;
  description: string;
  task: string;
  icon: React.ReactNode;
}

const CHALLENGE_DAYS: DayDetails[] = [
  { id: 1, title: 'Crie seu primeiro aplicativo', description: 'Use um modelo pronto.', task: 'Crie seu primeiro aplicativo usando um modelo pronto.', icon: <Rocket size={20} /> },
  { id: 2, title: 'Crie um contrato', description: 'Crie um contrato básico.', task: 'Use a aba de contratos para criar um contrato básico.', icon: <Target size={20} /> },
  { id: 3, title: 'Mensagem de vendas', description: 'IA Copywriter ativa.', task: 'Gere uma mensagem de vendas estratégica.', icon: <Sparkles size={20} /> },
  { id: 4, title: 'App do zero', description: 'Wizard completo.', task: 'Crie um aplicativo sem usar modelos prontos.', icon: <Zap size={20} /> },
  { id: 5, title: 'Salve um lead', description: 'CRM ativo.', task: 'Salve um contato como lead no sistema.', icon: <Command size={20} /> },
  { id: 6, title: 'Avançar negociação', description: 'Funil dinâmico.', task: 'Mova um lead entre as etapas do funil.', icon: <ShieldCheck size={20} /> },
  { id: 7, title: 'Ativar contrato', description: 'Aprovação final.', task: 'Marque um contrato como aprovado.', icon: <Trophy size={20} /> },
  { id: 8, title: 'Certificado', description: 'Fim do protocolo.', task: 'Finalize o desafio e desbloqueie o certificado.', icon: <Award size={20} /> },
];

const Challenge8D: React.FC<Challenge8DProps> = ({ completedDays, onUpdateProgress }) => {
  const [view, setView] = useState<'intro' | 'dashboard'>('intro');
  const [selectedDay, setSelectedDay] = useState<DayDetails | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  const totalDays = CHALLENGE_DAYS.length;
  const progressPercent = Math.round((completedDays.length / totalDays) * 100);

  const getDayStatus = (dayId: number) => {
    const completed = completedDays.some(p => p.day === dayId);
    if (completed) return { isLocked: false, isCompleted: true, isNext: false };
    if (dayId === 1) return { isLocked: false, isCompleted: false, isNext: true };
    const prevDay = completedDays.find(p => p.day === dayId - 1);
    if (!prevDay) return { isLocked: true, isCompleted: false, isNext: false };
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    const timeDiff = currentTime - prevDay.completedAt;
    if (timeDiff < TWENTY_FOUR_HOURS) return { isLocked: true, isCompleted: false, isNext: false };
    return { isLocked: false, isCompleted: false, isNext: true };
  };

  const handleCompleteDay = (dayId: number) => {
    if (completedDays.some(p => p.day === dayId)) return;
    const newProgress = [...completedDays, { day: dayId, completedAt: Date.now() }];
    onUpdateProgress(newProgress);
    setSelectedDay(null);
  };

  if (view === 'intro') {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#050507] p-4 text-center animate-in fade-in duration-1000 overflow-hidden relative min-h-[500px]">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full" />

        <div className="max-w-2xl w-full space-y-12 relative z-10 flex flex-col items-center">
          <div className="space-y-6 flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <Zap size={12} className="text-purple-500" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Protocolo Elite 8 Dias</span>
            </div>

            <div className="space-y-4 text-center">
              <h1 className="text-[40px] md:text-[84px] font-black text-white tracking-tighter italic uppercase leading-[0.9]">
                DESAFIO <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white">8D SAAS.</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-xl font-medium max-w-sm mx-auto opacity-70 leading-relaxed">
                Transforme sua visão em execução real através do protocolo de materialização.
              </p>
            </div>
          </div>

          <button
            onClick={() => setView('dashboard')}
            className="w-full max-w-[280px] py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.4em] italic shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all duration-500 flex items-center justify-center gap-4 group"
          >
            <span>Iniciar Protocolo</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto w-full space-y-6 md:space-y-12 pb-32 px-4 md:px-0 animate-in fade-in relative">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <button onClick={() => setView('intro')} className="flex items-center gap-2 text-gray-600 hover:text-white transition-all text-[8px] font-black uppercase tracking-[0.2em] italic"><ChevronLeft size={12} /> VOLTAR</button>
          <h2 className="text-2xl md:text-6xl font-black text-white tracking-tighter italic uppercase">Desafio <span className="text-purple-500">8D</span></h2>
        </div>
        <div className="bg-[#0F0F12] border border-white/5 p-5 rounded-[24px] shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[8px] font-black text-white uppercase tracking-widest italic">{completedDays.length}/8 OK</span>
            <span className="text-lg font-black text-white italic">{progressPercent}%</span>
          </div>
          <div className="h-1 w-40 bg-white/5 rounded-full overflow-hidden text-left"><div className="h-full bg-purple-600 transition-all duration-1000" style={{ width: `${progressPercent}%` }} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CHALLENGE_DAYS.map((day) => {
          const { isLocked, isCompleted, isNext } = getDayStatus(day.id);
          return (
            <div
              key={day.id}
              onClick={() => !isLocked && setSelectedDay(day)}
              className={`group h-[220px] rounded-[32px] border transition-all duration-700 p-6 flex flex-col cursor-pointer ${isCompleted ? 'bg-emerald-500/[0.02] border-emerald-500/20' : isNext ? 'bg-purple-600/[0.03] border-purple-500/40 hover:border-purple-500/60' : 'bg-white/[0.01] border-white/5 opacity-40 grayscale cursor-not-allowed'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isCompleted ? 'text-emerald-500' : 'text-purple-400'}`}>DIA_0{day.id}</span>
                  <h3 className="text-base font-black text-white italic uppercase leading-none mt-1">{day.title}</h3>
                </div>
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-500">{isLocked ? <Lock size={14} /> : isCompleted ? <CheckCircle2 size={18} className="text-emerald-500" /> : day.icon}</div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium italic line-clamp-3">{day.description}</p>
              <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[7px] font-black uppercase tracking-widest">{isCompleted ? 'SYNC_OK' : isNext ? 'ANDAMENTO' : 'BLOQUEADO'}</span>
                {!isLocked && <ArrowRight size={12} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Details View */}
      {selectedDay && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-[#0A0A0C] border border-white/10 w-full max-w-2xl rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.15)] relative">
            <button
              onClick={() => setSelectedDay(null)}
              className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-14 space-y-10 text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mx-auto mb-6">
                  {selectedDay.icon}
                </div>
                <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] italic leading-none">DIA_0{selectedDay.id}_Missão</span>
                <h3 className="text-2xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">{selectedDay.title}</h3>
                <p className="text-gray-500 text-sm md:text-lg italic opacity-80 max-w-md mx-auto">{selectedDay.task}</p>
              </div>

              {completedDays.some(p => p.day === selectedDay.id) ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3 text-emerald-500 font-black italic uppercase tracking-widest text-xs py-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <CheckCircle2 size={18} />
                    Missão_Sincronizada
                  </div>
                  {selectedDay.id === 8 && (
                    <a
                      href="https://www.contate.me/certificadonex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.4em] italic shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 animate-pulse"
                    >
                      SOLICITAR_CERTIFICADO <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              ) : selectedDay.id === 8 ? (
                <button
                  onClick={() => {
                    handleCompleteDay(selectedDay.id);
                    window.open('https://www.contate.me/certificadonex', '_blank');
                  }}
                  className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.4em] italic shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  CONCLUIR PROTOCOLO & SOLICITAR <ExternalLink size={14} />
                </button>
              ) : (
                <button
                  onClick={() => handleCompleteDay(selectedDay.id)}
                  className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.4em] italic shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  CONCLUIR_MISSÃO_SYNC
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenge8D;