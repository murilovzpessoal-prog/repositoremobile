import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  Download,
  Save,
  User,
  ShieldCheck,
  ScrollText,
  FileText,
  Plus,
  Zap,
  Command,
  Check
} from 'lucide-react';

// Declaração do objeto global fornecido pela biblioteca html2pdf importada no index.html
declare var html2pdf: any;

interface ContractBuilderProps {
  onBack: () => void;
  onComplete: (data: any) => void;
  initialData?: any;
}

const ContractBuilder: React.FC<ContractBuilderProps> = ({ onBack, onComplete, initialData }) => {
  const [clientType, setClientType] = useState<'PF' | 'PJ'>('PJ');
  const contractRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    providerName: '',
    providerCnpj: '',
    providerAddress: '',
    clientName: '',
    clientCnpj: '',
    clientAddress: '',
    contractObject: 'Desenvolvimento de software e consultoria técnica.',
    value: '5.000,00',
    status: 'PENDENTE' as 'ASSINADO' | 'PENDENTE' | 'RASCUNHO',
    clauses: {
      confidencialidade: true,
      portfolio: true,
      propriedade: true,
      rescisao: true
    }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        providerName: initialData.providerName || '',
        providerCnpj: initialData.providerCnpj || '',
        providerAddress: initialData.providerAddress || '',
        clientName: initialData.client || '',
        clientCnpj: initialData.clientCnpj || '',
        clientAddress: initialData.clientAddress || '',
        contractObject: initialData.project || 'Desenvolvimento de software e consultoria técnica.',
        value: initialData.value || '0',
        status: initialData.status || 'PENDENTE',
        clauses: initialData.clauses || {
          confidencialidade: true,
          portfolio: true,
          propriedade: true,
          rescisao: true
        }
      });
    }
  }, [initialData]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApprove = () => {
    updateField('status', 'ASSINADO');
    // Força o salvamento imediato após aprovação para facilitar a UX
    setTimeout(() => {
      onComplete({ ...formData, status: 'ASSINADO' });
    }, 100);
  };

  const handleDownloadPdf = () => {
    if (!contractRef.current) return;

    // Configurações do html2pdf para garantir fidelidade visual e formato A4
    const element = contractRef.current;
    const opt = {
      margin: 0,
      filename: `Contrato_${formData.clientName || 'Cliente'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        backgroundColor: '#FFFFFF'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Gera e faz o download do PDF
    html2pdf().set(opt).from(element).save();
  };

  const inputStyle = "w-full bg-[#1A1A1E]/80 border border-white/5 rounded-xl px-4 lg:px-6 py-4 text-white text-sm focus:outline-none focus:border-purple-500/30 transition-all placeholder:text-gray-700 font-medium shadow-inner";
  const labelStyle = "text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 block ml-1";

  return (
    <div className="fixed inset-0 z-[100] bg-[#050507] flex flex-col overflow-hidden animate-in fade-in duration-500 font-['Inter']">

      <style dangerouslySetInnerHTML={{
        __html: `
        .document-container::-webkit-scrollbar {
          width: 5px;
        }
        .document-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .document-container::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          transition: background 0.3s;
        }
        .document-container::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
        .document-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
        }
      `}} />

      {/* 1. TOP HEADER BAR */}
      <header className="h-auto md:h-20 border-b border-white/5 px-4 md:px-10 py-4 flex flex-col md:flex-row items-center justify-between bg-[#050507] shrink-0 relative z-50 gap-4">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:bg-white/10"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight italic">{initialData ? 'Editar Contrato' : 'Novo Contrato'}</h1>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${formData.status === 'ASSINADO' ? 'bg-emerald-500' : 'bg-purple-500'}`} />
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Status: {formData.status}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 w-full md:w-auto">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-widest hover:bg-white/10 transition-all italic"
          >
            <Download size={14} /> <span className="hidden sm:inline">BAIXAR PDF</span><span className="sm:hidden">PDF</span>
          </button>

          {formData.status !== 'ASSINADO' && (
            <button
              onClick={handleApprove}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all italic shadow-lg shadow-emerald-600/20"
            >
              <Check size={14} /> <span className="hidden sm:inline">APROVAR AGORA</span><span className="sm:hidden">APROVAR</span>
            </button>
          )}

          <button
            onClick={() => onComplete(formData)}
            className="flex items-center gap-2 px-4 md:px-8 py-2.5 rounded-xl bg-purple-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 transition-all italic shadow-lg shadow-purple-600/20"
          >
            <Save size={14} /> <span className="hidden sm:inline">SALVAR ALTERAÇÕES</span><span className="sm:hidden">SALVAR</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-start lg:justify-end px-4 md:px-12 lg:pr-16 py-6 md:py-10 overflow-y-auto lg:overflow-hidden relative gap-6 md:gap-8 lg:gap-4">

        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-full md:w-[800px] h-[800px] bg-purple-600/[0.03] blur-[150px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/[0.03] blur-[150px] rounded-full" />
        </div>

        {/* --- FORM TERMINAL --- */}
        <div className="w-full lg:w-[540px] shrink-0 h-auto lg:h-full max-h-none lg:max-h-[85vh] flex flex-col bg-[#0A0A0E]/95 backdrop-blur-3xl border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl relative overflow-hidden animate-in slide-in-from-right-8 duration-700">
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-10 lg:p-12 space-y-8 md:space-y-12">

            <section className="space-y-6 md:space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tighter">Dados do Contrato</h3>
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] italic">Injetar variáveis para materialização</p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="space-y-1">
                  <label className={labelStyle}>Contratado / Razão Social</label>
                  <input
                    type="text"
                    placeholder="Nome Completo da Empresa"
                    className={inputStyle}
                    value={formData.providerName}
                    onChange={(e) => updateField('providerName', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>CPF / CNPJ</label>
                  <input
                    type="text"
                    placeholder="00.000.000/0001-00"
                    className={inputStyle}
                    value={formData.providerCnpj}
                    onChange={(e) => updateField('providerCnpj', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>Endereço Completo</label>
                  <input
                    type="text"
                    placeholder="Rua, Número, Bairro, Cidade"
                    className={inputStyle}
                    value={formData.providerAddress}
                    onChange={(e) => updateField('providerAddress', e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6 md:space-y-8 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                  <User size={14} className="text-purple-500" />
                  2. Dados do Cliente
                </h4>
              </div>

              <div className="bg-[#16161A] p-1 rounded-2xl flex border border-white/5 w-fit max-w-full overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setClientType('PF')}
                  className={`px-4 md:px-8 py-2 md:py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${clientType === 'PF' ? 'bg-white text-black shadow-xl' : 'text-gray-600 hover:text-white'
                    }`}
                >
                  Pessoa Física
                </button>
                <button
                  onClick={() => setClientType('PJ')}
                  className={`px-4 md:px-8 py-2 md:py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${clientType === 'PJ' ? 'bg-white text-black shadow-xl' : 'text-gray-600 hover:text-white'
                    }`}
                >
                  Pessoa Jurídica
                </button>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="space-y-1">
                  <label className={labelStyle}>Razão Social do Cliente</label>
                  <input
                    type="text"
                    placeholder="Ex: Empresa de Tecnologia S.A."
                    className={inputStyle}
                    value={formData.clientName}
                    onChange={(e) => updateField('clientName', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>CNPJ do Cliente</label>
                  <input
                    type="text"
                    placeholder="00.000.000/0001-00"
                    className={inputStyle}
                    value={formData.clientCnpj}
                    onChange={(e) => updateField('clientCnpj', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>Endereço do Cliente</label>
                  <input
                    type="text"
                    placeholder="Sede Administrativa"
                    className={inputStyle}
                    value={formData.clientAddress}
                    onChange={(e) => updateField('clientAddress', e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6 md:space-y-8 pt-6 border-t border-white/5 pb-10">
              <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                <FileText size={14} className="text-indigo-500" />
                3. Escopo e Valores
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className={labelStyle}>Valor Bruto</label>
                  <div className="relative">
                    <span className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-gray-600 font-bold text-sm">R$</span>
                    <input
                      type="text"
                      className={`${inputStyle} pl-10 md:pl-12`}
                      value={formData.value}
                      onChange={(e) => updateField('value', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelStyle}>Prazo de Entrega</label>
                  <input type="text" placeholder="Ex: 45 dias" className={inputStyle} />
                </div>
              </div>
            </section>
          </div>

          <div className="p-6 md:p-8 border-t border-white/5 bg-black/40">
            <button
              onClick={() => onComplete(formData)}
              className="w-full bg-white text-black py-4 md:py-6 rounded-[24px] md:rounded-[28px] font-black text-[11px] md:text-[12px] uppercase tracking-[0.5em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-500 italic group relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                <ShieldCheck size={20} strokeWidth={2.5} />
                <span>SINCRONIZAR</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>
        </div>

        {/* --- A4 SIMULATION --- */}
        <div className="w-full lg:w-[740px] shrink-0 h-auto lg:h-full max-h-none lg:max-h-[85vh] flex items-center justify-center relative animate-in slide-in-from-right-12 duration-1000">
          <div ref={contractRef} className="bg-white w-full h-full lg:h-full aspect-[1/1.414] lg:aspect-[1/1.414] rounded-sm shadow-[0_60px_130px_-30px_rgba(0,0,0,1)] flex flex-col text-black font-serif relative overflow-hidden">
            <div className="document-container relative z-10 flex-1 overflow-y-auto px-6 md:px-16 lg:px-20 py-10 md:py-16 lg:py-20 space-y-6 md:space-y-10">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="text-center space-y-2 md:space-y-4 mb-6 md:mb-14">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.15em] border-b-2 border-black pb-3 md:pb-5">Contrato de Prestação de Serviços</h2>
                <p className="text-[8px] md:text-[10px] font-sans font-black text-gray-400 uppercase tracking-widest italic">Genesis Protocol v.4.2 Autenticado</p>
              </div>
              <div className="space-y-2 md:space-y-4 text-[11px] md:text-[13px] lg:text-[14px] leading-relaxed">
                <p><strong>CONTRATADA:</strong> <span className="font-bold underline">{formData.providerName || '_____________________________________'}</span>, inscrito no CNPJ/CPF sob nº {formData.providerCnpj || '___________________'}.</p>
                <p><strong>CONTRATANTE:</strong> <span className="font-bold underline">{formData.clientName || '_____________________________________'}</span>, inscrito no CNPJ/CPF sob nº {formData.clientCnpj || '___________________'}.</p>
              </div>
              <div className="space-y-6 md:space-y-10 pt-4 md:pt-8">
                <div className="space-y-1.5 md:space-y-3">
                  <h5 className="font-bold uppercase tracking-tight text-[11px] md:text-[12px] lg:text-[13px]">CLÁUSULA 1ª - DO OBJETO</h5>
                  <p className="text-[11px] md:text-[13px] leading-relaxed">{formData.contractObject}</p>
                </div>
                <div className="space-y-1.5 md:space-y-3">
                  <h5 className="font-bold uppercase tracking-tight text-[11px] md:text-[12px] lg:text-[13px]">CLÁUSULA 4ª - DA CONFIDENCIALIDADE</h5>
                  <p className="text-[11px] md:text-[13px] leading-relaxed">O CONTRATADO(A) compromete-se a manter sigilo absoluto sobre todas as informações, dados e documentos fornecidos pelo CONTRATANTE para execução do presente contrato.</p>
                </div>
              </div>
              <div className="pt-12 md:pt-24 mt-auto grid grid-cols-2 gap-8 md:gap-16 lg:gap-24">
                <div className="border-t border-black pt-2 md:pt-5 text-center">
                  <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider">{formData.providerName || 'PRESTADOR'}</p>
                  <p className="text-[7px] md:text-[8px] text-gray-500 font-sans uppercase italic mt-1">Contratada</p>
                </div>
                <div className="border-t border-black pt-2 md:pt-5 text-center">
                  <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider">{formData.clientName || 'CLIENTE'}</p>
                  <p className="text-[7px] md:text-[8px] text-gray-500 font-sans uppercase italic mt-1">Contratante</p>
                </div>
              </div>
              <div className="mt-4 md:mt-8 pt-4 md:pt-8 flex items-center justify-between border-t border-gray-100 opacity-20">
                <div className="flex items-center gap-2 md:gap-3">
                  <ScrollText size={10} />
                  <span className="text-[8px] md:text-[9px] font-bold font-mono uppercase tracking-widest">DIGITAL_AUTH_SECURE</span>
                </div>
                <span className="text-[8px] md:text-[9px] font-bold font-mono">PÁGINA 01 / 01</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContractBuilder;