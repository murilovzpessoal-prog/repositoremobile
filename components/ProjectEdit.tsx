
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Bug, 
  Palette, 
  Settings, 
  Link as LinkIcon, 
  Brain, 
  Code, 
  Zap, 
  Image as ImageIcon, 
  Download,
  Info,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface ProjectEditProps {
  project: {
    id: string;
    name: string;
    category: string;
  };
  onBack: () => void;
  onGenerate: (promptData: any) => void;
}

interface ActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const ACTION_CONFIG: Record<string, { questions: { id: string; label: string; placeholder: string; type: 'text' | 'textarea' | 'select'; options?: string[] }[] }> = {
  add_func: {
    questions: [
      { id: 'name', label: 'Nome da nova função', placeholder: 'Ex: Sistema de Fidelidade', type: 'text' },
      { id: 'objective', label: 'Objetivo principal', placeholder: 'Ex: Aumentar retenção de clientes...', type: 'textarea' },
      { id: 'integration', label: 'Onde deve ser integrada?', type: 'select', options: ['Menu Principal', 'Dashboard', 'Página Nova', 'Configurações'], placeholder: 'Selecione o local' }
    ]
  },
  fix_bug: {
    questions: [
      { id: 'desc', label: 'Descrição do erro encontrado', placeholder: 'O botão de pagamento não responde...', type: 'textarea' },
      { id: 'repro', label: 'O que você estava tentando fazer?', placeholder: 'Ao clicar em finalizar pedido no checkout...', type: 'textarea' },
      { id: 'expected', label: 'Qual o comportamento esperado?', placeholder: 'Deveria abrir o modal de confirmação do Pix.', type: 'text' }
    ]
  },
  ui_change: {
    questions: [
      { id: 'change', label: 'O que deseja mudar na aparência?', placeholder: 'Mudar o tema de dark para light ou ajustar bordas...', type: 'textarea' },
      { id: 'refs', label: 'Cores/Estilos de referência', placeholder: 'Ex: Estilo minimalista da Apple...', type: 'text' },
      { id: 'pages', label: 'Páginas afetadas', placeholder: 'Ex: Todas, ou apenas a Home.', type: 'text' }
    ]
  },
  optimization: {
    questions: [
      { id: 'area', label: 'Área para otimizar', placeholder: 'Ex: Tempo de carregamento, SEO...', type: 'text' },
      { id: 'goal', label: 'Meta de performance', placeholder: 'Ex: Carregar em menos de 1s...', type: 'textarea' }
    ]
  },
  pwa: {
    questions: [
      { id: 'name', label: 'Nome para o atalho PWA', placeholder: 'Ex: ' + 'Meu App', type: 'text' },
      { id: 'icon', label: 'Deseja usar ícone customizado?', placeholder: 'Sim/Não e detalhes...', type: 'text' }
    ]
  }
};

