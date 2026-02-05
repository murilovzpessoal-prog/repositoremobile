import React, { useState } from 'react';
import {
  ChevronLeft,
  Play,
  CheckCircle2,
  Download,
  FileText,
  Clock,
  ExternalLink,
  Presentation,
  Table,
  Zap
} from 'lucide-react';
import { MODULE_DATA, Lesson } from '../src/lib/academy-data';

interface ModuleLessonsProps {
  moduleTitle: string;
  moduleDescription: string;
  moduleNumber: number;
  onBack: () => void;
  globalProgress: number;
  onUpdateProgress: (val: number) => void;
}

const ModuleLessons: React.FC<ModuleLessonsProps> = ({
  moduleTitle,
  moduleNumber,
  onBack,
  globalProgress,
  onUpdateProgress
}) => {
  const moduleData = MODULE_DATA[moduleNumber] || { lessons: [], materials: [] };
  const LESSONS = moduleData.lessons;
  const [currentLesson, setCurrentLesson] = useState<Lesson>(LESSONS[0]);

  const handleFinishLesson = () => {
    const currentIndex = LESSONS.findIndex(l => l.id === currentLesson.id);
    const nextLesson = LESSONS[currentIndex + 1];

    if (nextLesson) {
      setCurrentLesson(nextLesson);
      onUpdateProgress(globalProgress + 2);
      // Optional: Smooth scroll to top when changing lessons
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert('Parabéns! Você concluiu todas as aulas deste módulo.');
      onUpdateProgress(globalProgress + 5);
      onBack();
    }
  };

  const getLessonIcon = (lesson: Lesson, isActive: boolean) => {
    if (isActive) return <Play size={12} fill="currentColor" />;

    switch (lesson.type) {
      case 'pdf': return <FileText size={14} />;
      case 'spreadsheet': return <Table size={14} />;
      default: return <Play size={12} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#050507] overflow-hidden animate-in fade-in duration-700">
      <header className="h-16 md:h-20 border-b border-white/5 bg-[#08080A] px-4 md:px-10 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-3 md:gap-6 min-w-0">
          <button onClick={onBack} className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
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
            <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Playlist_Elite</h4>
          </div>
          <div className="flex-1 p-2 md:p-4 space-y-1">
            {LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={`w-full flex items-center gap-3 p-3 md:p-4 rounded-xl transition-all border text-left ${currentLesson.id === lesson.id ? 'bg-purple-600/10 border-purple-500/40' : 'bg-transparent border-transparent hover:bg-white/5'}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${currentLesson.id === lesson.id ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-700'}`}>
                  {getLessonIcon(lesson, currentLesson.id === lesson.id)}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className={`text-[11px] font-bold tracking-tight truncate ${currentLesson.id === lesson.id ? 'text-white' : 'text-gray-400'}`}>{lesson.title}</h5>
                  <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{lesson.duration || 'Recurso'}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1 overflow-y-auto bg-[#050507] p-4 md:p-14 space-y-6 md:space-y-12 no-scrollbar relative order-1 lg:order-2">
          <div className="space-y-6 animate-in slide-in-from-bottom-6">
            <div className="aspect-video w-full bg-black rounded-[24px] md:rounded-[40px] border border-white/10 overflow-hidden shadow-2xl relative group">
              {currentLesson.type === 'video' ? (
                <iframe
                  src={currentLesson.videoUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0C] p-6 md:p-8 text-center space-y-4 md:space-y-6">
                  <div className="w-16 h-16 md:w-32 md:h-32 rounded-2xl md:rounded-[32px] bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    {currentLesson.type === 'pdf' ? <FileText size={28} className="md:w-16 md:h-16" /> : <Table size={28} className="md:w-16 md:h-16" />}
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <h3 className="text-lg md:text-3xl font-black text-white italic uppercase">{currentLesson.title}</h3>
                    <p className="text-gray-500 text-[10px] md:text-lg italic max-w-md mx-auto opacity-70">Recurso externo_ Acesse o protocolo abaixo.</p>
                  </div>
                  <a
                    href={currentLesson.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] italic hover:scale-105 active:scale-95 transition-all shadow-2xl"
                  >
                    ACESSAR_RECURSO <ExternalLink size={14} className="md:w-4 md:h-4" />
                  </a>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-xl md:text-3xl font-black text-white tracking-tight italic uppercase">{currentLesson.title}</h2>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black text-purple-500 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{currentLesson.type}</span>
                  <p className="text-gray-500 text-sm md:text-lg italic opacity-70">Engenharia e visão estratégica Nexbuild.</p>
                </div>
              </div>
              <button onClick={handleFinishLesson} className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest italic shadow-xl hover:scale-105 active:scale-95 transition-all">
                Finalizar Aula <CheckCircle2 size={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/5 pt-8">
            <div className="lg:col-span-8 space-y-4">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic">Apoio_Elite_Protocol</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {moduleData.materials.map((mat: any, idx: number) => (
                  <div key={idx} className="bg-[#0F0F12] border border-white/5 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-purple-500/30 transition-all">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-purple-400 transition-colors">
                        <Download size={18} />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-[11px] font-bold text-white truncate">{mat.title || 'Recurso Adicional'}</h5>
                        <p className="text-[8px] text-gray-600 uppercase font-black tracking-tighter">{mat.type || 'DOC'} • {mat.size || 'O.MB'}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {moduleData.materials.length === 0 && (
                  <p className="text-[10px] text-gray-600 italic">Nenhum material de apoio adicional para este módulo.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};

export default ModuleLessons;