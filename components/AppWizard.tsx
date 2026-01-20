import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Zap,
  Target,
  Users,
  Cpu,
  Type,
  Palette,
  Flag,
  Monitor,
  ShieldCheck,
  Layers,
  Cpu as CpuIcon,
  Smartphone,
  Sun,
  Moon,
  Box,
  Code2,
  Check,
  Flame,
  Terminal,
  Coffee,
  Sparkles
} from 'lucide-react';
import { IntelligenceEngine } from '../src/lib/intelligence';
import { supabase } from '../src/lib/supabase';

interface AppWizardProps {
  onBack: () => void;
  onComplete: (data: any) => void;
}

// Full list of 10 platforms as per the user image
const aiPlatforms = [
  { name: 'Lovable', icon: <img src="https://i.imgur.com/PxfYsF9.png" className="w-8 h-8 object-contain" alt="Lovable" /> },
  { name: 'Firebase Studio', icon: <div className="w-8 h-8 flex items-center justify-center bg-orange-500/20 rounded-lg text-orange-400"><Flame size={20} /></div> },
  { name: 'Bolt', icon: <img src="https://i.imgur.com/OaUJU6z.png" className="w-8 h-8 object-contain" alt="Bolt" /> },
  { name: 'Replit', icon: <div className="w-8 h-8 flex items-center justify-center bg-red-500/20 rounded-lg text-red-400"><Terminal size={20} /></div> },
  { name: 'Lazy', icon: <div className="w-8 h-8 flex items-center justify-center bg-zinc-500/20 rounded-lg text-zinc-400"><Moon size={20} /></div> },
  { name: 'v0.dev', icon: <img src="https://i.imgur.com/YTqlKyY.png" className="w-8 h-8 object-contain" alt="v0.dev" /> },
  { name: 'Base44', icon: <div className="w-8 h-8 flex items-center justify-center bg-blue-500/20 rounded-lg text-blue-400"><Layers size={20} /></div> },
  { name: 'Mocha', icon: <div className="w-8 h-8 flex items-center justify-center bg-amber-500/20 rounded-lg text-amber-400"><Coffee size={20} /></div> },
  { name: 'Genspark', icon: <div className="w-8 h-8 flex items-center justify-center bg-emerald-500/20 rounded-lg text-emerald-400"><Sparkles size={20} /></div> },
  { name: 'AI Studio', icon: <img src="https://i.imgur.com/l16u0h9.png" className="w-8 h-8 object-contain" alt="Google AI Studio" /> }
];

