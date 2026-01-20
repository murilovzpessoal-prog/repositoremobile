import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  X, 
  Check, 
  Trash2, 
  ShieldCheck, 
  Sparkles,
  Zap,
  ChevronRight,
  Edit3,
  Ticket,
  Link as LinkIcon,
  Copy,
  ArrowLeft,
  DollarSign,
  Gift,
  BarChart3,
  UserCheck2,
  Users2,
  Activity,
  Star,
  Shield,
  ArrowRight,
  Share2,
  Command,
  MousePointer2,
  FileCode,
  Network,
  Cpu,
  Key,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { TeamMember } from '../App';

interface PromoPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular: boolean;
  isLifetime: boolean;
  buttonText: string;
}

const PROMO_PLANS: PromoPlan[] = [
  {
    id: 'p1',
    title: "PLANO MENSAL",
    description: "A porta de entrada ideal para quem busca resultados imediatos e flexibilidade total.",
    price: "147",
    features: [
      "Gerador de SaaS Premium",
      "Suporte exclusivo",
      "Prospecção Inteligente",
      "Aulas exclusivas"
    ],
    isPopular: false,
    isLifetime: false,
    buttonText: "Gerar Link"
  },
  {
    id: 'p2',
    title: "PLANO VITALÍCIO",
    description: "A escolha definitiva. Um único investimento para garantir sua presença eterna na elite.",
    price: "297",
    features: [
      "Gerador de SaaS Premium",
      "Suporte exclusivo",
      "Prospecção Inteligente",
      "Aulas exclusivas",
      "Acesso vitalício"
    ],
    isPopular: true,
    isLifetime: true,
    buttonText: "Gerar Link"
  }
];

