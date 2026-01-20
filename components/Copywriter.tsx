import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  MessageSquare,
  Smartphone,
  ChevronDown,
  Instagram,
  Linkedin,
  Mail,
  Send,
  Phone,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Plus,
  MoreVertical,
  Clock,
  User,
  Target,
  Sparkles,
  Command,
  Terminal,
  Paperclip,
  Smile,
  Mic,
  Camera as CameraIcon,
  Image as ImageIcon,
  Heart,
  Trash2,
  ArrowRightLeft,
  X,
  LayoutGrid,
  Type as FontIcon,
  Palette,
  Settings,
  Rocket,
  Edit3,
  Cpu,
  Bookmark,
  Share2,
  ShieldCheck,
  Check,
  Video,
  Info as InfoIcon,
  Search as SearchIcon,
  Menu,
  AtSign,
  ArrowLeft
} from 'lucide-react';
import CopyResult from './CopyResult';
import { IntelligenceEngine } from '../src/lib/intelligence';
import { supabase } from '../src/lib/supabase';

export interface Lead {
  id: string;
  businessName: string;
  ownerName: string;
  initials: string;
  avatarBg: string;
  channel: 'whatsapp' | 'instagram' | 'linkedin' | 'email';
  status: 'prospecção' | 'qualificação' | 'negociação' | 'fechado';
  lastInter: string;
  lastMessage: string;
  hasMessage?: boolean;
  generated_copy?: string;
}

interface CopywriterProps {
  leads: Lead[];
  onUpdateLeads: (leads: Lead[]) => void;
}

