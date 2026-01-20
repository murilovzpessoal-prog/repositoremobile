import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Plus,
  Type,
  Layout,
  Palette,
  Smartphone,
  MousePointer2,
  Wifi,
  Battery,
  Users,
  Briefcase,
  ShieldCheck,
  Target,
  Type as FontIcon,
  Zap,
  Layers,
  Sparkles,
  Command,
  Pipette,
  Check,
  Flag,
  Heart,
  Settings,
  MessageSquare,
  Globe2,
  Cpu as CpuIcon,
  Monitor,
  Box,
  Code2,
  Database,
  Cloud,
  Layers as LayersIcon,
  Sun,
  Moon,
  Smartphone as PhoneIcon,
  Globe as GlobeIcon,
  Flame,
  Coffee,
  Terminal,
  MousePointer
} from 'lucide-react';

import { IntelligenceEngine } from '../src/lib/intelligence';
import { supabase } from '../src/lib/supabase';

interface Model {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  defaultPages: string[];
}

const MODELS: Model[] = [
  { id: 'SYS-001', title: 'Hamburgueria Artesanal', description: 'Cardápio digital mobile-first.', category: 'DELIVERY', tags: ['Digital', 'WhatsApp'], image: 'https://i.imgur.com/vxApkSP.jpeg', defaultPages: ['Cardápio', 'Carrinho', 'WhatsApp'] },
  { id: 'SYS-002', title: 'Pizzaria Delivery', description: 'Experiência imersiva de sabores.', category: 'DELIVERY', tags: ['Montar Pizza', 'Rastreio'], image: 'https://i.imgur.com/Ew8XZ7F.jpeg', defaultPages: ['Menu', 'Checkout', 'Status'] },
  { id: 'SYS-003', title: 'Loja de Roupas', description: 'Vitrine premium e compra ágil.', category: 'E-COMMERCE', tags: ['Catálogo', 'Visual'], image: 'https://i.imgur.com/2IGgZtq.jpeg', defaultPages: ['Home', 'Produto', 'Carrinho'] },
  { id: 'SYS-004', title: 'Barbearia Premium', description: 'Fluxo de agendamento soberano.', category: 'BELEZA', tags: ['Agenda', 'Check-in'], image: 'https://i.imgur.com/ZY43yuk.jpeg', defaultPages: ['Início', 'Serviço', 'Agenda'] },
];

const FILTERS = ['TODOS', 'DELIVERY', 'BELEZA', 'FITNESS', 'E-COMMERCE', 'SERVIÇOS'];

// Full list of 10 platforms as per the user image
const aiPlatforms = [
  { name: 'Lovable', icon: <img src="https://i.imgur.com/PxfYsF9.png" className="w-8 h-8 object-contain" alt="Lovable" />, color: 'purple' },
  { name: 'Firebase Studio', icon: <div className="w-8 h-8 flex items-center justify-center bg-orange-500/20 rounded-lg text-orange-400"><Flame size={20} /></div>, color: 'orange' },
  { name: 'Bolt', icon: <img src="https://i.imgur.com/OaUJU6z.png" className="w-8 h-8 object-contain" alt="Bolt" />, color: 'blue' },
  { name: 'Replit', icon: <div className="w-8 h-8 flex items-center justify-center bg-red-500/20 rounded-lg text-red-400"><Terminal size={20} /></div>, color: 'red' },
  { name: 'Lazy', icon: <div className="w-8 h-8 flex items-center justify-center bg-zinc-500/20 rounded-lg text-zinc-400"><Moon size={20} /></div>, color: 'zinc' },
  { name: 'v0.dev', icon: <img src="https://i.imgur.com/YTqlKyY.png" className="w-8 h-8 object-contain" alt="v0.dev" />, color: 'zinc' },
  { name: 'Base44', icon: <div className="w-8 h-8 flex items-center justify-center bg-blue-500/20 rounded-lg text-blue-400"><Database size={20} /></div>, color: 'blue' },
  { name: 'Mocha', icon: <div className="w-8 h-8 flex items-center justify-center bg-amber-500/20 rounded-lg text-amber-400"><Coffee size={20} /></div>, color: 'amber' },
  { name: 'Genspark', icon: <div className="w-8 h-8 flex items-center justify-center bg-emerald-500/20 rounded-lg text-emerald-400"><Sparkles size={20} /></div>, color: 'emerald' },
  { name: 'AI Studio', icon: <img src="https://i.imgur.com/l16u0h9.png" className="w-8 h-8 object-contain" alt="Google AI Studio" />, color: 'blue' }
];

