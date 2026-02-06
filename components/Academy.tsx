import React, { useState } from 'react';
import {
  Play,
  Zap,
  Target,
  ShieldCheck,
  Award,
  ExternalLink
} from 'lucide-react';
import CoursePlayer from './CoursePlayer';

interface AcademyProps {
  progress?: number;
  onUpdateProgress: (val: number) => void;
  onOpenChallenge: () => void;
  challengeProgressPercent?: number;
}

const Academy: React.FC<AcademyProps> = ({
  progress = 0,
  onUpdateProgress,
  onOpenChallenge,
  challengeProgressPercent = 0
}) => {
  const [view, setView] = useState<'list' | 'player'>('list');

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const cutDuration = 10;
    if (video.duration && video.currentTime > (video.duration - cutDuration)) {
      video.currentTime = 0;
      video.play();
    }
  };

  if (view === 'player') {
    return (
      <CoursePlayer
        onBack={() => setView('list')}
        progress={progress}
        onUpdateProgress={onUpdateProgress}
      />
    );
  }

  return (
    <div className="space-y-8 md:space-y-16 animate-in fade-in duration-1000 pb-32 max-w-[1600px] mx-auto w-full px-4 md:px-10 relative">
      <div className="flex flex-col items-start space-y-4 pt-10 border-b border-white/5 pb-12">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
          <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)] animate-pulse" />
          <span className="text-[10px] font-black text-purple-300 uppercase tracking-[0.4em] font-mono italic">Nexus_Academy_Elite_v4.2</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none italic uppercase font-['Montserrat'] antialiased">
              NEXBUILD <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400 pr-8">ACADEMY</span>
            </h2>
            <p className="text-slate-500 font-bold text-base md:text-xl italic tracking-tight opacity-70">A nova fronteira da engenharia soberana.</p>
          </div>
          <div className="flex items-center gap-8 pb-2">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest leading-none mb-1">Status_Auth</span>
              <span className="text-[11px] md:text-[13px] font-black text-white uppercase italic tracking-tight">Sincronizado_OK</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION: Nexbuild Academy */}
      <div
        onClick={() => setView('player')}
        className="relative group cursor-pointer h-[320px] md:h-[620px] rounded-[40px] md:rounded-[72px] overflow-hidden bg-[#0A0A0C] border border-white/10 shadow-[0_80px_150px_-40px_rgba(0,0,0,1)] transition-all duration-1000 hover:border-purple-500/40"
      >
        <video autoPlay loop muted playsInline onTimeUpdate={handleVideoTimeUpdate} className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[30000ms] brightness-90">
          <source src="https://videos.pexels.com/video-files/8084623/8084623-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/20 to-transparent" />

        <div className="relative p-8 md:p-24 h-full flex flex-col justify-end items-start z-10 pb-10 md:pb-16">
          <div className="space-y-4 md:space-y-8 max-w-4xl mb-6 md:mb-8">
            <h3 className="text-4xl md:text-[110px] font-black text-white tracking-tighter leading-[0.85] italic uppercase drop-shadow-2xl">
              NEXBUILD <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-100 to-white pr-8">ACADEMY</span>
            </h3>
          </div>

          <button className="flex items-center gap-2.5 bg-white text-black px-6 py-2.5 md:px-8 md:py-3.5 rounded-lg md:rounded-xl font-black text-[9px] md:text-[11px] uppercase tracking-[0.4em] italic shadow-2xl hover:scale-105 active:scale-95 transition-all duration-700">
            <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-black rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
            </div>
            <span>INICIAR_TREINAMENTO</span>
          </button>
        </div>
      </div>

      {/* Grid de Canais e Desafio - UPDATED SPACING AND MIN-HEIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-6">
        {/* Card: Comunidade Global (Discord) */}
        <div className="col-span-12 lg:col-span-4 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[32px] md:rounded-[48px] p-6 md:p-8 flex flex-col relative overflow-hidden group cursor-pointer hover:border-purple-500/40 transition-all duration-500 shadow-2xl min-h-[240px] md:min-h-[280px]">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-600/5 blur-[80px] pointer-events-none" />

          <div className="space-y-4 md:space-y-5 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-5.487 0a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" /></svg>
              </div>
              <div className="text-right">
                <span className="text-[7px] md:text-[8px] font-black text-gray-700 uppercase tracking-widest block mb-0.5">PLATAFORMA</span>
                <span className="text-[10px] md:text-[12px] font-bold text-white uppercase italic">Discord_Access</span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tight">Comunidade Global</h4>
              <p className="text-[10px] md:text-xs text-slate-500 font-medium italic leading-relaxed opacity-80">Networking soberano entre founders e engenheiros de elite.</p>
            </div>
          </div>

          <a
            href="https://discord.gg/JmxJSPdx"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-6 md:mt-8 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[8px] md:text-[9px] font-black text-white uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all italic relative z-10 shadow-xl"
          >
            Entrar no Hub <ExternalLink size={12} />
          </a>
        </div>

        {/* Card: Canal VIP (WhatsApp) */}
        <div className="col-span-12 lg:col-span-4 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[32px] md:rounded-[48px] p-6 md:p-8 flex flex-col relative overflow-hidden group cursor-pointer hover:border-emerald-500/30 transition-all duration-500 shadow-2xl min-h-[240px] md:min-h-[280px]">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-600/5 blur-[80px] pointer-events-none" />

          <div className="space-y-4 md:space-y-5 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.123.554 4.197 1.607 6.037L0 24l6.105-1.602a11.834 11.834 0 005.937 1.632h.005c6.637 0 12.032-5.391 12.035-12.028a11.789 11.789 0 00-3.483-8.497z" /></svg>
              </div>
              <div className="text-right">
                <span className="text-[7px] md:text-[8px] font-black text-gray-700 uppercase tracking-widest block mb-0.5">PROTOCOLO</span>
                <span className="text-[10px] md:text-[12px] font-bold text-white uppercase italic">Whats_Sync</span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tight">Canal VIP</h4>
              <p className="text-[10px] md:text-xs text-slate-500 font-medium italic leading-relaxed opacity-80">Atualizações em tempo real diretamente no seu terminal de bolso.</p>
            </div>
          </div>

          <a href="https://chat.whatsapp.com/Bh5xBOv6P2T9kG589JDGcm" target="_blank" rel="noopener noreferrer" className="w-full mt-6 md:mt-8 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[8px] md:text-[9px] font-black text-white uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all italic relative z-10 shadow-xl">
            Entrar no Canal <ExternalLink size={12} />
          </a>
        </div>

        {/* Card: Desafio 8D */}
        <div className="col-span-12 lg:col-span-4 bg-[#0A0A0C]/60 backdrop-blur-3xl border border-purple-500/20 rounded-[32px] md:rounded-[48px] p-6 md:p-8 flex flex-col relative overflow-hidden group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] hover:border-purple-500/40 transition-all duration-500 min-h-[240px] md:min-h-[280px]">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none opacity-40" />

          <div className="space-y-4 md:space-y-5 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-all">
                <Target size={24} strokeWidth={2.5} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-lg md:text-xl font-black text-white tracking-tight italic uppercase leading-none">Desafio 8D</h4>
                <p className="text-[7px] md:text-[8px] font-black text-gray-600 uppercase tracking-widest font-mono italic">Aceleração_SaaS_HUB</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-white italic">
                <span className="text-[9px] md:text-[10px] font-bold tracking-tight uppercase">Status de Execução</span>
                <span className="text-xs md:text-sm font-black text-purple-400 uppercase tracking-widest">{challengeProgressPercent}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
                <div className="h-full bg-gradient-to-r from-orange-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-[1500ms]" style={{ width: `${challengeProgressPercent}%` }} />
              </div>
            </div>
          </div>

          <button onClick={onOpenChallenge} className="w-full mt-6 md:mt-8 py-3.5 md:py-4 bg-white text-black rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] italic shadow-2xl hover:scale-105 active:scale-95 transition-all">
            EXECUTAR_PROTOCOLO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Academy;