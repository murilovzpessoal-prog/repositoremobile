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
  Globe2,
  Cpu as CpuIcon,
  MessageSquare,
  Settings,
  Heart,
  Monitor,
  Smartphone as PhoneIcon,
  Sun,
  Moon,
  Code2,
  Box,
  Flame,
  Terminal,
  Coffee
} from 'lucide-react';
import { IntelligenceEngine } from '../src/lib/intelligence';
import { supabase } from '../src/lib/supabase';

interface LPTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  badge?: string;
  image: string;
}

const LP_TEMPLATES: LPTemplate[] = [
  { id: 'lp-001', title: 'LP produto digital', description: 'Alta conversão para infoprodutos e softwares.', category: 'PRODUTO DIGITAL', badge: 'CONVERSÃO', image: 'https://i.imgur.com/tSOLjOr.png' },
  { id: 'lp-002', title: 'LP Mentoria', description: 'Protocolo de autoridade absoluta para mentores.', category: 'MENTORIA', badge: 'ESTRATÉGICO', image: 'https://i.imgur.com/HoSBPlk.png' },
  { id: 'lp-003', title: 'LP Produto Físico', description: 'Design focado em características tangíveis.', category: 'E-COMMERCE', badge: 'RETAIL', image: 'https://i.imgur.com/v4GAbPt.jpeg' },
  { id: 'lp-004', title: 'e-commerce completo', description: 'Catálogo de produtos e conversão direta.', category: 'SERVIÇO', badge: 'VENDAS', image: 'https://i.imgur.com/0gBCAL1.jpeg' },
  { id: 'lp-005', title: 'Portfólio', description: 'Layout elegante para demonstração de trabalho.', category: 'VAREJO', badge: 'AUTORIDADE', image: 'https://i.imgur.com/qCpRdCA.jpeg' },
  { id: 'lp-006', title: 'Site Institucional', description: 'Presença digital sólida para empresas.', category: 'PÁGINA DE VENDAS', badge: 'CREDIBILIDADE', image: 'https://i.imgur.com/eWLbrr0.jpeg' }
];

const CATEGORIES = ['TODOS', 'PRODUTO DIGITAL', 'TREINAMENTO', 'MENTORIA', 'SERVIÇO', 'E-COMMERCE', 'VAREJO'];

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