interface ModelCatalogProps {
  onBack: () => void;
  onGenerateUpdate: (data: any) => void;
}

const ModelCatalog: React.FC<ModelCatalogProps> = ({ onBack, onGenerateUpdate }) => {
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [customizing, setCustomizing] = useState<Model | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    appName: '', objective: '', audience: 'Clientes', colorPalette: 'Dark Mode', designStyle: 'Elite Glass', niche: '', mainBenefit: '', platform: 'Multi', pages: '', aiPlatform: 'Lovable'
  });

  const handleStartCustomization = (model: Model) => {
    setFormData(prev => ({ ...prev, appName: `${model.title} App`, objective: model.description, niche: model.category, pages: model.defaultPages.join(', ') }));
    setCustomizing(model);
    setCurrentStep(1);
  };

  const updateField = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  const totalSteps = isMobile ? 4 : 7;

  const handleFinalize = async () => {
    setIsGenerating(true);
    setProgress(15);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // Gerar prompt massivo usando Deep Inference do modelo
      const prompt = await IntelligenceEngine.generateProfessionalPrompt(user.id, {
        feature: 'app',
        data: formData,
        modelId: customizing?.id
      });

      let current = 15;
      const interval = setInterval(() => {
        current += 5;
        setProgress(current);
        if (current >= 100) {
          clearInterval(interval);
          setTimeout(() => onGenerateUpdate({ ...formData, technical_prompt: prompt, type: 'new' }), 500);
        }
      }, 40);

    } catch (error: any) {
      alert("Erro na Camada de Inteligência: " + error.message);
      setIsGenerating(false);
    }
  };

  const labelStyle = "text-[9px] font-black text-purple-400 tracking-[0.1em] font-['Montserrat'] flex items-center gap-2 uppercase antialiased";
  const inputStyle = "w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm font-black italic focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10";

  if (customizing) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#020205] flex flex-col lg:flex-row overflow-hidden animate-in fade-in duration-500 font-['Inter']">
        {isGenerating && (
          <div className="fixed inset-0 z-[300] bg-[#020205]/98 backdrop-blur-[40px] flex flex-col items-center justify-center p-8">
            <h3 className="text-sm md:text-2xl font-black text-white tracking-[0.2em] md:tracking-[0.4em] uppercase italic mb-8">Sincronizando Protocolo_</h3>
            <div className="w-32 md:w-[400px] h-0.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
          </div>
        )}

        {/* DESKTOP PREVIEW SIDEBAR */}
        {!isMobile && (
          <div className="hidden lg:flex lg:w-[40%] h-full items-center justify-center bg-black/40 border-r border-white/5 perspective-[3000px]">
            <div className="bg-[#1A1A1E] rounded-[60px] p-1.5 shadow-2xl border border-white/10 rotate-y-[-10deg]"><div className="w-[300px] h-[600px] bg-[#010102] rounded-[52px] overflow-hidden flex flex-col relative"><img src={customizing.image} className="w-full h-full object-cover grayscale-[0.2]" alt="Preview" /></div></div>
          </div>
        )}

        <div className="flex-1 flex flex-col h-full bg-[#08080A]/98 backdrop-blur-3xl relative z-20">
          <div className="flex-1 overflow-y-auto px-4 md:px-20 py-6 md:py-16 no-scrollbar">
            <div className={`w-full max-w-xl mx-auto flex flex-col ${isMobile ? 'space-y-4' : 'space-y-12'}`}>
              <div className="flex items-center justify-between">
                <button onClick={() => setCustomizing(null)} className="flex items-center gap-3 text-[9px] font-black text-gray-700 uppercase tracking-[0.4em] hover:text-white transition-all italic font-mono"><ChevronLeft size={14} /> VOLTAR</button>
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-purple-400 italic">PASSO {currentStep} / {totalSteps}</div>
              </div>
              <h2 className="text-[22px] md:text-[48px] font-black text-white tracking-tighter leading-[0.9] italic uppercase font-['Syne']">
                {currentStep === 1 && <><span className="text-purple-500">Sua</span> Ideia</>}
                {currentStep > 1 && currentStep < totalSteps && <><span className="text-cyan-500">Fase</span> {currentStep}</>}
                {currentStep === totalSteps && <><span className="text-indigo-500">Finalizar</span></>}
              </h2>

              <div className="flex-1 space-y-4">
                {isMobile ? (
                  /* --- MOBILE UI: REDUCED TO 4 STEPS, MIN 3 ELEMENTS PER PAGE --- */
                  <>
                    {currentStep === 1 && (
                      <div className="space-y-3 animate-in slide-in-from-right-4 duration-500">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Type size={12} /> 01 Nome do App</label><input type="text" value={formData.appName} onChange={(e) => updateField('appName', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Flag size={12} /> 02 Objetivo</label><input type="text" value={formData.objective} onChange={(e) => updateField('objective', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Layers size={12} /> 03 Nicho Operacional</label><input type="text" placeholder="Ex: Mercado SaaS" value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={inputStyle} /></div>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="space-y-3 animate-in slide-in-from-right-4 duration-500">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Users size={12} /> 04 Público Alvo</label><input type="text" value={formData.audience} onChange={(e) => updateField('audience', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Zap size={12} /> 05 Benefício Chave</label><input type="text" placeholder="Dor que resolve..." value={formData.mainBenefit} onChange={(e) => updateField('mainBenefit', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><PhoneIcon size={12} /> 06 Ambiente</label>
                          <div className="grid grid-cols-2 gap-2">{['Celular', 'Web', 'Multi', 'PWA'].map(p => <button key={p} onClick={() => updateField('platform', p)} className={`py-2.5 rounded-lg text-[9px] font-black border transition-all ${formData.platform === p ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/5 text-gray-600'}`}>{p}</button>)}</div>
                        </div>
                      </div>
                    )}
                    {currentStep === 3 && (
                      <div className="space-y-3 animate-in slide-in-from-right-4 duration-500">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Monitor size={12} /> 07 Mapeamento de Telas</label><input type="text" value={formData.pages} onChange={(e) => updateField('pages', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Palette size={12} /> 08 Estilo Design</label>
                          <div className="grid grid-cols-2 gap-2">{['Elite Glass', 'Minimal', 'Dark Pro', 'Apple'].map(s => <button key={s} onClick={() => updateField('designStyle', s)} className={`py-3 rounded-lg text-[9px] font-black border transition-all ${formData.designStyle === s ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/5 text-gray-600'}`}>{s}</button>)}</div>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Pipette size={12} /> 09 Paleta Tema</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => updateField('colorPalette', 'Dark Mode')} className={`py-2.5 rounded-lg text-[9px] font-black border transition-all flex items-center justify-center gap-2 ${formData.colorPalette === 'Dark Mode' ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 text-gray-600'}`}><Moon size={10} /> DARK</button>
                            <button onClick={() => updateField('colorPalette', 'Light Mode')} className={`py-2.5 rounded-lg text-[9px] font-black border transition-all flex items-center justify-center gap-2 ${formData.colorPalette === 'Light Mode' ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 text-gray-600'}`}><Sun size={10} /> LIGHT</button>
                          </div>
                        </div>
                      </div>
                    )}
                    {currentStep === 4 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center justify-between px-1">
                          <label className={labelStyle}><CpuIcon size={12} /> 10 Seleção de Engine</label>
                          <span className="text-[7px] text-gray-600 font-bold uppercase tracking-widest italic">{aiPlatforms.length} DISPONÍVEIS</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pb-8">
                          {aiPlatforms.map(p => (
                            <button
                              key={p.name}
                              onClick={() => updateField('aiPlatform', p.name)}
                              className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-3 relative group/item ${formData.aiPlatform === p.name
                                ? 'bg-purple-600/10 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                                : 'bg-white/[0.02] border-white/5 text-gray-700'
                                }`}
                            >
                              {formData.aiPlatform === p.name && (
                                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-lg">
                                  <Check size={10} strokeWidth={4} />
                                </div>
                              )}
                              <div className="transition-transform duration-500 group-hover/item:scale-110">
                                {p.icon}
                              </div>
                              <span className="text-[8px] font-black uppercase tracking-[0.1em] text-center leading-tight">{p.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* --- DESKTOP UI: MAINTAINED 7 STEPS, ORIGINAL SPACING --- */
                  <>
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Type size={12} /> 01 Nome</label><input type="text" value={formData.appName} onChange={(e) => updateField('appName', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Flag size={12} /> 02 Objetivo</label><input type="text" value={formData.objective} onChange={(e) => updateField('objective', e.target.value)} className={inputStyle} /></div>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Palette size={12} /> Design</label>
                        <div className="grid grid-cols-2 gap-2">{['Elite Glass', 'Minimal', 'Dark Premium', 'Clean Pro'].map(s => <button key={s} onClick={() => updateField('designStyle', s)} className={`py-3 rounded-lg text-[9px] font-black border transition-all ${formData.designStyle === s ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 text-gray-600'}`}>{s}</button>)}</div>
                      </div>
                    )}
                    {currentStep === 3 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Layers size={12} /> Nicho</label><input type="text" placeholder="Ex: Mercado Delivery" value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={inputStyle} /></div>
                    )}
                    {currentStep === 4 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Users size={12} /> Público</label><input type="text" placeholder="Ex: B2C Premium" value={formData.audience} onChange={(e) => updateField('audience', e.target.value)} className={inputStyle} /></div>
                    )}
                    {currentStep === 5 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Zap size={12} /> Vantagem</label><input type="text" placeholder="Feature soberana..." value={formData.mainBenefit} onChange={(e) => updateField('mainBenefit', e.target.value)} className={inputStyle} /></div>
                    )}
                    {currentStep === 6 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Monitor size={12} /> Telas</label><input type="text" value={formData.pages} onChange={(e) => updateField('pages', e.target.value)} className={inputStyle} /></div>
                    )}
                    {currentStep === 7 && (
                      <div className="space-y-4">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6">
                          <label className={labelStyle}><CpuIcon size={12} /> Engine</label>
                          <div className="grid grid-cols-2 gap-2">
                            {aiPlatforms.map(p => <button key={p.name} onClick={() => updateField('aiPlatform', p.name)} className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${formData.aiPlatform === p.name ? 'bg-purple-600/10 border-purple-500' : 'bg-white/[0.02] border-white/5 text-gray-500'}`}>{p.icon}<span className="text-[8px] font-black uppercase">{p.name}</span></button>)}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="px-6 md:px-20 py-6 md:py-8 bg-black/40 border-t border-white/5 flex items-center justify-between shrink-0">
            {currentStep > 1 ? <button onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center gap-3 text-[9px] font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors italic font-mono"><ChevronLeft size={14} /> VOLTAR</button> : <div className="opacity-20 flex items-center gap-2"><ShieldCheck size={14} className="text-purple-500" /><span className="text-[8px] font-black text-white uppercase font-mono">MODEL_OK</span></div>}
            <button onClick={() => currentStep === totalSteps ? handleFinalize() : setCurrentStep(currentStep + 1)} className="flex items-center gap-4 px-8 py-3.5 md:py-6 rounded-full font-black text-[9px] md:text-[11px] uppercase tracking-[0.4em] bg-white text-black hover:scale-105 active:scale-95 transition-all italic shadow-2xl"><span>{currentStep === totalSteps ? 'FORJAR' : 'PRÓXIMO'}</span><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-[1400px] mx-auto w-full px-4 md:px-6 min-h-screen">
      <div className="relative pt-4 w-full z-10 flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-3 text-gray-700 hover:text-white transition-all text-[9px] font-black uppercase tracking-[0.2em] group font-mono italic"><ChevronLeft size={12} /><span>ESTÚDIO</span></button>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/[0.08] rounded-full"><span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] font-mono">v5.0_XP</span></div>
      </div>
      <div className="flex flex-col items-center pb-6 md:pb-10 w-full relative z-20 text-center px-4">
        <h2 className="text-[28px] md:text-[64px] font-black text-white tracking-tighter italic uppercase">Modelos <span className="text-purple-400">Elite</span></h2>
        <p className="text-[#94A3B8] font-medium text-[10px] md:text-lg tracking-tight opacity-40 italic mt-2">Estruturas validadas para materialização imediata.</p>
      </div>
      <div className="flex flex-col relative z-20 w-full">
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-3 border-y border-white/[0.05] bg-white/[0.01] mb-6">
          {FILTERS.map((f) => <button key={f} onClick={() => setActiveFilter(f)} className={`px-5 py-2 rounded-full text-[8px] md:text-[9px] font-black tracking-widest transition-all uppercase border whitespace-nowrap ${activeFilter === f ? 'bg-purple-600 border-purple-500 text-white shadow-xl' : 'bg-transparent text-gray-600 border-white/5'}`}>{f}</button>)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 pb-32">
          {MODELS.filter(m => activeFilter === 'TODOS' || m.category === activeFilter).map((model) => (
            <div key={model.id} onClick={() => handleStartCustomization(model)} className="group relative bg-[#0F0F12] border border-white/[0.08] rounded-[32px] overflow-hidden hover:border-purple-500/40 transition-all duration-700 cursor-pointer flex flex-col aspect-[4/5] shadow-2xl"><img src={model.image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-all duration-1000 grayscale-[0.4] group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-[#050507] p-8 flex flex-col justify-end"><h3 className="text-lg md:text-3xl font-black text-white tracking-tighter italic uppercase">{model.title}</h3><div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-all duration-700"><span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-[8px] font-black text-purple-400 uppercase tracking-widest italic">{model.category}</span><div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center shadow-xl"><ArrowRight size={18} /></div></div></div></div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};

export default ModelCatalog;