const PricingCard: React.FC<{ 
  plan: PromoPlan; 
  onGenerate: (p: PromoPlan) => void;
}> = ({ plan, onGenerate }) => {
  return (
    <div className={`relative flex flex-col p-8 md:p-12 rounded-[2.5rem] transition-all duration-700 hover:translate-y-[-8px] group overflow-hidden h-full ${
      plan.isPopular 
        ? 'bg-[#0F0F12]/80 border border-purple-500/20 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.7)]' 
        : 'bg-[#0F0F12]/40 border border-white/5 backdrop-blur-xl'
    }`}>
      {/* Glossy Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      {plan.isPopular && (
        <div className="absolute -right-14 top-8 rotate-45 bg-purple-600 text-white text-[9px] font-black px-16 py-1.5 shadow-2xl z-20 tracking-widest uppercase italic">
          PREMIUM
        </div>
      )}

      <div className="relative z-10 mb-8 md:mb-10">
        <div className="flex items-center gap-2.5 mb-6">
          <div className={`w-2 h-2 rounded-full ${plan.isPopular ? 'bg-purple-500' : 'bg-zinc-700'}`} />
          <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-black text-zinc-500 italic font-mono">{plan.title}</h3>
        </div>
        
        <p className="text-zinc-500 text-xs md:text-sm mb-8 md:mb-10 leading-relaxed font-medium max-w-[280px] italic">
          {plan.description}
        </p>
        
        <div className="flex items-baseline gap-2 md:gap-3">
          <span className="text-xl md:text-2xl font-bold text-zinc-600">R$</span>
          <span className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
            {plan.price}
          </span>
          <span className="text-zinc-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] italic ml-1">
            {plan.isLifetime ? 'ÚNICO' : '/ MÊS'}
          </span>
        </div>
      </div>

      <div className="relative z-10 space-y-4 md:space-y-5 mb-10 md:mb-14 flex-1">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-4 text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">
            <div className={`flex-shrink-0 w-5 md:w-6 h-5 md:h-6 rounded-full flex items-center justify-center border ${
              plan.isPopular ? 'border-purple-500/30 bg-purple-500/5' : 'border-zinc-800 bg-zinc-900/30'
            }`}>
              <Check className={`w-2.5 md:w-3 h-2.5 md:h-3 ${plan.isPopular ? 'text-purple-400' : 'text-zinc-700'}`} />
            </div>
            <span className="text-[13px] md:text-[14px] font-bold tracking-tight italic">{feature}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={() => onGenerate(plan)}
        className={`relative z-10 w-full py-5 md:py-6 rounded-2xl font-black transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden group/btn shadow-2xl ${
          plan.isPopular 
            ? 'bg-white text-black hover:bg-white/90' 
            : 'bg-[#16161A] border border-white/5 text-white hover:bg-[#1E1E24] hover:border-white/10'
        }`}
      >
        <span className="relative z-10 flex items-center gap-3 uppercase tracking-[0.25em] text-[10px] md:text-[11px] italic">
          {plan.buttonText}
          <ArrowRight className={`w-4 h-4 group-hover/btn:translate-x-1 transition-transform ${plan.isPopular ? 'text-black' : 'text-white'}`} />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </button>
    </div>
  );
};

interface TeamProps {
  members: TeamMember[];
  onUpdateMembers: (newTeam: TeamMember[]) => void;
}

const Team: React.FC<TeamProps> = ({ members, onUpdateMembers }) => {
  const [view, setView] = useState<'list' | 'promos'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [generatedLink, setGeneratedLink] = useState<{ planId: string; url: string } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });

  const blurEmail = (email: string) => {
    if (!email.includes('@')) return email;
    const [user, domain] = email.split('@');
    if (user.length <= 3) return `***@${domain}`;
    return `${user.substring(0, 3)}****@${domain}`;
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;
    
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'Ativo'
    };
    onUpdateMembers([...members, newMember]);
    setFormData({ name: '', email: '', role: '' });
    setIsAddModalOpen(false);
  };

  const handleGenerateLink = (plan: PromoPlan) => {
    let url = '';
    if (plan.id === 'p1') {
      url = 'https://pay.cakto.com.br/hnktu4g';
    } else if (plan.id === 'p2') {
      url = 'https://pay.cakto.com.br/3ekn3j2_729847';
    } else {
      const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
      url = `https://nexbuild.ai/invite/${randomHash}?plan=${plan.id}`;
    }
    setGeneratedLink({ planId: plan.id, url });
    setTimeout(() => {
      const el = document.getElementById('link-result');
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink.url);
    setIsCopied(false);
    setTimeout(() => setIsCopied(true), 10);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const labelStyle = "text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 block";
  const inputStyle = "w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-800";

  if (view === 'promos') {
    return (
      <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-700 pb-40 max-w-6xl mx-auto w-full px-4 relative overflow-visible">
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-70">
          <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] bg-purple-900/10 blur-[180px] rounded-full" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[60%] bg-blue-900/10 blur-[180px] rounded-full" />
        </div>

        <div className="flex items-center justify-between pt-10 mb-10 md:mb-16 border-b border-white/5 pb-8">
          <button 
            onClick={() => setView('list')}
            className="flex items-center gap-3 text-[10px] md:text-[11px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.4em] transition-all group italic font-mono"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> 
            // VOLTAR
          </button>
          
          <div className="flex items-center gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-md">
            <Zap size={12} className="text-purple-500 fill-purple-500" />
            <span className="text-[8px] md:text-[9px] font-black text-zinc-400 uppercase tracking-widest italic">Acesso Master</span>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-6 mb-12 md:mb-20">
          <div className="space-y-4 w-full">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic uppercase font-['Montserrat'] antialiased">
              Links Promocionais
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-purple-500/40" />
              <p className="text-purple-400 text-[9px] font-black uppercase tracking-[0.6em] italic font-mono animate-pulse">
                Convites exclusivos_
              </p>
            </div>
          </div>
          <p className="text-slate-500 text-base md:text-xl font-medium italic opacity-60 max-w-2xl leading-relaxed">
            Gere um link com valor reduzido para convidar amigos, parceiros ou familiares para usar o software.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24 max-w-5xl mx-auto w-full">
           {[
             { step: "01", icon: <MousePointer2 size={16} />, title: "Selecione", desc: "Escolha o plano ideal." },
             { step: "02", icon: <FileCode size={16} />, title: "Gere o Link", desc: "Crie o convite." },
             { step: "03", icon: <Share2 size={16} />, title: "Compartilhe", desc: "Envie o acesso." },
             { step: "04", icon: <Zap size={16} />, title: "Ativo", desc: "Ativação instantânea." }
           ].map((item, idx) => (
             <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-[24px] md:rounded-[32px] p-6 md:p-8 space-y-4 hover:border-purple-500/20 transition-all group relative">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-purple-400 transition-all">
                      {item.icon}
                   </div>
                   <span className="text-[8px] md:text-[9px] font-black text-white/20 uppercase tracking-widest font-mono italic">{item.step}</span>
                </div>
                <div className="space-y-1">
                   <h4 className="text-white font-bold text-xs uppercase italic tracking-tight">{item.title}</h4>
                   <p className="text-[10px] text-zinc-500 font-medium leading-relaxed italic">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto items-stretch w-full relative z-10">
          {PROMO_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onGenerate={handleGenerateLink} />
          ))}
        </main>

        {generatedLink && (
          <div id="link-result" className="animate-in slide-in-from-top-4 duration-500 max-w-4xl mx-auto w-full z-20 mt-12 md:mt-16">
             <div className="bg-[#0A0A0C]/90 backdrop-blur-2xl border border-purple-500/30 rounded-[2rem] md:rounded-[2.5rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-6">
                   <div className="w-12 md:w-14 h-12 md:h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Key size={22} strokeWidth={2} />
                   </div>
                   <div className="space-y-0.5">
                      <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-black text-zinc-500 italic">CREDENTIAL</h3>
                      <p className="text-zinc-500 text-xs md:text-sm font-medium italic opacity-85">Token de acesso materializado.</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 bg-black/50 border border-white/5 rounded-2xl pl-6 pr-2 py-2 w-full md:w-auto shadow-inner">
                   <span className="text-xs md:text-[13px] font-mono text-purple-400/80 truncate max-w-[140px] md:max-w-[260px]">{generatedLink.url}</span>
                   <button 
                     onClick={handleCopyLink}
                     className="shrink-0 flex items-center gap-3 text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.2em] bg-purple-600 px-5 md:px-6 py-3 md:py-3.5 rounded-xl hover:bg-purple-500 transition-all active:scale-95 italic"
                   >
                     {isCopied ? <Check size={14} /> : <Copy size={14} />}
                     <span>COPIAR</span>
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col space-y-12 animate-in fade-in duration-700 pb-32 max-w-6xl mx-auto w-full px-4">
      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12 border-b border-white/5 pb-12 md:pb-24 pt-6 md:pt-10">
        <div className="space-y-6 md:space-y-10 flex-1">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg w-fit">
             <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#A855F7]" />
             <span className="text-[8px] md:text-[9px] font-black text-purple-300 uppercase tracking-widest italic">PAINEL DA EQUIPE</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none italic uppercase">Equipe</h2>
            <p className="text-slate-500 text-base md:text-lg font-medium italic opacity-60 max-w-xl leading-relaxed">
              Gerencie, acompanhe e expanda sua equipe dentro do software.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
           <button 
            onClick={() => setView('promos')}
            className="flex items-center justify-center gap-2.5 bg-white/[0.03] border border-white/10 text-gray-300 px-6 py-4 rounded-xl font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:text-emerald-400 hover:border-emerald-500/30 transition-all italic"
           >
              <Ticket size={16} className="text-emerald-500" /> 
              <span>Links Promocionais</span>
           </button>
           <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-4 bg-white text-black px-8 py-4 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all italic"
           >
              <UserPlus size={18} /> 
              <span>Adicionar membro</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { icon: <Users2 size={20} />, label: "Membros", val: members.length, color: "text-blue-400", bg: "bg-blue-500/5" },
          { icon: <UserCheck2 size={20} />, label: "Ativos", val: members.filter(m => m.status === 'Ativo').length, color: "text-emerald-400", bg: "bg-emerald-500/5" },
          { icon: <Gift size={20} />, label: "Promos", val: "03", color: "text-purple-400", bg: "bg-purple-500/5" },
          { icon: <BarChart3 size={20} />, label: "Crescimento", val: "+24%", color: "text-indigo-400", bg: "bg-indigo-500/5" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[24px] md:rounded-3xl p-5 md:p-6 flex flex-col space-y-4">
            <div className={`w-10 h-10 rounded-xl ${item.bg} border border-white/5 flex items-center justify-center ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <h4 className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.label}</h4>
              <p className="text-white text-xl md:text-2xl font-black italic tracking-tight">{item.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        {members.map((member, mIdx) => (
          <div 
            key={member.id} 
            className="group flex flex-col md:flex-row md:items-center justify-between bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 rounded-[24px] md:rounded-[32px] p-6 md:p-8 hover:border-purple-500/30 transition-all duration-500 shadow-xl"
          >
            <div className="flex items-center gap-5 md:gap-6 flex-1 min-w-0">
               <div className="w-12 md:w-16 h-12 md:h-16 rounded-xl md:rounded-[22px] bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 overflow-hidden shrink-0">
                  {member.avatar ? <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" /> : <span className="text-xl md:text-2xl font-black uppercase text-white/20">{member.name[0]}</span>}
               </div>
               <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                     <h4 className="text-white font-bold text-base md:text-xl tracking-tight uppercase truncate">{member.name}</h4>
                     <div className={`px-2 py-0.5 rounded-md border text-[8px] font-black uppercase tracking-widest ${member.status === 'Ativo' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}>
                        {member.status}
                     </div>
                  </div>
                  <p className="text-gray-600 font-mono text-[10px] md:text-xs tracking-wider mt-1 truncate">
                    {blurEmail(member.email)}
                  </p>
               </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-6 md:gap-10 mt-6 md:mt-0">
              <div className="flex flex-col items-start md:items-end">
                <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-1">Função</span>
                <span className="text-[10px] md:text-[11px] font-black text-white/50 uppercase italic group-hover:text-white transition-colors">{member.role}</span>
              </div>
              <ChevronRight size={18} className="text-gray-800 group-hover:text-purple-500 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#0A0A0C] border border-white/10 rounded-[32px] w-full max-w-lg p-8 md:p-10 space-y-6 md:space-y-8 shadow-2xl relative">
             <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-xl font-bold text-white tracking-tight uppercase italic">Novo Membro</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
             </div>
             <form onSubmit={handleAddMember} className="space-y-5 md:space-y-6">
                <div className="space-y-1"><label className={labelStyle}>Nome</label><input type="text" required placeholder="Nome do colaborador" className={inputStyle} value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} /></div>
                <div className="space-y-1"><label className={labelStyle}>Email</label><input type="email" required placeholder="email@exemplo.com" className={inputStyle} value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} /></div>
                <div className="space-y-1"><label className={labelStyle}>Função</label><input type="text" required placeholder="Ex: Designer" className={inputStyle} value={formData.role} onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))} /></div>
                <button type="submit" className="w-full py-4 md:py-5 rounded-2xl bg-white text-black font-black text-[11px] uppercase tracking-[0.3em] transition-all italic flex items-center justify-center gap-3 mt-4">Materializar Membro</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;