const Copywriter: React.FC<CopywriterProps> = ({ leads, onUpdateLeads }) => {
  const [view, setView] = useState<'new' | 'leads' | 'result'>('new');
  const [activeFollowUp, setActiveFollowUp] = useState<Lead | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [form, setForm] = useState({
    userName: '', targetBusiness: '', targetPerson: '', marketSegment: '', customSegment: '', channel: 'whatsapp' as Lead['channel'], hook: '', pain: '', solution: '', promise: ''
  });

  const channels = [
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={18} /> },
    { id: 'instagram', label: 'Instagram', icon: <Instagram size={18} /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={18} /> },
    { id: 'email', label: 'Email', icon: <Mail size={18} /> }
  ];

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleMaterialize = async () => {
    setIsGenerating(true);
    setProgress(10);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // Gerar prompt profissional inteligente
      const prompt = await IntelligenceEngine.generateProfessionalPrompt(user.id, {
        feature: 'copy',
        data: form
      });

      // Salvar como um novo projeto no banco para persistência histórica
      await supabase.from('projects').insert({
        user_id: user.id,
        type: 'copy',
        name: form.targetBusiness || 'Nova Copy',
        objective: form.solution,
        details: { ...form, generated_prompt: prompt }
      });

      // Simulação visual de progresso (mantendo o feeling do design original)
      let current = 10;
      const interval = setInterval(() => {
        current += 5;
        setProgress(current);
        if (current >= 100) {
          clearInterval(interval);
          const newLead: Lead = {
            id: Date.now().toString(),
            businessName: form.targetBusiness || 'Nova Empresa',
            ownerName: form.targetPerson || 'Responsável',
            initials: (form.targetPerson || 'N')[0].toUpperCase(),
            avatarBg: 'bg-purple-500/20 text-purple-400',
            channel: form.channel,
            status: 'prospecção',
            lastInter: 'Agora',
            lastMessage: `Abordagem de ${form.solution || 'Serviço'}`,
            generated_copy: prompt
          };
          onUpdateLeads([newLead, ...leads]);
          setForm(prev => ({ ...prev, generated_copy: prompt } as any));
          setIsGenerating(false);
          setView('result');
        }
      }, 40);

    } catch (error: any) {
      alert("Houve um erro na motor de inteligência: " + error.message);
      setIsGenerating(false);
    }
  };

  const handleOpenFollowUp = (lead: Lead) => {
    setIsGenerating(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveFollowUp(lead);
          setIsGenerating(false);
          setView('result');
        }, 300);
      }
    }, 30);
  };

  const moveLead = (id: string, newStatus: Lead['status']) => {
    onUpdateLeads(leads.map(l => l.id === id ? { ...l, status: newStatus, lastInter: 'Agora' } : l));
  };

  const labelStyle = "text-[10px] font-mono font-medium text-slate-400 tracking-[0.2em] uppercase antialiased mb-3 block";
  const inputStyle = "w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-purple-500/30 transition-all shadow-inner";

  const renderPhoneContent = (previewMode = true, customLead?: Lead, customMessage?: string) => {
    const activeData = previewMode
      ? { person: form.targetPerson || 'Responsável', business: form.targetBusiness || 'Empresa', initials: (form.targetPerson || 'R')[0].toUpperCase(), channel: form.channel }
      : { person: customLead?.ownerName || form.targetPerson || 'Lead', business: customLead?.businessName || form.targetBusiness || 'Empresa', initials: (customLead?.ownerName || form.targetPerson || 'L')[0].toUpperCase(), channel: customLead?.channel || form.channel };

    const fullMessage = customMessage || (view === 'result' ? `Olá, ${activeData.person}! 👋\n\nSincronizando próximo passo estratégico.` : `Olá, ${activeData.person}! 👋\n\nIniciando materialização para a ${activeData.business}...`);

    if (activeData.channel === 'whatsapp') {
      return (
        <div className="flex flex-col h-full bg-[#0b141a] relative overflow-hidden font-sans select-none animate-in fade-in duration-500">
          <div className="bg-[#1f2c33] pt-12 pb-3 px-3 flex items-center gap-2 shrink-0 z-20 shadow-md">
            <ChevronLeft size={22} className="text-[#8696a0] shrink-0 cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center shrink-0 overflow-hidden text-white font-bold text-lg border border-white/5 shadow-sm">
              {activeData.initials}
            </div>
            <div className="flex flex-col min-w-0 flex-1 ml-1">
              <h6 className="text-[15px] font-bold text-[#e9edef] truncate leading-tight">{activeData.person}</h6>
              <span className="text-[11px] text-[#8696a0] leading-tight font-medium uppercase tracking-tight">ONLINE</span>
            </div>
            <div className="flex items-center gap-5 text-[#8696a0] shrink-0 ml-1 pr-1">
              <Phone size={18} fill="currentColor" className="opacity-80" />
              <MoreVertical size={20} className="opacity-80" />
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto no-scrollbar bg-[#0b141a] space-y-4 relative z-10 flex flex-col pt-6">
            <div className="self-center bg-[#182229] text-[#8696a0] text-[10px] px-3 py-1 rounded-lg uppercase tracking-wider font-bold mb-4 border border-white/5">HOJE</div>
            <div className="relative self-start bg-[#005c4b] text-[#e9edef] p-3 rounded-lg rounded-tl-none max-w-[85%] text-[13px] leading-relaxed shadow-sm animate-in fade-in slide-in-from-left-2 duration-500">
              <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-[#005c4b] border-l-[10px] border-l-transparent" />
              <div className="whitespace-pre-wrap">{fullMessage}</div>
              <div className="flex items-center justify-end gap-1 mt-1 opacity-60 text-[9px]"><span>12:30</span><Check size={12} strokeWidth={3} className="text-[#53bdeb]" /></div>
            </div>
          </div>
          <div className="p-2 bg-[#0b141a] pb-8 shrink-0 flex items-center gap-2 px-2 z-20">
            <div className="flex-1 bg-[#2a3942] rounded-[24px] flex items-center px-3 py-2.5 gap-3 border border-white/5">
              <Smile size={24} className="text-[#8696a0] shrink-0 cursor-pointer" />
              <div className="text-[14px] text-[#8696a0] flex-1 truncate font-normal">Mensagem</div>
              <Paperclip size={22} className="text-[#8696a0] shrink-0 -rotate-45 cursor-pointer" />
              <CameraIcon size={22} className="text-[#8696a0] shrink-0 cursor-pointer" />
            </div>
            <div className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform shrink-0 cursor-pointer">
              <Mic size={22} strokeWidth={2.5} className="relative z-10" />
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '450px', filter: 'invert(1)' }} />
        </div>
      );
    }
    return <div className="flex items-center justify-center h-full text-xs text-gray-600 italic">Interface {activeData.channel} em materialização...</div>;
  };

  const renderKanbanColumn = (title: string, status: Lead['status'], color: string) => {
    const columnLeads = leads.filter(l => l.status === status);
    const nextStatusMap: Record<Lead['status'], Lead['status']> = { 'prospecção': 'qualificação', 'qualificação': 'negociação', 'negociação': 'fechado', 'fechado': 'fechado' };

    return (
      <div className="flex-1 min-w-[280px] lg:min-w-0 flex flex-col space-y-4 h-full">
        <div className={`p-4 bg-[#0F0F12]/80 backdrop-blur-xl border-b-2 ${color} rounded-t-3xl border-x border-t border-white/5 flex justify-between items-center`}><h4 className="text-[10px] font-black text-white uppercase italic">{title}</h4><span className="text-[9px] font-black text-gray-500">{columnLeads.length}</span></div>
        <div className="space-y-4 flex-1 pb-10 overflow-y-auto no-scrollbar min-h-[400px]">
          {columnLeads.length === 0 ? <div className="border border-dashed border-white/5 rounded-3xl h-32 flex items-center justify-center text-[10px] text-gray-800 italic">Vazio</div> : columnLeads.map(lead => (
            <div key={lead.id} className="bg-[#0F0F12]/60 backdrop-blur-md border border-white/5 rounded-3xl p-5 space-y-5 hover:border-purple-500/40 transition-all shadow-xl group">
              <div className="space-y-1">
                <h5 className="text-[13px] font-black text-white italic truncate">{lead.businessName}</h5>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{lead.ownerName}</p>
              </div>
              <div className="space-y-2">
                <button onClick={() => handleOpenFollowUp(lead)} className="w-full py-2.5 rounded-xl text-[8px] uppercase bg-white/5 text-white italic font-black hover:bg-purple-600 transition-colors">Protocolo IA</button>
                {status !== 'fechado' && <button onClick={() => moveLead(lead.id, nextStatusMap[status])} className="w-full py-2.5 rounded-xl text-[8px] uppercase bg-white text-black font-black active:scale-95 transition-transform">Avançar Etapa</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center animate-in fade-in duration-1000 overflow-hidden font-['Inter']">
      <div className="fixed inset-0 pointer-events-none -z-10"><div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/[0.04] blur-[150px] rounded-full" /></div>
      {isGenerating && (
        <div className="fixed inset-0 z-[600] bg-[#020205]/98 backdrop-blur-[40px] flex flex-col items-center justify-center p-8">
          <h3 className="text-sm md:text-2xl font-black text-white tracking-[0.2em] md:tracking-[0.4em] uppercase italic">Materializando...</h3>
          <div className="mt-8 w-32 h-0.5 bg-white/5 overflow-hidden rounded-full"><div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
        </div>
      )}
      <div className="relative w-full max-w-[1600px] pt-6 px-4 md:px-10 z-30 flex items-center justify-between"><div className="px-4 py-1.5 bg-white/[0.02] border border-white/[0.08] rounded-full"><span className="text-[8px] font-black text-white/30 uppercase font-mono">CRM_v4.2</span></div></div>
      {view !== 'result' && (
        <div className="flex flex-col items-center pt-6 pb-8 md:pt-12 md:pb-16 w-full relative z-20 text-center px-4">
          <h2 className="text-3xl md:text-[84px] font-black text-white italic uppercase tracking-tighter">{view === 'new' ? <>IA <span className="text-purple-500">Copywriter</span></> : <>Funil <span className="text-purple-500">Comercial</span></>}</h2>
          <div className="flex flex-col sm:flex-row gap-2 mt-6 md:mt-10 w-full justify-center px-6 max-w-2xl"><button onClick={() => { setView('new'); setActiveFollowUp(null); }} className={`px-10 py-4 rounded-full font-black text-[10px] md:text-[12px] uppercase transition-all border ${view === 'new' ? 'bg-purple-600 text-white' : 'bg-white/[0.02] text-gray-600 border-white/5'}`}><span>Conversa</span></button><button onClick={() => setView('leads')} className={`px-10 py-4 rounded-full font-black text-[10px] md:text-[12px] uppercase transition-all border ${view === 'leads' ? 'bg-purple-600 text-white' : 'bg-white/[0.02] text-gray-600 border-white/5'}`}><span>Leads ({leads.length})</span></button></div>
        </div>
      )}
      {view === 'new' ? (
        <div className="grid grid-cols-12 gap-8 md:gap-16 max-w-[1600px] w-full px-4 md:px-10 pb-40 animate-in slide-in-from-bottom-6 duration-700">
          <div className="col-span-12 lg:col-span-7 space-y-6 md:space-y-12">
            <div className="bg-[#0A0A0C]/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 md:p-14 space-y-8 md:space-y-12 shadow-2xl">
              <div className="space-y-6 md:space-y-10">
                <div className="space-y-1"><label className={labelStyle}>01 Seu Nome</label><input type="text" className={inputStyle} value={form.userName} onChange={(e) => updateField('userName', e.target.value)} /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"><div className="space-y-1"><label className={labelStyle}>02 Empresa Alvo</label><input type="text" className={inputStyle} value={form.targetBusiness} onChange={(e) => updateField('targetBusiness', e.target.value)} /></div><div className="space-y-1"><label className={labelStyle}>03 Responsável</label><input type="text" className={inputStyle} value={form.targetPerson} onChange={(e) => updateField('targetPerson', e.target.value)} /></div></div>
                <div className="space-y-4 pt-2"><label className={labelStyle}>04 Canal de Abordagem</label><div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{channels.map(c => <button key={c.id} onClick={() => updateField('channel', c.id as Lead['channel'])} className={`py-4 rounded-xl border transition-all text-[8px] md:text-[10px] font-black uppercase tracking-widest ${form.channel === c.id ? 'bg-purple-600 border-purple-500 text-white shadow-lg' : 'bg-white/[0.02] border-white/5 text-gray-700'}`}>{c.label}</button>)}</div></div>
              </div>
              <div className="pt-6"><button onClick={handleMaterialize} className="w-full bg-white text-black py-5 md:py-8 rounded-[24px] md:rounded-[36px] font-black text-[11px] md:text-[14px] uppercase tracking-[0.4em] shadow-2xl italic hover:scale-[1.02] active:scale-95 transition-all">MATERIALIZAR_PROTOCOLO</button></div>
            </div>
          </div>
          <div className="hidden lg:flex lg:col-span-5 justify-center"><div className="bg-[#1A1A1E] rounded-[72px] p-2 shadow-2xl relative border border-white/5 h-fit"><div className="w-[340px] h-[720px] bg-[#010102] rounded-[70px] overflow-hidden border border-black">{renderPhoneContent()}</div></div></div>
        </div>
      ) : view === 'leads' ? (
        <div className="w-full px-4 md:px-10 pb-40 flex-1 flex flex-col overflow-hidden"><div className="overflow-x-auto no-scrollbar pb-10 flex-1"><div className="flex gap-6 w-full min-w-[1200px] lg:min-w-0 h-full">{renderKanbanColumn('Prospecção', 'prospecção', 'border-indigo-500')}{renderKanbanColumn('Qualificação', 'qualificação', 'border-purple-500')}{renderKanbanColumn('Negociação', 'negociação', 'border-purple-500/50')}{renderKanbanColumn('Fechado', 'fechado', 'border-emerald-500')}</div></div></div>
      ) : (
        <CopyResult
          data={activeFollowUp
            ? { ...form, targetPerson: activeFollowUp.ownerName, targetBusiness: activeFollowUp.businessName, channel: activeFollowUp.channel, status: activeFollowUp.status, generated_copy: activeFollowUp.generated_copy }
            : { ...form, status: 'prospecção' }
          }
          hidePhone={!!activeFollowUp}
          onBack={() => activeFollowUp ? (setView('leads'), setActiveFollowUp(null)) : setView('new')}
          onEditPrompt={() => { if (activeFollowUp) setForm(prev => ({ ...prev, targetPerson: activeFollowUp.ownerName, targetBusiness: activeFollowUp.businessName, channel: activeFollowUp.channel })); setView('new'); }}
          renderPhone={(previewMode, message) => renderPhoneContent(previewMode, activeFollowUp || undefined, message)}
        />
      )}
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};

export default Copywriter;