const ProjectEdit: React.FC<ProjectEditProps> = ({ project, onBack, onGenerate }) => {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});
  const detailsRef = useRef<HTMLDivElement>(null);

  const toggleAction = (id: string) => {
    const isSelecting = !selectedActions.includes(id);
    if (isSelecting) {
      setSelectedActions(prev => [...prev, id]);
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setSelectedActions(prev => prev.filter(a => a !== id));
      const newFormData = { ...formData };
      delete newFormData[id];
      setFormData(newFormData);
    }
  };

  const handleInputChange = (actionId: string, questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [actionId]: {
        ...(prev[actionId] || {}),
        [questionId]: value
      }
    }));
  };

  const sections = [
    {
      title: 'O QUE VAMOS CONSTRUIR OU ARRUMAR?',
      items: [
        { id: 'add_func', label: 'Adicionar Função', icon: <Plus size={24} strokeWidth={2.5} /> },
        { id: 'fix_bug', label: 'Corrigir Bug', icon: <Bug size={24} strokeWidth={1.5} /> },
        { id: 'ui_change', label: 'Mudança Visual / UI', icon: <Palette size={24} strokeWidth={1.5} /> },
      ]
    },
    {
      title: 'AJUSTES TÉCNICOS E INTEGRAÇÕES',
      items: [
        { id: 'adj_func', label: 'Ajustar Função', icon: <Settings size={24} strokeWidth={1.5} /> },
        { id: 'integrate', label: 'Integrar Ferramenta', icon: <LinkIcon size={24} strokeWidth={1.5} /> },
        { id: 'ai_logic', label: 'Melhorar IA / Lógica', icon: <Brain size={24} strokeWidth={1.5} /> },
        { id: 'refactor', label: 'Refatorar Código', icon: <Code size={24} strokeWidth={1.5} /> },
      ]
    },
    {
      title: 'FINALIZAÇÃO',
      items: [
        { id: 'optimization', label: 'Otimização', icon: <Zap size={24} strokeWidth={1.5} /> },
        { id: 'img_change', label: 'Adicionar/Alterar Imagens', icon: <ImageIcon size={24} strokeWidth={1.5} /> },
        { id: 'pwa', label: 'Tornar App Baixável (PWA)', icon: <Download size={24} strokeWidth={1.5} /> },
      ]
    }
  ];

  const handleGenerate = () => {
    const promptPayload = {
      type: 'update',
      projectName: project.name,
      actions: selectedActions.map(id => {
        const label = sections.flatMap(s => s.items).find(i => i.id === id)?.label;
        return {
          id,
          label,
          details: formData[id] || {}
        };
      })
    };
    onGenerate(promptPayload);
  };

  // New High-End Label Style: Montserrat Black, Large, Geometric and Harmonic
  const labelStyle = "text-[10px] font-black text-purple-400 tracking-[0.15em] font-['Montserrat'] flex items-center gap-3 uppercase antialiased";

  return (
    <div className="max-w-5xl mx-auto w-full space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-48">
      <div className="space-y-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest font-mono group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>// VOLTAR PARA MEUS PROJETOS</span>
        </button>

        <div className="space-y-4">
          <h2 className="text-7xl font-bold text-white tracking-tighter italic font-['Syne']">{project.name}</h2>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#050505] border border-emerald-500/40 rounded-full">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[4px] animate-pulse" />
            </div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest font-mono">
              DATABASE ONLINE: CONTEXTO DO PROJETO CARREGADO
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.title} className="space-y-6">
            <h4 className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.2em]">
              {section.title}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleAction(item.id)}
                  className={`group flex flex-col items-center justify-center py-12 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                    selectedActions.includes(item.id) 
                    ? 'bg-[#161225] border-[#7C3AED] shadow-[0_0_25px_rgba(124,58,237,0.15)] scale-[1.02] z-10' 
                    : 'bg-[#0F0F12] border-white/5 hover:border-white/10 hover:bg-[#121216]'
                  }`}
                >
                  <div className={`mb-4 transition-transform group-hover:scale-110 ${selectedActions.includes(item.id) ? 'text-[#7C3AED]' : 'text-white'}`}>
                    {item.icon}
                  </div>
                  <span className={`text-[13px] font-bold tracking-tight text-center ${selectedActions.includes(item.id) ? 'text-white' : 'text-gray-400'}`}>
                    {item.label}
                  </span>
                  {selectedActions.includes(item.id) && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#7C3AED]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedActions.length > 0 && (
        <div ref={detailsRef} className="space-y-10 pt-10 border-t border-white/5 animate-in slide-in-from-bottom-10 duration-500">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-white tracking-tight">2. Detalhes da Atualização</h3>
            <p className="text-gray-500 text-sm font-medium">Preencha as informações para que a IA entenda exatamente o que precisa ser feito.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-12">
              {selectedActions.map(actionId => {
                const config = ACTION_CONFIG[actionId];
                const label = sections.flatMap(s => s.items).find(i => i.id === actionId)?.label;
                
                if (!config) return (
                   <div key={actionId} className="bg-[#0F0F12] border border-white/5 rounded-2xl p-8 space-y-6">
                      <div className="flex items-center gap-3 text-[#7C3AED]">
                        <Info size={20} />
                        <h5 className="font-bold text-white uppercase tracking-wider text-xs">{label}</h5>
                      </div>
                      <textarea 
                        className="w-full bg-[#050505] border border-white/5 rounded-xl px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#7C3AED] transition-all min-h-[120px]"
                        placeholder={`Descreva em detalhes o que deseja em ${label}...`}
                        value={formData[actionId]?.general || ''}
                        onChange={(e) => handleInputChange(actionId, 'general', e.target.value)}
                      />
                   </div>
                );

                return (
                  <div key={actionId} className="bg-[#0F0F12] border border-white/5 rounded-3xl p-8 space-y-8 relative group">
                    <div className="absolute -top-3 -left-3 bg-[#7C3AED] text-white p-2 rounded-xl shadow-lg">
                       {sections.flatMap(s => s.items).find(i => i.id === actionId)?.icon}
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <h5 className="font-bold text-white uppercase tracking-widest text-[11px] ml-8">{label}</h5>
                      <button onClick={() => toggleAction(actionId)} className="text-gray-600 hover:text-white transition-colors text-[10px] font-black">REMOVER</button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {config.questions.map(q => (
                        <div key={q.id} className="space-y-3">
                          <label className={labelStyle}>
                             <span className="w-1 h-1 bg-[#7C3AED] rounded-full" />
                             {q.label}
                          </label>
                          {q.type === 'textarea' ? (
                            <textarea
                              className="w-full bg-[#050505] border border-white/5 rounded-xl px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#7C3AED] transition-all min-h-[100px] text-sm"
                              placeholder={q.placeholder}
                              value={formData[actionId]?.[q.id] || ''}
                              onChange={(e) => handleInputChange(actionId, q.id, e.target.value)}
                            />
                          ) : q.type === 'select' ? (
                            <div className="relative group/select">
                              <select 
                                className="w-full bg-[#050505] border border-white/5 rounded-xl px-6 py-4 text-white appearance-none focus:outline-none focus:border-[#7C3AED] transition-all text-sm font-medium"
                                value={formData[actionId]?.[q.id] || ''}
                                onChange={(e) => handleInputChange(actionId, q.id, e.target.value)}
                              >
                                <option value="" disabled>{q.placeholder}</option>
                                {q.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/select:text-[#7C3AED]" size={16} />
                            </div>
                          ) : (
                            <input
                              type="text"
                              className="w-full bg-[#050505] border border-white/5 rounded-xl px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#7C3AED] transition-all text-sm"
                              placeholder={q.placeholder}
                              value={formData[actionId]?.[q.id] || ''}
                              onChange={(e) => handleInputChange(actionId, q.id, e.target.value)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0A0A0E] border border-[#7C3AED]/20 rounded-3xl p-8 space-y-6 sticky top-10">
                <div className="flex items-center gap-3 text-[#A855F7]">
                  <HelpCircle size={24} />
                  <h6 className="font-bold text-white text-lg tracking-tight">Precisa de Ajuda?</h6>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2 group cursor-help">
                    <p className="text-xs font-black text-[#7C3AED] uppercase tracking-widest">DICA PRO</p>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                      Ao solicitar uma <span className="text-white">Mudança Visual</span>, tente ser específico sobre a paleta de cores ou mencione um site de referência que você gosta.
                    </p>
                  </div>
                  
                  <div className="h-px bg-white/5" />
                  
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">TUTORIAIS RÁPIDOS</p>
                    <ul className="space-y-3">
                      {['Como Alterar Imagens', 'Integrando APIs externas', 'Publicando via PWA'].map(t => (
                        <li key={t} className="flex items-center gap-3 text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer group">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#7C3AED] transition-colors" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-10 left-0 right-0 px-6 md:pl-[300px] md:pr-10 z-50">
        <div className="max-w-5xl mx-auto w-full">
          <button 
            onClick={handleGenerate}
            disabled={selectedActions.length === 0}
            className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl ${
              selectedActions.length > 0 
              ? 'bg-gradient-to-r from-[#502bb6] via-[#7C3AED] to-[#502bb6] text-white hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:scale-[1.01] active:scale-[0.99] border-t border-white/10' 
              : 'bg-[#16161A] text-gray-700 border border-white/5 cursor-not-allowed opacity-50'
            }`}
          >
            <Zap size={18} className={selectedActions.length > 0 ? 'animate-pulse' : ''} />
            <span className="uppercase text-xs tracking-[0.2em] font-black">Gerar Prompt de Atualização</span>
            {selectedActions.length > 0 && (
              <div className="ml-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                {selectedActions.length}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectEdit;
