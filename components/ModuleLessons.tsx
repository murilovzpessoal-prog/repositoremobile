import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  Download, 
  FileText, 
  Clock, 
  Maximize2,
  ChevronRight,
  MonitorPlay,
  Share2,
  Bookmark,
  Settings,
  Zap
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl: string;
}

interface Material {
  id: number;
  title: string;
  type: 'PDF' | 'DOC' | 'ZIP';
  size: string;
}

interface ModuleLessonsProps {
  moduleTitle: string;
  moduleDescription: string;
  moduleNumber: number;
  onBack: () => void;
  globalProgress: number;
  onUpdateProgress: (val: number) => void;
}

const LESSONS: Lesson[] = [
  { id: 1, title: 'Introdução ao Ecossistema Nexbuild', duration: '12:45', isCompleted: true, videoUrl: '#' },
  { id: 2, title: 'Configurando o Ambiente de Desenvolvimento', duration: '24:10', isCompleted: true, videoUrl: '#' },
  { id: 3, title: 'Arquitetura de Softwares Soberanos', duration: '18:30', isCompleted: false, videoUrl: '#' },
  { id: 4, title: 'Integração Nativa com Gemini API', duration: '45:12', isCompleted: false, videoUrl: '#' },
  { id: 5, title: 'Design System e Componentes Elite', duration: '32:20', isCompleted: false, videoUrl: '#' },
  { id: 6, title: 'Deploy e Escalabilidade em Nuvem', duration: '21:05', isCompleted: false, videoUrl: '#' },
];

const MATERIALS: Material[] = [
  { id: 1, title: 'Guia de Arquitetura.pdf', type: 'PDF', size: '2.4 MB' },
  { id: 2, title: 'Assets_Componentes_v4.zip', type: 'ZIP', size: '142 MB' },
];

const ModuleLessons: React.FC<ModuleLessonsProps> = ({ 
  moduleTitle, 
  moduleNumber, 
  onBack, 
  globalProgress, 
  onUpdateProgress 
}) => {
  const [currentLesson, setCurrentLesson] = useState(LESSONS[2]);

  const handleFinishLesson = () => {
    onUpdateProgress(globalProgress + 5);
    alert('Sincronizado!');
  };

  return (
    <div className="flex flex-col h-screen bg-[#050507] overflow-hidden animate-in fade-in duration-700">
      <header className="h-16 md:h-20 border-b border-white/5 bg-[#08080A] px-4 md:px-10 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-3 md:gap-6 min-w-0">
          <button onClick={onBack} className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
            <ChevronLeft size={16} />
          </button>
          <div className="flex flex-col min-w-0">
            <span className="text-[7px] md:text-[9px] font-black text-purple-500 uppercase tracking-widest italic">Módulo 0{moduleNumber}</span>
            <h1 className="text-xs md:text-base font-bold text-white tracking-tight uppercase italic truncate">{moduleTitle}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
           <div className="flex items-center gap-2 px-2 py-1 bg-white/[0.02] border border-white/5 rounded-lg">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             <span className="text-[8px] md:text-[9px] font-black text-gray-400">{globalProgress}%</span>
           </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <aside className="w-full lg:w-[380px] border-r border-white/5 bg-[#08080A]/40 flex flex-col shrink-0 lg:h-full max-h-[30vh] lg:max-h-none order-2 lg:order-1 overflow-y-auto no-scrollbar">
          <div className="p-4 md:p-8 border-b border-white/5 sticky top-0 bg-[#08080A] z-10">
            <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Playlist</h4>
          </div>
          <div className="flex-1 p-2 md:p-4 space-y-1">
            {LESSONS.map((lesson) => (
              <button key={lesson.id} onClick={() => setCurrentLesson(lesson)} className={`w-full flex items-center gap-3 p-3 md:p-4 rounded-xl transition-all border text-left ${currentLesson.id === lesson.id ? 'bg-purple-600/10 border-purple-500/40' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${currentLesson.id === lesson.id ? 'bg-purple-600 text-white' : lesson.isCompleted ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-gray-700'}`}>
                  {lesson.isCompleted ? <CheckCircle2 size={14} /> : <Play size={12} fill={currentLesson.id === lesson.id ? 'currentColor' : 'none'} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className={`text-[11px] font-bold tracking-tight truncate ${currentLesson.id === lesson.id ? 'text-white' : 'text-gray-400'}`}>{lesson.title}</h5>
                  <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{lesson.duration}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1 overflow-y-auto bg-[#050507] p-4 md:p-14 space-y-6 md:space-y-12 no-scrollbar relative order-1 lg:order-2">
          <div className="space-y-6 animate-in slide-in-from-bottom-6">
            <div className="aspect-video w-full bg-black rounded-[24px] md:rounded-[40px] border border-white/10 overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white cursor-pointer shadow-2xl">
                    <Play size={24} md:size={40} fill="currentColor" className="ml-1" />
                 </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-xl md:text-3xl font-black text-white tracking-tight italic uppercase">{currentLesson.title}</h2>
                <p className="text-gray-500 text-sm md:text-lg italic opacity-70">Engenharia e visão estratégica Nexbuild.</p>
              </div>
              <button onClick={handleFinishLesson} className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest italic shadow-xl">
                Finalizar Aula <CheckCircle2 size={14} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/5 pt-8">
             <div className="lg:col-span-8 space-y-4">
                <h4 className="text-[9px] font-black text-white uppercase tracking-widest italic">Apoio_Elite</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {MATERIALS.map(mat => (
                     <div key={mat.id} className="bg-[#0F0F12] border border-white/5 p-4 rounded-2xl flex items-center justify-between group">
                        <div className="flex items-center gap-4 min-w-0">
                           <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-purple-400">
                              <Download size={18} />
                           </div>
                           <div className="min-w-0"><h5 className="text-[11px] font-bold text-white truncate">{mat.title}</h5><p className="text-[8px] text-gray-600">{mat.type} • {mat.size}</p></div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </section>
      </main>
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }`}} />
    </div>
  );
};

export default ModuleLessons;