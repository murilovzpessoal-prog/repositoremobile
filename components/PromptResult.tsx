import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Zap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  FileCode,
  Binary,
  Smartphone,
  Target
} from 'lucide-react';

interface PromptResultProps {
  data: any;
  onBack: () => void;
}

const PromptResult: React.FC<PromptResultProps> = ({ data, onBack }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const promptContent = React.useMemo(() => {
    // 1. Prioridade Máxima: Prompt gerado pelo IntelligenceEngine (v3.0)
    if (data?.technical_prompt) return data.technical_prompt;
    if (data?.details?.technical_prompt) return data.details.technical_prompt;
    if (data?.cro_prompt) return data.cro_prompt;
    if (data?.details?.cro_prompt) return data.details.cro_prompt;

    // 2. Fallback de Luxo: Se por algum motivo o prompt não foi passado, gerar um briefing sênior on-the-fly
    const appName = data?.appName || data?.name || 'Protocol_Initialization';
    const engine = data?.aiPlatform || data?.platform || 'Lovable';

    return `### ARCHITECTURAL INITIALIZATION: ${appName.toUpperCase()} 🚀
[FALLBACK_PROTOCOL: SENIOR_BRIEFING]

#### 1. OVERVIEW
- **Project**: ${appName}
- **Engine**: ${engine}
- **Goal**: High-scale professional implementation.

#### 2. CORE STRUCTURE
- **Pages/Modules**: ${data?.pages || 'Core Dashboard, Auth Flow, Settings'}
- **Design Tokens**: ${data?.designStyle || 'Elite Glassmorphism'} / ${data?.colorPalette || 'Dark Mode'}
- **Target Niche**: ${data?.niche || 'Premium Enterprise'}

#### 3. INSTRUCTION
Execute a robust initialization focusing on scalability, clean code, and premium UI/UX. Ensure all Lucide icons are correctly implemented and the global state is synchronized.

[EXECUTE_COMMAND]`;
  }, [data]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(promptContent.slice(0, i));
      i += 85;
      if (i > promptContent.length) clearInterval(interval);
    }, 5);
    return () => clearInterval(interval);
  }, [promptContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 md:space-y-12 animate-in fade-in duration-1000 pb-32 max-w-6xl mx-auto w-full px-4">
      <div className="fixed inset-0 bg-[#050507] -z-10" />
      <div className="pt-4 space-y-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-1">
          <Sparkles size={10} className="text-purple-400" />
          <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Protocolo Sincronizado</span>
        </div>
        <h1 className="text-[24px] md:text-[64px] font-black text-white tracking-tighter leading-none italic uppercase">
          PROMPT <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white pr-2">PRONTO.</span>
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { icon: <ShieldCheck size={14} />, val: "Auth OK" },
          { icon: <Target size={14} />, val: "Sincronizado" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-2">
            <div className="text-purple-400">{item.icon}</div>
            <p className="text-white text-[9px] font-bold">{item.val}</p>
          </div>
        ))}
      </div>
      <div className="relative group max-w-5xl mx-auto w-full">
        <div className="relative bg-[#141417] border border-white/10 rounded-xl md:rounded-[1.2rem] overflow-hidden shadow-2xl">
          <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-[#1A1A1E]">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /><div className="w-2 h-2 rounded-full bg-yellow-500" /></div>
            <div className="flex items-center gap-2"><FileCode size={10} className="text-purple-400" /><span className="text-[8px] font-medium text-gray-400 font-mono italic">Prompt.md</span></div>
            <button onClick={handleCopy} className="text-gray-500 hover:text-white transition-all">{isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}</button>
          </div>
          <div className="flex min-h-[250px] max-h-[400px] overflow-y-auto no-scrollbar bg-[#0D0D0F]">
            <div className="flex-1 p-5 md:p-10"><pre className="text-white text-xs md:text-[16px] font-medium leading-[1.6] whitespace-pre-wrap font-mono opacity-90">{displayText}</pre></div>
          </div>
          <div className="p-4 border-t border-white/5 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button onClick={handleCopy} className="w-full sm:w-auto bg-white text-black px-6 py-2.5 rounded-lg font-black uppercase text-[9px] tracking-widest italic shadow-xl">COPIAR PROTOCOLO</button>
            <button
              onClick={() => {
                const urls: Record<string, string> = {
                  'Lovable': 'https://lovable.dev',
                  'Firebase Studio': 'https://studio.firebase.google.com',
                  'Bolt': 'https://bolt.new',
                  'Replit': 'https://replit.com',
                  'Lazy': 'https://lazy.ai',
                  'v0.dev': 'https://v0.dev',
                  'Base44': 'https://app.base44.com',
                  'Mocha': 'https://getmocha.com',
                  'Genspark': 'https://genspark.ai',
                  'AI Studio': 'https://aistudio.google.com'
                };
                const targetUrl = urls[data?.aiPlatform] || urls[data?.details?.aiPlatform] || 'https://lovable.dev';
                window.open(targetUrl, '_blank');
              }}
              className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-lg font-black uppercase text-[9px] tracking-widest italic"
            >
              ABRIR ENGINE
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4"><button onClick={onBack} className="flex items-center gap-2 text-gray-700 hover:text-white transition-all text-[9px] font-black uppercase tracking-[0.2em] italic"><ArrowRight size={12} className="rotate-180" />RETORNAR</button></div>
    </div>
  );
};

export default PromptResult;