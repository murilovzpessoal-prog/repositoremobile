import React, { useState, useEffect, useRef } from 'react';
import createGlobe, { COBEOptions } from "cobe";
import {
  Search,
  Star,
  Link as LinkIcon,
  TrendingUp,
  Building2,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Target,
  ShieldCheck,
  Instagram,
  Phone,
  Mail,
  Globe as GlobeIcon,
  ChevronLeft
} from 'lucide-react';
import { LocationMap } from './LocationMap';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../src/lib/supabase';

// --- Globe Component Implementation (Optimized for Turbo Performance) ---
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 8000, // Reduced from 12000 for better performance
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [124 / 255, 58 / 255, 237 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const rotationRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let width = 0;
    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...GLOBE_CONFIG,
      width: width * 2 || 800,
      height: width * 2 || 800,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.005;
        }
        state.phi = phiRef.current + rotationRef.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    const readyTimer = setTimeout(() => setIsReady(true), 100);

    return () => {
      globe.destroy();
      clearTimeout(readyTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []); // Run only once

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    updatePointerInteraction(e.clientX - pointerInteractionMovement.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      rotationRef.current = delta / 200;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (pointerInteracting.current !== null && e.touches[0]) {
      const delta = e.touches[0].clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      rotationRef.current = delta / 200;
    }
  };

  return (
    <div className={`relative mx-auto aspect-square w-full ${className}`}>
      <canvas
        className={`size-full transition-opacity duration-700 ease-in-out cursor-grab ${isReady ? 'opacity-100' : 'opacity-0'}`}
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      />
    </div>
  );
}

