import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  ChevronRight,
  ChevronDown,
  Search,
  MessageSquare,
  Zap,
  ShieldCheck
} from 'lucide-react';

interface Question {
  id: number;
  title: string;
  answer: string;
}

const QUESTIONS: Question[] = [
  { 
    id: 1, 
    title: 'O que é a Nexbuild?', 
    answer: 'A Nexbuild é um ecossistema soberano de engenharia e materialização de softwares. Nossa plataforma utiliza Inteligência Artificial de ponta para transformar ideias de negócios em estruturas técnicas prontas para o mercado.' 
  },
  { 
    id: 2, 
    title: 'Para quem a Nexbuild é indicada?', 
    answer: 'É indicada para founders, engenheiros de software, agências e empreendedores que desejam construir produtos digitais de alta performance.' 
  },
  { 
    id: 3, 
    title: 'A Nexbuild é um software ou uma plataforma SaaS?', 
    answer: 'A Nexbuild é uma plataforma SaaS que fornece um conjunto de ferramentas inteligentes para que você possa criar, gerenciar e evoluir seus próprios softwares.' 
  },
  { 
    id: 4, 
    title: 'O que significa “materializar um SaaS”?', 
    answer: 'Materializar significa tirar a ideia do campo abstrato e transformá-la em realidade técnica através de Prompts Estruturados otimizados para engines de código.' 
  },
];

const Help: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex-1 flex flex-col items-center min-h-screen py-8 px-4 md:py-12 md:px-6 animate-in fade-in duration-700">
      <div className="text-center space-y-3 mb-8 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-1">
          <ShieldCheck size={10} className="text-purple-400" />
          <span className="text-[8px] md:text-[9px] font-black text-purple-300 uppercase tracking-widest italic">Nexbuild_Support</span>
        </div>
        <h2 className="text-[24px] md:text-[48px] font-black text-white tracking-tighter leading-none italic uppercase">
          Central de <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400 pr-2">Ajuda</span>
        </h2>
        <p className="text-slate-500 text-xs md:text-lg font-medium italic opacity-80 max-w-xl mx-auto px-4">
          Sincronize sua mente com o funcionamento da plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-5xl mb-10 md:mb-16">
        {[
          { icon: <HelpCircle size={20} md:size={32} />, label: 'Ticket', sub: 'Suporte 24h', color: 'blue' },
          { icon: <MessageCircle size={20} md:size={32} />, label: 'WhatsApp', sub: 'Direto', color: 'emerald', link: 'https://www.contate.me/nexbuild' },
          { icon: <Mail size={20} md:size={32} />, label: 'E-mail', sub: 'Operacional', color: 'purple' }
        ].map((card, i) => (
          <div key={i} className="group bg-[#0D0D0F] border border-white/5 rounded-[20px] md:rounded-[32px] p-5 md:p-10 flex flex-col items-center text-center space-y-3 md:space-y-6 hover:border-white/10 transition-all cursor-pointer shadow-2xl relative overflow-hidden">
            <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-500 border border-${card.color}-500/20`}>
              {card.icon}
            </div>
            <div>
              <h4 className="text-sm md:text-lg font-bold text-white tracking-tight uppercase italic">{card.label}</h4>
              <p className="text-[8px] md:text-[11px] text-gray-500 font-bold uppercase tracking-widest">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-5xl bg-[#0D0D0F] border border-white/5 rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl mb-32">
        <div className="p-5 md:p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-3">
             <MessageSquare size={16} md:size={20} className="text-purple-500" />
             <h3 className="text-base md:text-xl font-black text-white tracking-tight uppercase italic">FAQ_</h3>
          </div>
        </div>
        
        <div className="divide-y divide-white/5">
          {QUESTIONS.map((q) => (
            <div key={q.id}>
              <button onClick={() => toggleQuestion(q.id)} className="w-full flex items-center justify-between p-5 md:p-8 hover:bg-white/[0.02] transition-all text-left">
                <span className={`text-xs md:text-base font-bold tracking-tight ${expandedId === q.id ? 'text-purple-400' : 'text-slate-400'}`}>{q.title}</span>
                <div className={`w-7 h-7 md:w-10 md:h-10 rounded-xl bg-white/5 flex items-center justify-center ${expandedId === q.id ? 'bg-purple-600 text-white rotate-180' : 'text-gray-600'}`}>
                  <ChevronDown size={14} md:size={20} />
                </div>
              </button>
              {expandedId === q.id && (
                <div className="px-5 md:px-8 pb-5 md:pb-10 animate-in slide-in-from-top-2 duration-300">
                  <div className="p-4 md:p-8 bg-white/[0.01] border border-white/5 rounded-xl md:rounded-[24px] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-600/40" />
                    <p className="text-slate-400 text-[11px] md:text-base leading-relaxed font-medium italic">{q.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;