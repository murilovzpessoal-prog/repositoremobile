import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Trash2, 
  Calendar,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import ContractBuilder from './ContractBuilder';

export interface Contract {
  id: string;
  client: string;
  project: string;
  status: 'ASSINADO' | 'PENDENTE' | 'RASCUNHO';
  date: string;
  value: string;
  providerName?: string;
  providerCnpj?: string;
  providerAddress?: string;
  clientCnpj?: string;
  clientAddress?: string;
}

interface ContractsProps {
  contracts: Contract[];
  onUpdateContracts: (contracts: Contract[]) => void;
}

const Contracts: React.FC<ContractsProps> = ({ contracts, onUpdateContracts }) => {
  const [view, setView] = useState<'list' | 'builder'>('list');
  const [search, setSearch] = useState('');
  const [editingContract, setEditingContract] = useState<Contract | null>(null);

  const handleOpenBuilder = (contract?: Contract) => {
    if (contract) setEditingContract(contract);
    else setEditingContract(null);
    setView('builder');
  };

  const handleSaveContract = (newContractData: any) => {
    const isUpdate = !!editingContract;
    const contractEntry: Contract = {
      id: isUpdate ? editingContract!.id : Date.now().toString(),
      client: newContractData.clientName || 'Cliente Indefinido',
      project: newContractData.contractObject || 'Projeto Indefinido',
      status: newContractData.status || 'PENDENTE',
      date: isUpdate ? editingContract!.date : new Date().toLocaleDateString('pt-BR'),
      value: newContractData.value || '0',
      providerName: newContractData.providerName,
      providerCnpj: newContractData.providerCnpj,
      providerAddress: newContractData.providerAddress,
      clientCnpj: newContractData.clientCnpj,
      clientAddress: newContractData.clientAddress
    };
    if (isUpdate) onUpdateContracts(contracts.map(c => c.id === contractEntry.id ? contractEntry : c));
    else onUpdateContracts([contractEntry, ...contracts]);
    setEditingContract(null);
    setView('list');
  };

  const getStatusStyle = (status: Contract['status']) => {
    switch (status) {
      case 'ASSINADO': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'PENDENTE': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'RASCUNHO': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (view === 'builder') return <ContractBuilder initialData={editingContract} onBack={() => setView('list')} onComplete={handleSaveContract} />;

  const totalRevenue = contracts.filter(c => c.status === 'ASSINADO').reduce((acc, curr) => acc + parseFloat(curr.value.replace(/\./g, '').replace(',', '.') || '0'), 0);
  const activeContractsCount = contracts.filter(c => c.status === 'ASSINADO').length;
  const pendingContractsCount = contracts.filter(c => c.status === 'PENDENTE').length;

  const filtered = contracts.filter(c => c.client.toLowerCase().includes(search.toLowerCase()) || c.project.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-10 md:space-y-16 animate-in fade-in duration-700 max-w-[1600px] mx-auto w-full px-4 md:px-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-2">
             <ShieldCheck size={12} className="text-purple-400" />
             <span className="text-[9px] font-black text-purple-300 uppercase tracking-widest italic">Nexus_Legal_Protocol</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none italic uppercase">
            Gestão de <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 pr-4">Contratos</span>
          </h2>
        </div>
        <button onClick={() => handleOpenBuilder()} className="flex items-center justify-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-black hover:bg-purple-500 hover:text-white transition-all uppercase text-[11px] md:text-[13px] tracking-[0.4em] active:scale-95 shadow-2xl italic">
          <Plus size={20} /> CRIAR_CONTRATO
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0F0F12] border border-white/5 rounded-[32px] p-8 flex items-center justify-between shadow-2xl group overflow-hidden relative"><div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] pointer-events-none" /><div className="space-y-1 relative z-10"><p className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-none mb-1 italic">RECEITA_ASSINADA</p><h4 className="text-3xl md:text-4xl font-black text-white tracking-tight">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4></div><div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-700 group-hover:text-emerald-400 group-hover:bg-emerald-400/10 transition-all relative z-10"><DollarSign size={28} /></div></div>
        <div className="bg-[#0F0F12] border border-white/5 rounded-[32px] p-8 flex items-center justify-between shadow-2xl group overflow-hidden relative"><div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] pointer-events-none" /><div className="space-y-1 relative z-10"><p className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-none mb-1 italic">CONTRATOS_ATIVOS</p><h4 className="text-3xl md:text-4xl font-black text-white tracking-tight">{activeContractsCount}</h4></div><div className="w-14 h-14 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] relative z-10"><Briefcase size={28} /></div></div>
        <div className="bg-[#0F0F12] border border-white/5 rounded-[32px] p-8 flex items-center justify-between shadow-2xl group overflow-hidden relative"><div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] pointer-events-none" /><div className="space-y-1 relative z-10"><p className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-none mb-1 italic">EM_NEGOCIAÇÃO</p><h4 className="text-3xl md:text-4xl font-black text-white tracking-tight">{pendingContractsCount}</h4></div><div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-700 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-all relative z-10"><Clock size={28} /></div></div>
      </div>

      <div className="relative group"><Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-purple-500 transition-colors" size={22} /><input type="text" placeholder="Buscar por cliente ou projeto..." className="w-full bg-[#0F0F12] border border-white/5 rounded-2xl py-5 pl-16 pr-8 text-base text-white focus:outline-none focus:border-purple-500/50 transition-all font-medium placeholder-gray-800" value={search} onChange={(e) => setSearch(e.target.value)} /></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
        <button onClick={() => handleOpenBuilder()} className="group flex flex-col items-center justify-center space-y-6 rounded-[40px] border-2 border-dashed border-white/10 bg-transparent hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-500 min-h-[350px]"><div className="w-20 h-20 rounded-[2rem] bg-[#16161A] border border-white/5 flex items-center justify-center text-gray-700 group-hover:text-purple-400 group-hover:scale-110 transition-all shadow-2xl"><Plus size={40} /></div><span className="text-[12px] font-black text-gray-700 group-hover:text-white uppercase tracking-[0.4em] transition-colors italic">NOVO_DOCUMENTO</span></button>
        {filtered.map((contract) => (
          <div key={contract.id} onClick={() => handleOpenBuilder(contract)} className="group bg-[#0F0F12] border border-white/5 rounded-[40px] p-8 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-500 shadow-2xl relative overflow-hidden cursor-pointer min-h-[350px]">
            <div className="flex items-start justify-between relative z-10"><div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-purple-400 transition-all border border-white/5 shadow-inner"><FileText size={24} /></div><div className="flex items-center gap-3"><div className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${getStatusStyle(contract.status)}`}>{contract.status}</div><button onClick={(e) => { e.stopPropagation(); onUpdateContracts(contracts.filter(c => c.id !== contract.id)); }} className="text-gray-800 hover:text-red-500 transition-colors p-2"><Trash2 size={18} /></button></div></div>
            <div className="space-y-2 relative z-10 pt-8"><h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none italic uppercase">{contract.client}</h3><p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest truncate">{contract.project}</p></div>
            <div className="pt-8 border-t border-white/5 flex items-center justify-between relative z-10 mt-6"><div className="flex items-center gap-3 text-gray-700"><Calendar size={14} /><span className="text-[10px] font-black uppercase tracking-[0.2em]">{contract.date}</span></div><div className="bg-purple-600/10 px-4 py-1.5 rounded-xl border border-purple-500/20"><span className="text-[12px] font-black text-purple-400 uppercase italic tracking-widest">R$ {contract.value}</span></div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contracts;