const LandingPages: React.FC<{ onGenerateUpdate: (data: any) => void }> = ({ onGenerateUpdate }) => {
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [customizing, setCustomizing] = useState<LPTemplate | null>(null);
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
    appName: '', objective: '', audience: 'Empresários', colorPalette: 'Dark Mode', designStyle: 'Modern Glass', niche: '', mainBenefit: '', pages: 'Home, Checkout', aiPlatform: 'Lovable'
  });

  const filteredTemplates = LP_TEMPLATES.filter(t => activeFilter === 'TODOS' || t.category === activeFilter);

  const handleStartCustomization = (template: LPTemplate) => {
    setCustomizing(template);
    setFormData(prev => ({ ...prev, appName: template.title, objective: template.description, niche: template.category }));
    setCurrentStep(1);
  };

  const updateField = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  const totalSteps = isMobile ? 4 : 7;

  const handleFinalize = async () => {
    setIsGenerating(true);
    setProgress(20);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // Gerar prompt profissional focado em CRO
      const prompt = await IntelligenceEngine.generateProfessionalPrompt(user.id, {
        feature: 'lp',
        data: formData
      });

      // Persistir no Supabase
      await supabase.from('projects').insert({
        user_id: user.id,
        type: 'lp',
        name: formData.appName || 'Landing Page',
        objective: formData.objective,
        details: { ...formData, cro_prompt: prompt }
      });

      let current = 20;
      const interval = setInterval(() => {
        current += 5;
        setProgress(current);
        if (current >= 100) {
          clearInterval(interval);
          onGenerateUpdate({ ...formData, type: 'new' });
        }
      }, 40);

    } catch (error: any) {
      alert("Falha no Motor de Inteligência: " + error.message);
      setIsGenerating(false);
    }
  };

  const labelStyle = "text-[9px] font-black text-purple-400 tracking-[0.1em] font-['Montserrat'] flex items-center gap-2 uppercase antialiased";
  const inputStyle = "w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm font-black italic focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10";

  if (customizing) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#050507] flex flex-col lg:flex-row overflow-hidden animate-in fade-in duration-500 font-['Inter']">
        {isGenerating && (
          <div className="fixed inset-0 z-[300] bg-[#020205]/98 backdrop-blur-[40px] flex flex-col items-center justify-center p-8">
            <h3 className="text-lg md:text-2xl font-black text-white tracking-[0.4em] uppercase italic">MATERIALIZANDO...</h3>
          </div>
        )}

        {/* DESKTOP PREVIEW */}
        {!isMobile && (
          <div className="hidden lg:flex lg:w-[45%] h-full flex items-center justify-center relative p-12 perspective-[3000px] bg-black/40 border-r border-white/5">
            <div className="bg-[#1A1A1E] rounded-[74px] p-2 shadow-2xl border border-white/10 rotate-y-[-12deg] translate-x-44"><div className="w-[380px] h-[800px] bg-[#010102] rounded-[64px] overflow-hidden relative"><img src={customizing.image} className="w-full h-full object-cover grayscale-[0.2]" alt="LP" /></div></div>
          </div>
        )}

        <div className="flex-1 flex flex-col h-full bg-[#08080A]/98 backdrop-blur-3xl relative z-20">
          <div className="flex-1 overflow-y-auto px-4 md:px-20 py-6 md:py-16 no-scrollbar">
            <div className={`w-full max-w-xl mx-auto flex flex-col ${isMobile ? 'space-y-4' : 'space-y-12'}`}>
              <div className="flex items-center justify-between">
                <button onClick={() => setCustomizing(null)} className="flex items-center gap-3 text-[9px] font-black text-gray-700 uppercase tracking-[0.4em] hover:text-white transition-all italic font-mono"><ChevronLeft size={16} /> VOLTAR</button>
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-purple-400 italic">ETAPA {currentStep} / {totalSteps}</div>
              </div>
              <h2 className="text-[26px] md:text-[48px] font-black text-white tracking-tighter leading-[0.9] italic uppercase font-['Syne']">
                {currentStep === 1 && <><span className="text-purple-500">Sua</span> Ideia</>}
                {currentStep > 1 && currentStep < totalSteps && <><span className="text-cyan-500">Fase</span> {currentStep}</>}
                {currentStep === totalSteps && <><span className="text-indigo-500">Criar</span> Agora</>}
              </h2>
              <div className="flex-1 space-y-4">
                {isMobile ? (
                  /* --- MOBILE GROUPED WIZARD (3+ ELEMENTS PER STEP) --- */
                  <>
                    {currentStep === 1 && (
                      <div className="space-y-3 animate-in slide-in-from-right-4 duration-500">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Type size={12} /> 01 Headline Impacto</label><input type="text" placeholder="Frase principal..." value={formData.appName} onChange={(e) => updateField('appName', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Flag size={12} /> 02 Objetivo LP</label><input type="text" placeholder="O que converter?" value={formData.objective} onChange={(e) => updateField('objective', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Layers size={12} /> 03 Nicho Segmento</label><input type="text" placeholder="Ex: Info-Produto" value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={inputStyle} /></div>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="space-y-3 animate-in slide-in-from-right-4 duration-500">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Users size={12} /> 04 Público Alvo</label><input type="text" placeholder="Ex: Empresários" value={formData.audience} onChange={(e) => updateField('audience', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Target size={12} /> 05 Dor Principal</label><input type="text" placeholder="Problema que resolve..." value={formData.mainBenefit} onChange={(e) => updateField('mainBenefit', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Monitor size={12} /> 06 Menu Estrutura</label>
                          <div className="grid grid-cols-2 gap-2">{['Header Fixo', 'Hambúrguer', 'Minimal', 'Landing'].map(p => <button key={p} onClick={() => updateField('platform', p)} className={`py-2.5 rounded-lg text-[9px] font-black border transition-all ${formData.platform === p ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/5 text-gray-500'}`}>{p}</button>)}</div>
                        </div>
                      </div>
                    )}
                    {currentStep === 3 && (
                      <div className="space-y-3 animate-in slide-in-from-right-4 duration-500">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><PhoneIcon size={12} /> 07 Telas Adicionais</label><input type="text" value={formData.pages} onChange={(e) => updateField('pages', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Palette size={12} /> 08 Estilo Design</label><div className="grid grid-cols-2 gap-2">{['Modern Glass', 'Dark Elite', 'Clean Pro', 'Apple'].map(s => <button key={s} onClick={() => updateField('designStyle', s)} className={`py-2.5 rounded-lg text-[10px] font-black border transition-all ${formData.designStyle === s ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/5 text-gray-500'}`}>{s}</button>)}</div></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3"><label className={labelStyle}><Pipette size={12} /> 09 Tema Global</label>
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
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Type size={12} /> Headline</label><input type="text" placeholder="Headline de impacto" value={formData.appName} onChange={(e) => updateField('appName', e.target.value)} className={inputStyle} /></div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Flag size={12} /> Objetivo</label><input type="text" placeholder="O que deseja converter?" value={formData.objective} onChange={(e) => updateField('objective', e.target.value)} className={inputStyle} /></div>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Palette size={12} /> Estilo Visual</label><div className="grid grid-cols-2 gap-2">{['Modern Glass', 'Dark Elite', 'Clean Pro', 'Apple Like'].map(s => <button key={s} onClick={() => updateField('designStyle', s)} className={`py-3 rounded-lg text-[10px] font-black border transition-all ${formData.designStyle === s ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/5 text-gray-500'}`}>{s}</button>)}</div></div>
                    )}
                    {currentStep === 3 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Layers size={12} /> Nicho</label><input type="text" placeholder="Ex: Info-Produto" value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={inputStyle} /></div>
                    )}
                    {currentStep === 4 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Users size={12} /> Público-Alvo</label><input type="text" placeholder="Ex: Empresários" value={formData.audience} onChange={(e) => updateField('audience', e.target.value)} className={inputStyle} /></div>
                    )}
                    {currentStep === 5 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Target size={12} /> Dor Principal</label><input type="text" placeholder="Problema resolvido..." value={formData.mainBenefit} onChange={(e) => updateField('mainBenefit', e.target.value)} className={inputStyle} /></div>
                    )}
                    {currentStep === 6 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4"><label className={labelStyle}><Monitor size={12} /> Telas Extras</label><input type="text" value={formData.pages} onChange={(e) => updateField('pages', e.target.value)} className={inputStyle} /></div>
                    )}
                    {currentStep === 7 && (
                      <div className="space-y-6">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6">
                          <label className={labelStyle}><CpuIcon size={12} /> Engine</label>
                          <div className="grid grid-cols-2 gap-2">{aiPlatforms.map(p => <button key={p.name} onClick={() => updateField('aiPlatform', p.name)} className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${formData.aiPlatform === p.name ? 'bg-purple-600/10 border-purple-500 shadow-xl' : 'bg-white/[0.02] text-gray-600'}`}>{p.icon}<span className="text-[8px] font-black uppercase">{p.name}</span></button>)}</div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="px-6 md:px-20 py-6 md:py-8 bg-black/40 border-t border-white/5 flex items-center justify-between shrink-0">
            {currentStep > 1 ? <button onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center gap-3 text-[9px] font-black text-gray-600 hover:text-white transition-colors italic font-mono"><ChevronLeft size={16} /> VOLTAR</button> : <div className="opacity-20 flex items-center gap-2"><ShieldCheck size={16} className="text-purple-500" /><span className="text-[8px] font-black text-white uppercase font-mono">OK_</span></div>}
            <button onClick={() => currentStep === totalSteps ? handleFinalize() : setCurrentStep(currentStep + 1)} className="flex items-center gap-4 px-8 py-4 rounded-full font-black text-[10px] md:text-[12px] uppercase tracking-[0.4em] bg-white text-black hover:scale-105 active:scale-95 transition-all italic shadow-2xl"><span>{currentStep === totalSteps ? 'FORJAR' : 'PRÓXIMO'}</span><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col animate-in fade-in duration-1000 max-w-[1400px] mx-auto w-full px-4 md:px-6 min-h-screen">
      <div className="flex flex-col items-center pt-8 pb-10 w-full relative z-20">
        <div className="space-y-4 text-center px-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Esqueletos de Alta Conversão</span>
          </div>
          <h2 className="text-[32px] md:text-[64px] font-black text-white tracking-tighter leading-[0.9] italic uppercase antialiased pr-2">
            Esqueletos <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white pr-4">Elite</span>
          </h2>
        </div>
      </div>
      <div className="flex flex-col relative z-20 w-full">
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-4 border-y border-white/[0.05] bg-white/[0.01] mb-8">
          {CATEGORIES.map((cat) => <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-5 py-2 rounded-full text-[8px] md:text-[9px] font-black tracking-widest transition-all uppercase border whitespace-nowrap ${activeFilter === cat ? 'bg-purple-600 border-purple-500 text-white shadow-xl' : 'bg-transparent text-gray-600 border-white/5'}`}>{cat}</button>)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 pb-32">
          {filteredTemplates.map((template) => (
            <div key={template.id} onClick={() => handleStartCustomization(template)} className="group relative bg-[#0F0F12] border border-white/[0.08] rounded-[32px] overflow-hidden hover:border-purple-500/40 transition-all duration-700 cursor-pointer shadow-2xl flex flex-col aspect-[4/5]"><img src={template.image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-all duration-1000 grayscale-[0.4] group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-[#050507] p-8 md:p-12 flex flex-col justify-end"><div className="space-y-4"><div className="space-y-1"><span className="text-[8px] font-black text-purple-500 uppercase tracking-widest">{template.category}</span><h3 className="text-lg md:text-3xl font-black text-white tracking-tighter italic uppercase">{template.title}</h3></div><div className="flex items-center justify-between pt-2 opacity-0 group-hover:opacity-100 transition-all duration-700"><span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-[8px] font-black text-purple-400 uppercase italic">{template.badge}</span><div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-xl"><ArrowRight size={18} /></div></div></div></div></div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};

export default LandingPages;