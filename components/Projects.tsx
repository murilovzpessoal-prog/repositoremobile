import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Zap, 
  Clock, 
  Calendar
} from 'lucide-react';
import ProjectEdit from './ProjectEdit';
import { Project } from '../App';

interface ProjectsProps {
  projects: Project[];
  onDeleteProject: (id: string) => void;
  onNewProject: () => void;
  onGenerateUpdate: (data: any) => void;
}

const ProjectCard: React.FC<{ project: Project; onEdit: (p: Project) => void; onDelete: (id: string) => void }> = ({ project, onEdit, onDelete }) => {
  return (
    <div 
      onClick={() => onEdit(project)}
      className="group bg-[#0F0F12] border border-white/5 rounded-[24px] p-6 md:p-8 flex flex-col space-y-6 md:space-y-8 hover:border-[#7C3AED]/40 transition-all duration-300 shadow-xl cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between relative z-10">
        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{project.name}</h3>
        <span className="px-2 py-0.5 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-md text-[8px] font-black text-[#A855F7] uppercase tracking-widest">
          {project.category}
        </span>
      </div>

      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-3 text-gray-500">
          <Zap size={12} className="text-[#A855F7]" />
          <p className="text-[10px] md:text-xs font-medium">PLATAFORMA: <span className="text-white ml-1">{project.platform}</span></p>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <Clock size={12} />
          <p className="text-[10px] md:text-xs font-medium">ATUALIZADO: <span className="text-white ml-1">{project.updatedAt}</span></p>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <Calendar size={12} />
          <p className="text-[10px] md:text-xs font-medium">CRIADO EM: <span className="text-white ml-1">{project.createdAt}</span></p>
        </div>
      </div>

      <div className="pt-3 flex items-center justify-end gap-4 relative z-10">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(project); }}
          className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          EDITAR
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
          className="text-[10px] font-bold text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest"
        >
          EXCLUIR
        </button>
      </div>
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ projects, onDeleteProject, onNewProject, onGenerateUpdate }) => {
  const [search, setSearch] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  if (editingProject) {
    return <ProjectEdit 
      project={editingProject} 
      onBack={() => setEditingProject(null)} 
      onGenerate={onGenerateUpdate}
    />;
  }

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-[40px] font-bold text-white tracking-tighter leading-none italic">
            Meus <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 pr-2">Projetos</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium max-w-xl">
            Selecione um projeto para carregar e solicitar atualizações.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group flex-1 md:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0F0F12] border border-white/5 rounded-full pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED] transition-all w-full md:w-48 font-medium"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0F0F12] border border-white/5 rounded-full text-[10px] font-bold text-white hover:border-white/10 transition-all">
            <SlidersHorizontal size={12} className="text-gray-500" />
            Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        <button 
          onClick={onNewProject}
          className="group flex flex-col items-center justify-center space-y-4 rounded-[28px] border-2 border-dashed border-white/10 bg-transparent hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all duration-300 min-h-[240px] md:min-h-[300px]"
        >
          <div className="w-12 h-12 rounded-full bg-[#16161A] border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-[#7C3AED] group-hover:scale-110 transition-all shadow-xl">
            <Plus size={24} />
          </div>
          <span className="text-xs font-bold text-gray-600 group-hover:text-white transition-colors uppercase tracking-widest">Novo Projeto</span>
        </button>

        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onEdit={(p) => setEditingProject(p)} 
            onDelete={onDeleteProject} 
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;