const Prospector: React.FC = () => {
  const [view, setView] = useState<'welcome' | 'search' | 'results'>('welcome');
  const [strategy, setStrategy] = useState<'all' | 'nosite'>('nosite');
  const [rating, setRating] = useState(0.0);
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [channel, setChannel] = useState('any');

  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!niche || !location) {
      alert("Por favor, preencha o nicho e a localização.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('find-leads', {
        body: { niche, location }
      });

      if (error) throw error;

      if (data && data.leads) {
        setLeads(data.leads);
        setView('results');
      } else {
        alert("Nenhum lead encontrado para esta busca.");
      }
    } catch (error: any) {
      console.error("Erro na busca de leads:", error);
      alert("Falha operacional ao buscar leads: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (view === 'welcome') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[#020205] overflow-hidden p-4 md:p-6"
      >
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[1600px] h-[800px] bg-purple-600/[0.03] blur-[150px] rounded-full" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(124,58,237,0.1),transparent_70%)]" />
        </div>

        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <div className="absolute top-10 left-10 flex flex-col gap-1 opacity-20">
            <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.5em]">System_Integrity_Check</span>
          </div>
          <div className="absolute top-10 right-10 text-right flex flex-col gap-1 opacity-20">
            <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.5em]">Lead_Discovery_Flux</span>
          </div>
          <div className="absolute left-12 top-1/2 -translate-y-1/2 space-y-8 hidden xl:block">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="p-6 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[32px] w-64 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400"><Target size={16} /></div>
                <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic">Alvos de Mercado</h4>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-20 w-full max-w-[1200px] flex flex-col items-center gap-8">
          <div className="text-center space-y-4 md:space-y-6 w-full flex flex-col items-center">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_12px_#A855F7] animate-pulse" />
              <span className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.6em] italic">Intelligence_System_Prospector</span>
            </motion.div>
            <div className="space-y-4 w-full flex flex-col items-center">
              <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, type: "spring" }} className="w-full text-[32px] md:text-[84px] font-black text-white tracking-tighter leading-[1] md:leading-none italic uppercase text-center antialiased">
                BUSCAR <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 md:ml-4 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">CLIENTES.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1, delay: 0.3 }} className="text-gray-400 text-xs md:text-base font-medium max-w-xl mx-auto leading-relaxed italic text-center px-4">
                Sincronize com o globo. Identifique oportunidades de alto ticket com inteligência geográfica.
              </motion.p>
            </div>
          </div>

          <div className="relative w-full max-w-[280px] md:max-w-[500px] aspect-square flex items-center justify-center mx-auto">
            <div className="absolute inset-[-8%] border border-white/[0.03] rounded-full animate-pulse pointer-events-none" />
            <div className="relative w-full h-full flex items-center justify-center group/globe">
              <Globe className="opacity-95 grayscale-[0.2] transition-all duration-[2000ms] scale-[1.1] md:scale-[1.3]" />
              <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
                <button onClick={() => setView('search')} className="pointer-events-auto group relative px-6 md:px-14 py-4 md:py-6 bg-white/10 backdrop-blur-[40px] text-white rounded-xl md:rounded-[28px] font-black text-[10px] md:text-[13px] uppercase tracking-[0.3em] md:tracking-[0.5em] italic shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all duration-700 overflow-hidden flex items-center justify-center gap-3 md:gap-5 border border-white/25">
                  <span className="relative z-10">Iniciar Busca</span>
                  <ChevronRight size={18} md:size={22} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex items-center gap-6 md:gap-12 bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-[20px] md:rounded-[32px] px-8 md:px-12 py-3 md:py-5 shadow-2xl mx-auto">
            <div className="flex flex-col items-center">
              <span className="text-[7px] md:text-[8px] font-black text-white/30 uppercase tracking-widest">Global</span>
              <span className="text-[10px] md:text-[12px] font-bold text-white italic">4.8k</span>
            </div>
            <div className="w-px h-6 md:h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-[7px] md:text-[8px] font-black text-white/30 uppercase tracking-widest">Accuracy</span>
              <span className="text-[10px] md:text-[12px] font-bold text-emerald-400 italic">99.8%</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (view === 'results') {
    return (
      <div className="relative min-h-screen bg-[#020205] text-[#94A3B8] p-4 md:p-12 animate-in fade-in duration-700 overflow-x-hidden flex flex-col items-center pb-60">
        <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1600px] flex items-center mb-6 md:mb-10 relative z-10">
          <button onClick={() => setView('search')} className="flex items-center gap-3 text-gray-500 hover:text-white transition-all text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] font-mono italic group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            RETORNAR
          </button>
        </div>
        <div className="w-full max-w-[1600px] mb-8 md:mb-16 relative z-10 space-y-3 px-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#A855F7]" />
            <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest italic font-mono">SCAN_RESULTS: {leads.length} LEADS</span>
          </div>
          <h2 className="text-[32px] md:text-[64px] font-black text-white tracking-tighter leading-none italic uppercase">Resultados da <span className="text-white/20">Busca_</span></h2>
        </div>
        <motion.div layout className="w-full max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-x-24 md:gap-y-32 items-start relative z-10 px-4">
          {leads.map((res, idx) => (
            <LocationMap
              key={idx}
              location={res.location}
              address={res.address}
              coordinates={res.coordinates}
              reviews={res.reviews}
              stars={res.stars}
              status={res.status}
              phone={res.phone}
              website={res.website}
              mapsUrl={res.mapsUrl}
              className="w-full"
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#020205] text-[#94A3B8] p-4 md:p-8 animate-in fade-in duration-700 overflow-hidden flex flex-col items-center">
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-[850px] flex items-center mb-6 relative z-10">
        <button onClick={() => setView('welcome')} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[9px] md:text-[10px] font-black uppercase tracking-widest group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>
      </div>
      <div className="w-full max-w-[850px] relative z-10 mx-auto">
        <div className="bg-[#0F0F12]/80 backdrop-blur-3xl border border-white/5 rounded-2xl md:rounded-[40px] p-6 md:p-14 shadow-2xl space-y-8 md:space-y-12 h-full overflow-y-auto no-scrollbar">
          <div className="space-y-1">
            <p className="text-[8px] md:text-[9px] font-black text-purple-500 uppercase tracking-[0.4em] italic">NEXBUILD INTELLIGENCE</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h2 className="text-[28px] md:text-[42px] font-black text-white tracking-tighter leading-none">Buscar Leads</h2>
              <div className="w-fit flex items-center gap-2 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[7px] md:text-[8px] font-black text-emerald-500 uppercase tracking-widest">AI Online</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div className="space-y-3">
              <label className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest">Nicho</label>
              <input type="text" placeholder="Ex: Hamburgueria" value={niche} onChange={(e) => setNiche(e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-2 text-base md:text-lg font-bold text-white placeholder-gray-800 focus:outline-none focus:border-purple-500/50 transition-all" />
            </div>
            <div className="space-y-3">
              <label className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest">Localização</label>
              <input type="text" placeholder="Ex: São Paulo, SP" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-2 text-base md:text-lg font-bold text-white placeholder-gray-800 focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>
          </div>
          <div className="h-px w-full bg-white/5" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6">
              <h4 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest">Filtros_</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] md:text-[11px] font-bold text-gray-500">Avaliação</span>
                  <span className="text-[12px] md:text-[13px] font-black text-purple-400">{rating.toFixed(1)}+</span>
                </div>
                <input type="range" min="0" max="5" step="0.1" value={rating} onChange={(e) => setRating(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-purple-500 cursor-pointer" />
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] md:text-[11px] font-bold text-gray-500 block uppercase tracking-widest">Avaliações</span>
              <div className="relative">
                <select className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white appearance-none focus:outline-none focus:border-purple-500/50 transition-all">
                  <option>Qualquer</option>
                  <option>Menos de 10</option>
                  <option>Mais de 50</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6">
              <h4 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest">Modo_</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <button onClick={() => setStrategy('all')} className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${strategy === 'all' ? 'bg-purple-500/10 border-purple-500/40' : 'bg-white/[0.02] border-white/5'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${strategy === 'all' ? 'text-purple-400 bg-purple-400/10' : 'text-gray-600 bg-white/5'}`}><GlobeIcon size={16} /></div>
                  <p className="text-[10px] md:text-xs font-bold text-white">Todas</p>
                </button>
                <button onClick={() => setStrategy('nosite')} className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left relative overflow-hidden ${strategy === 'nosite' ? 'bg-purple-500/10 border-purple-500/40' : 'bg-white/[0.02] border-white/5'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${strategy === 'nosite' ? 'text-purple-400 bg-purple-400/10' : 'text-gray-600 bg-white/5'}`}><LinkIcon size={16} className="rotate-45" /></div>
                  <p className="text-[10px] md:text-xs font-bold text-white">Sem site</p>
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest">Canais_</h4>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {[
                  { id: 'instagram', label: 'Insta', icon: <Instagram size={14} /> },
                  { id: 'phone', label: 'Tel', icon: <Phone size={14} /> },
                  { id: 'email', label: 'Email', icon: <Mail size={14} /> },
                  { id: 'any', label: 'Tudo', icon: <GlobeIcon size={14} /> }
                ].map((c) => (
                  <button key={c.id} onClick={() => setChannel(c.id)} className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${channel === c.id ? 'bg-purple-500/10 border-purple-500/40 text-white' : 'bg-white/[0.01] border-white/5 text-gray-600'}`}>
                    {c.icon}<span className="text-[9px] md:text-[10px] font-bold">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-4 flex justify-center pb-8">
            <button
              onClick={handleSearch}
              disabled={loading}
              className={`w-full sm:w-auto group relative px-10 md:px-12 py-4 md:py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black text-[11px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.4em] italic shadow-xl hover:scale-105 active:scale-95 transition-all duration-700 overflow-hidden flex items-center justify-center gap-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search size={16} md:size={18} strokeWidth={3} />
              )}
              <span>{loading ? 'Sincronizando...' : 'Buscar Leads'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prospector;