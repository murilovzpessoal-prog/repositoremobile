import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Zap,
  ShieldCheck,
  ArrowRight,
  Info,
  Sparkles,
  Activity,
  Target,
  Cpu,
  Edit3,
  RefreshCw
} from 'lucide-react';

interface CopyResultProps {
  data: any;
  onBack: () => void;
  renderPhone: (previewMode: boolean, message?: string) => React.ReactNode;
  onEditPrompt?: () => void;
  hidePhone?: boolean;
}

const CopyResult: React.FC<CopyResultProps> = ({ data, onBack, renderPhone, onEditPrompt, hidePhone = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const getStrategicTemplate = () => {
    // Se a copy já foi gerada pelo IntelligenceEngine e salva no Supabase (passada via data), usamos ela.
    if (data.generated_copy || data.details?.generated_prompt) {
      // Como o motor retorna o "prompt enriquecido" que simula a copy final, 
      // vou limpar tags de instrução se existirem para exibir apenas o texto.
      const rawText = data.generated_copy || data.details?.generated_prompt || '';
      return rawText.replace(/\[.*?\]/g, '').replace(/.*?GERE A COPY FINAL ABAIXO:/s, '').trim();
    }

    const person = data.targetPerson || 'Responsável';
    const business = data.targetBusiness || 'Empresa';
    const userName = data.userName || 'Estrategista de Negócios';

    // Fallback para os templates originais caso não haja processamento inteligente (segurança)
    switch (data.status) {
      case 'qualificação':
        return `Olá, ${person}! 👋\n\nGostaria de aprofundar nossa conversa sobre a ${business}. Entendi o cenário atual, mas fiquei curioso sobre um ponto:\n\nComo vocês têm lidado hoje com a escala operacional? Percebi que o gargalo em empresas de ${data.marketSegment || 'seu segmento'} costuma estar na falta de processos automatizados.\n\nSe tivéssemos um protocolo que reduzisse seu esforço manual em 70%, o quão prioritário isso seria para vocês este trimestre?\n\nAtenciosamente,\n${userName}`;
      case 'negociação':
        return `Oi, ${person}! 👋\n\nAnalisei as métricas de viabilidade para implementarmos o motor de IA na ${business}.\n\nMontei uma proposta que foca exatamente no ROI que discutimos: ${data.promise || 'maior lucratividade e eficiência'}. Conseguimos integrar a solução ${data.solution || 'estratégica'} sem interromper seu fluxo atual.\n\nPodemos marcar 10 minutos amanhã para eu te mostrar como essa transição será feita de forma soberana?\n\nAtenciosamente,\n${userName}`;
      case 'fechado':
        return `Parabéns, ${person}! 🎉\n\nO protocolo para a ${business} foi ativado com sucesso. Já estamos materializando os primeiros passos da nossa parceria.\n\nQualquer dúvida, estou à disposição. Vamos escalar!\n\nAbraço,\n${userName}`;
      default:
        return `Olá, ${person}! 👋\n\n${data.hook || 'Estou entrando em contato pois tenho acompanhado o crescimento de vocês.'}\n\nPercebi que ${data.pain || 'existem oportunidades de otimização operacional'}. Isso é um gargalo comum em empresas do segmento de ${data.marketSegment || 'serviços'}, mas que pode ser resolvido com tecnologia.\n\nImagine se você tivesse um ${data.solution || 'novo motor de vendas'} que garantisse ${data.promise || 'escala e automação'}. \n\nFaria sentido para a ${data.targetBusiness} implementarmos esse protocolo?\n\nAtenciosamente,\n${userName}`;
    }
  };

  const generatedCopy = getStrategicTemplate();

  useEffect(() => {
    let i = 0;
    setIsTypingComplete(false);
    const interval = setInterval(() => {
      setDisplayText(generatedCopy.slice(0, i));
      i += 10; // Mantendo o efeito de digitação
      if (i > generatedCopy.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 5);
    return () => clearInterval(interval);
  }, [generatedCopy]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 md:space-y-12 animate-in fade-in duration-700 pb-32 max-w-[1600px] mx-auto w-full px-4 md:px-10 relative z-20">
      <div className="pt-4 space-y-2 md:space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
          <Sparkles size={12} className="text-purple-400" />
          <span className="text-[8px] md:text-[10px] font-black text-purple-400 uppercase tracking-widest italic">PROTOCOLO: {data.status?.toUpperCase() || 'PROSPECÇÃO'}</span>
        </div>
        <h1 className="text-[28px] md:text-[64px] font-black text-white tracking-tighter leading-none italic uppercase">
          Cópia <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white pr-4">Materializada.</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {[
          { icon: <Activity size={18} />, label: "Etapa", val: (data.status || 'Prospecção').toUpperCase(), color: "text-purple-400" },
          { icon: <Target size={18} />, label: "Alvo", val: data.targetBusiness || 'Lead', color: "text-emerald-400" },
          { icon: <Cpu size={18} />, label: "Engine", val: "IA_v4.2", color: "text-blue-400" },
          { icon: <ShieldCheck size={18} />, label: "Status", val: "ATIVO", color: "text-indigo-400" }
        ].map((item, idx) => (
          <div key={idx} className="bg-[#0F0F12] border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col space-y-2">
            <div className={item.color}>{item.icon}</div>
            <div className="min-w-0">
              <h4 className="text-[7px] md:text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">{item.label}</h4>
              <p className="text-white text-[10px] md:text-lg font-bold truncate italic">{item.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12">
        <div className={`${hidePhone ? 'lg:col-span-12 max-w-5xl mx-auto w-full' : 'lg:col-span-7'} space-y-6 order-1`}>
          <div className="bg-[#0A0A0C] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
            <div className="px-6 md:px-10 py-5 md:py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest italic">Script Estratégico</span>
                {isTypingComplete && <span className="ml-2 text-[8px] text-emerald-500 font-black flex items-center gap-1"><Edit3 size={10} /> EDITÁVEL</span>}
              </div>
              <button onClick={handleCopy} className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-[9px] md:text-[11px] font-black uppercase tracking-widest">{isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}<span>{isCopied ? 'COPIADO' : 'COPIAR'}</span></button>
            </div>
            <div className="p-6 md:p-14 min-h-[350px] md:min-h-[500px]">
              <textarea
                className="w-full h-full bg-transparent text-white text-[14px] md:text-xl font-medium leading-relaxed resize-none focus:outline-none placeholder-gray-800 font-sans italic no-scrollbar"
                value={displayText}
                onChange={(e) => setDisplayText(e.target.value)}
                spellCheck={false}
                rows={12}
              />
              {!isTypingComplete && <span className="inline-block w-2 h-4 md:h-6 bg-purple-500 ml-1 animate-pulse align-middle" />}
            </div>
            <div className="p-6 md:p-8 border-t border-white/5 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button onClick={onEditPrompt} className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-gray-400 px-6 py-3.5 rounded-xl font-black uppercase text-[9px] md:text-[11px] tracking-widest hover:text-white transition-all italic"><RefreshCw size={16} /><span>Editar Prompt</span></button>
              <button onClick={handleCopy} className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-[10px] md:text-[12px] tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all italic">SINCRONIZAR ENVIO</button>
            </div>
          </div>
        </div>

        {!hidePhone && (
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-2">
            <div className="w-full max-w-[320px] md:max-w-[380px] bg-[#1A1A1E] rounded-[64px] p-3 shadow-2xl relative border border-white/5">
              <div className="w-full aspect-[9/18.5] bg-[#010102] rounded-[52px] overflow-hidden flex flex-col relative border border-black">
                <div className="h-full w-full">{renderPhone(false, displayText)}</div>
              </div>
              <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30" />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-10"><button onClick={onBack} className="flex items-center gap-3 text-gray-700 hover:text-white transition-all text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] group italic"><ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />VOLTAR AO FUNIL_</button></div>
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};

export default CopyResult;