const AppWizard: React.FC<AppWizardProps> = ({ onBack, onComplete }) => {
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
    appName: '', objective: '', audience: 'Founders', colorPalette: 'Dark Mode', designStyle: 'Moderno', niche: '', mainBenefit: '', platform: 'Multi', pages: 'Home, Dash', aiPlatform: 'Lovable'
  });

  const updateField = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  const totalSteps = isMobile ? 4 : 7;

  const handleFinalize = async () => {
    setIsGenerating(true);
    setProgress(15);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // Gerar prompt arquitetural profissional
      const prompt = await IntelligenceEngine.generateProfessionalPrompt(user.id, {
        feature: 'app',
        data: formData
      });

      // Persistir contexto do projeto no Supabase
      await supabase.from('projects').insert({
        user_id: user.id,
        type: 'app',
        name: formData.appName || 'Novo App',
        objective: formData.objective,
        details: { ...formData, technical_prompt: prompt }
      });

      let current = 15;
      const interval = setInterval(() => {
        current += 5;
        setProgress(current);
        if (current >= 100) {
          clearInterval(interval);
          onComplete({ ...formData, technical_prompt: prompt });
        }
      }, 40);

    } catch (error: any) {
      alert("Erro na Camada de Inteligência: " + error.message);
      setIsGenerating(false);
    }
  };

  const labelStyle = "text-[9px] md:text-[10px] font-black text-purple-400 tracking-[0.1em] font-['Montserrat'] flex items-center gap-2 uppercase antialiased";
  const inputStyle = "w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm font-black italic focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10";

  return (
    <div className="absolute inset-0 z-[100] bg-[#020205] flex overflow-hidden font-['Inter'] animate-in fade-in duration-500">
      {isGenerating && (
        <div className="fixed inset-0 z-[300] bg-[#020205]/98 backdrop-blur-[40px] flex flex-col items-center justify-center p-8">
          <h3 className="text-lg md:text-2xl font-black text-white tracking-[0.4em] uppercase italic mb-8">MATERIALIZANDO...</h3>
          <div className="w-32 md:w-64 h-0.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
        </div>
      )}

      {/* DESKTOP PREVIEW */}
      {!isMobile && (
        <div className="hidden lg:flex lg:w-[45%] items-center justify-center relative p-12 perspective-[3000px] bg-black/20 border-r border-white/5"><div className="relative rotate-y-[-16deg] translate-x-32 transition-transform"><div className="bg-gradient-to-b from-[#222226] via-[#08080A] to-[#222226] rounded-[70px] p-[12px] shadow-2xl"><div className="w-[380px] h-[780px] bg-[#010102] rounded-[58px] overflow-hidden flex flex-col relative"><div className="p-8 space-y-10"><h4 className="text-white font-black text-3xl italic">{formData.appName || 'Meu App'}</h4></div></div></div></div></div>
      )}

      <div className="flex-1 flex flex-col py-6 md:py-12 px-5 md:px-16 relative z-10 overflow-hidden">
        <div className={`w-full max-w-2xl mx-auto flex flex-col h-full ${isMobile ? 'space-y-4' : 'space-y-12'}`}>
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-3 text-[9px] font-black text-gray-700 uppercase tracking-[0.4em] hover:text-white transition-all italic font-mono"><ChevronLeft size={16} /> VOLTAR</button>
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-purple-400 italic uppercase">ETAPA {currentStep} / {totalSteps}</div>
          </div>
          <h2 className="text-[26px] md:text-[48px] font-black text-white tracking-tighter leading-[0.9] italic uppercase font-['Syne']">
            {currentStep === 1 && <><span className="text-purple-500">Sua</span> Ideia</>}
            {currentStep > 1 && currentStep < totalSteps && <><span className="text-cyan-500">Fase</span> {currentStep}</>}
            {currentStep === totalSteps && <><span className="text-indigo-500">Finalizar</span></>}
          </h2>
          <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar">
            {isMobile ? (
              /* --- MOBILE GROUPED WIZARD (3+ ELEMENTS PER STEP) --- */
              <>
                {currentStep === 1 && (
                  <div className="space-y-3 animate-in slide-in-from-right-4 duration-500">
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Type size={12} /> 01 Nome do SaaS</label><input type="text" placeholder="Ex: Nex Hub" value={formData.appName} onChange={(e) => updateField('appName', e.target.value)} className={inputStyle} /></div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Flag size={12} /> 02 O que ele faz?</label><input type="text" placeholder="A solução principal" value={formData.objective} onChange={(e) => updateField('objective', e.target.value)} className={inputStyle} /></div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Layers size={12} /> 03 Segmento Mercado</label><input type="text" placeholder="Ex: Fintech, CRM..." value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={inputStyle} /></div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-3 animate-in slide-in-from-right-4 duration-500">
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Users size={12} /> 04 Público Alvo</label><input type="text" value={formData.audience} onChange={(e) => updateField('audience', e.target.value)} className={inputStyle} /></div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Zap size={12} /> 05 Modelo Negócio</label><input type="text" placeholder="Ex: SaaS Freemium" value={formData.mainBenefit} onChange={(e) => updateField('mainBenefit', e.target.value)} className={inputStyle} /></div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Smartphone size={12} /> 06 Ambiente</label>
                      <div className="grid grid-cols-2 gap-2">{['Multi', 'Web Only', 'PWA', 'Elite'].map(p => <button key={p} onClick={() => updateField('platform', p)} className={`py-2.5 rounded-lg text-[9px] font-black border transition-all ${formData.platform === p ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/5 text-gray-500'}`}>{p}</button>)}</div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-3 animate-in slide-in-from-right-4 duration-500">
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Monitor size={12} /> 07 Telas do Projeto</label><input type="text" placeholder="Ex: Dash, Login..." value={formData.pages} onChange={(e) => updateField('pages', e.target.value)} className={inputStyle} /></div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Palette size={12} /> 08 Design Style</label>
                      <div className="grid grid-cols-2 gap-2">{['Elite Glass', 'Minimal', 'Modern', 'Apple'].map(s => <button key={s} onClick={() => updateField('designStyle', s)} className={`py-2.5 rounded-lg text-[10px] font-black border transition-all ${formData.designStyle === s ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/5 text-gray-600'}`}>{s}</button>)}</div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Sun size={12} /> 09 Preferência Tema</label>
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
              /* --- DESKTOP ORIGINAL WIZARD (7 STEPS) --- */
              <>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Type size={12} /> 01 Nome do SaaS</label><input type="text" placeholder="Ex: Nex Hub" value={formData.appName} onChange={(e) => updateField('appName', e.target.value)} className={inputStyle} /></div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Flag size={12} /> 02 O que ele faz?</label><input type="text" placeholder="A solução principal" value={formData.objective} onChange={(e) => updateField('objective', e.target.value)} className={inputStyle} /></div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Palette size={12} /> Design Style</label><div className="grid grid-cols-2 gap-2">{['Elite Glass', 'Dark Minimal', 'Modern Clean', 'Apple Style'].map(s => <button key={s} onClick={() => updateField('designStyle', s)} className={`py-3 rounded-lg text-[10px] font-black border transition-all ${formData.designStyle === s ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 text-gray-500'}`}>{s}</button>)}</div></div>
                )}
                {currentStep === 3 && (
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Layers size={12} /> Nicho de Atuação</label><input type="text" placeholder="Ex: Saúde, Vendas..." value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={inputStyle} /></div>
                )}
                {currentStep === 4 && (
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Users size={12} /> Público-Alvo</label><input type="text" placeholder="Ex: Founders e CEOs" value={formData.audience} onChange={(e) => updateField('audience', e.target.value)} className={inputStyle} /></div>
                )}
                {currentStep === 5 && (
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Zap size={12} /> Modelo de Receita</label><input type="text" placeholder="Ex: SaaS Freemium" value={formData.mainBenefit} onChange={(e) => updateField('mainBenefit', e.target.value)} className={inputStyle} /></div>
                )}
                {currentStep === 6 && (
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Monitor size={12} /> Plataforma</label><div className="grid grid-cols-1 gap-2">{['Multiplataforma', 'Apenas Web'].map(p => <button key={p} onClick={() => updateField('platform', p)} className={`py-3 rounded-lg text-[10px] font-black border transition-all ${formData.platform === p ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/5 text-gray-500'}`}>{p}</button>)}</div></div>
                )}
                {currentStep === 7 && (
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6">
                    <label className={labelStyle}><CpuIcon size={12} /> Engine</label>
                    <div className="grid grid-cols-2 gap-2">{aiPlatforms.map(p => <button key={p.name} onClick={() => updateField('aiPlatform', p.name)} className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${formData.aiPlatform === p.name ? 'bg-purple-600/10 border-purple-500 shadow-xl' : 'bg-white/[0.02] text-gray-600'}`}>{p.icon}<span className="text-[8px] font-black uppercase">{p.name}</span></button>)}</div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="pt-6 border-t border-white/5 flex items-center justify-between shrink-0 pb-8">
            {currentStep > 1 ? <button onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center gap-3 text-[9px] font-black text-gray-600 hover:text-white transition-all italic font-mono"><ChevronLeft size={16} /> VOLTAR</button> : <div className="flex items-center gap-2 opacity-30"><ShieldCheck size={14} className="text-emerald-500" /><span className="text-[8px] font-black text-white uppercase italic">ELITE_OK</span></div>}
            <button onClick={() => currentStep === totalSteps ? handleFinalize() : setCurrentStep(currentStep + 1)} disabled={currentStep === 1 && !formData.appName} className={`flex items-center gap-4 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.4em] transition-all italic shadow-2xl ${currentStep === 1 && !formData.appName ? 'bg-white/5 text-gray-800 cursor-not-allowed' : 'bg-white text-black hover:scale-105 active:scale-95'}`}><span>{currentStep === totalSteps ? 'FORJAR' : 'PRÓXIMO'}</span><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppWizard;