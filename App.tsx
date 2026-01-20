import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileMenuButton from './components/MobileMenuButton';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import SaaS from './components/SaaS';
import ModelCatalog from './components/ModelCatalog';
import AppWizard from './components/AppWizard';
import PromptResult from './components/PromptResult';
import Projects from './components/Projects';
import LandingPages from './components/LandingPages';
import Prospector from './components/Prospector';
import Copywriter from './components/Copywriter';
import Contracts from './components/Contracts';
import Academy from './components/Academy';
import Team from './components/Team';
import Help from './components/Help';
import LoginPage from './components/LoginPage';
import Challenge8D from './components/Challenge8D';
import { supabase } from './src/lib/supabase';
import { IntelligenceEngine } from './src/lib/intelligence';

export interface Project {
  id: string;
  name: string;
  category: string;
  platform: string;
  updatedAt: string;
  createdAt: string;
  promptData?: any;
}

export interface UserData {
  name: string;
  email: string;
  company: string;
  role: string;
  photo: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Ativo' | 'Convidado';
  avatar?: string;
}

export interface UserActivity {
  id: string;
  label: string;
  description: string;
  time: string;
  type: 'project' | 'lead' | 'contract' | 'profile' | 'system' | 'academy' | 'challenge' | 'team';
}

export interface ChallengeDayProgress {
  day: number;
  completedAt: number;
}

const NEUTRAL_USER: UserData = {
  name: "",
  email: "",
  company: "",
  role: "",
  photo: ""
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUid, setCurrentUid] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [saasView, setSaasView] = useState<'landing' | 'catalog' | 'wizard' | 'result'>('landing');
  const [projectData, setProjectData] = useState<any>(null);

  const [userData, setUserData] = useState<UserData>(NEUTRAL_USER);
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [academyProgress, setAcademyProgress] = useState(0);
  const [challengeProgress, setChallengeProgress] = useState<ChallengeDayProgress[]>([]);

  const SESSION_KEY = 'nb_active_session_uid';

  useEffect(() => {
    // Escutar mudanças na autenticação do Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        const uid = session.user.email.toLowerCase().trim();
        setCurrentUid(uid);
        setIsLoggedIn(true);
      } else {
        setCurrentUid(null);
        setIsLoggedIn(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!currentUid) {
      setUserData(NEUTRAL_USER);
      setProjects([]);
      setLeads([]);
      setContracts([]);
      setTeamMembers([]);
      setAcademyProgress(0);
      setActivities([]);
      setChallengeProgress([]);
      return;
    }

    const prefix = `nexbuild_${currentUid}_`;
    const savedProfile = localStorage.getItem(`${prefix}profile`);
    const savedProjects = localStorage.getItem(`${prefix}projects`);
    const savedLeads = localStorage.getItem(`${prefix}leads`);
    const savedContracts = localStorage.getItem(`${prefix}contracts`);
    const savedTeam = localStorage.getItem(`${prefix}team`);
    const savedProgress = localStorage.getItem(`${prefix}academy_progress`);
    const savedActivities = localStorage.getItem(`${prefix}activities`);
    const savedChallenge = localStorage.getItem(`${prefix}challenge_8d`);

    setUserData(savedProfile ? JSON.parse(savedProfile) : { ...NEUTRAL_USER, email: currentUid });
    setProjects(savedProjects ? JSON.parse(savedProjects) : []);
    setLeads(savedLeads ? JSON.parse(savedLeads) : []);
    setContracts(savedContracts ? JSON.parse(savedContracts) : []);
    setTeamMembers(savedTeam ? JSON.parse(savedTeam) : [
      { id: '1', name: 'Você (Master)', email: currentUid, role: 'Proprietário', status: 'Ativo' }
    ]);
    setAcademyProgress(savedProgress ? JSON.parse(savedProgress) : 0);
    setActivities(savedActivities ? JSON.parse(savedActivities) : []);
    setChallengeProgress(savedChallenge ? JSON.parse(savedChallenge) : []);

    if (!savedProfile) {
      addActivity('Bem-vindo', 'Seu ambiente operacional foi materializado com sucesso.', 'system');
    }
  }, [currentUid]);

  const addActivity = useCallback((label: string, description: string, type: UserActivity['type']) => {
    if (!currentUid) return;
    const prefix = `nexbuild_${currentUid}_`;

    const newActivity: UserActivity = {
      id: Date.now().toString(),
      label,
      description,
      time: 'Agora',
      type
    };

    setActivities(prev => {
      const updated = [newActivity, ...prev].slice(0, 15);
      localStorage.setItem(`${prefix}activities`, JSON.stringify(updated));
      return updated;
    });
  }, [currentUid]);

  const handleUpdateUser = async (newData: UserData) => {
    if (!currentUid) return;
    const prefix = `nexbuild_${currentUid}_`;
    setUserData(newData);
    localStorage.setItem(`${prefix}profile`, JSON.stringify(newData));

    // Sincronizar com a Camada de Inteligência no Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await IntelligenceEngine.updateGlobalContext(user.id, {
        niche: newData.company,
        tone_of_voice: 'Profissional', // Padrão inteligente
        sophistication_level: 'Premium'
      });
    }

    addActivity('Perfil Atualizado', 'Sincronização de identidade concluída.', 'profile');
  };

  const handleUpdateProjects = (newProjects: Project[]) => {
    if (!currentUid) return;
    const prefix = `nexbuild_${currentUid}_`;
    setProjects(newProjects);
    localStorage.setItem(`${prefix}projects`, JSON.stringify(newProjects));
  };

  const handleUpdateLeads = (newLeads: any[]) => {
    if (!currentUid) return;
    const prefix = `nexbuild_${currentUid}_`;
    setLeads(newLeads);
    localStorage.setItem(`${prefix}leads`, JSON.stringify(newLeads));
    addActivity('CRM Atualizado', 'Base de leads sincronizada com o funil.', 'lead');
  };

  const handleUpdateContracts = (newContracts: any[]) => {
    if (!currentUid) return;
    const prefix = `nexbuild_${currentUid}_`;
    setContracts(newContracts);
    localStorage.setItem(`${prefix}contracts`, JSON.stringify(newContracts));
    addActivity('Contratos Sincronizados', 'A base jurídica foi atualizada.', 'contract');
  };

  const handleUpdateTeamMembers = (newTeam: TeamMember[]) => {
    if (!currentUid) return;
    const prefix = `nexbuild_${currentUid}_`;
    setTeamMembers(newTeam);
    localStorage.setItem(`${prefix}team`, JSON.stringify(newTeam));
    addActivity('Equipe Atualizada', 'A base de colaboradores foi sincronizada.', 'team');
  };

  const handleUpdateAcademyProgress = (newProgress: number) => {
    if (!currentUid) return;
    const prefix = `nexbuild_${currentUid}_`;
    const val = Math.min(newProgress, 100);
    setAcademyProgress(val);
    localStorage.setItem(`${prefix}academy_progress`, JSON.stringify(val));
    if (val > academyProgress) {
      addActivity('Progresso Academy', `Novo módulo concluído: ${val}% atingido.`, 'academy');
    }
  };

  const handleUpdateChallenge = (completedDays: ChallengeDayProgress[]) => {
    if (!currentUid) return;
    const prefix = `nexbuild_${currentUid}_`;
    setChallengeProgress(completedDays);
    localStorage.setItem(`${prefix}challenge_8d`, JSON.stringify(completedDays));
    if (completedDays.length > challengeProgress.length) {
      const lastDay = completedDays[completedDays.length - 1];
      addActivity('Desafio 8D', `Missão do Dia ${lastDay.day} concluída.`, 'challenge');
    }
  };

  const addProjectToList = (data: any) => {
    const newProject: Project = {
      id: Math.random().toString(36).substring(2, 11),
      name: data.appName || "Nova Aplicação",
      category: (data.mainTask || data.niche || "Geral").toUpperCase(),
      platform: data.aiPlatform || "Lovable",
      updatedAt: "há poucos segundos",
      createdAt: new Date().toLocaleDateString('pt-BR'),
      promptData: data
    };
    const updated = [newProject, ...projects];
    handleUpdateProjects(updated);
    addActivity('Projeto Materializado', `A estrutura de ${newProject.name} foi forjada.`, 'project');
  };

  const deleteProject = (id: string) => {
    const projectToDelete = projects.find(p => p.id === id);
    if (projectToDelete) {
      addActivity('Projeto Arquivado', `O projeto ${projectToDelete.name} foi removido.`, 'project');
    }
    handleUpdateProjects(projects.filter(p => p.id !== id));
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setIsSidebarOpen(false);
    if (id === 'saas' || id === 'materializar_sas') {
      setActiveTab('saas');
      setSaasView('landing');
    }
  };

  const handleWizardComplete = (data: any) => {
    const payload = { ...data, type: 'new' };
    setProjectData(payload);
    addProjectToList(payload);
    setSaasView('result');
  };

  const handleUpdateComplete = (data: any) => {
    setProjectData(data);
    if (data.type === 'new') {
      addProjectToList(data);
    } else {
      addActivity('Upgrade Técnico', `Novo prompt gerado para ${data.projectName}.`, 'system');
    }
    setActiveTab('saas');
    setSaasView('result');
  };

  const handleLogin = (email: string, remember: boolean) => {
    const uid = email.toLowerCase().trim();
    if (remember) {
      localStorage.setItem(SESSION_KEY, uid);
    }
    setCurrentUid(uid);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(SESSION_KEY);
    setIsLoggedIn(false);
    setCurrentUid(null);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <Header userName={userData.name || userData.email || "Usuário"} onOpenMenu={() => setIsSidebarOpen(true)} />
            <div className="p-4 md:px-10 md:pb-10 max-w-[1600px] w-full mx-auto relative z-10">
              <Dashboard projectsCount={projects.length} activities={activities} onTabChange={handleTabChange} />
            </div>
          </>
        );
      case 'saas':
      case 'materializar_sas':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto h-full flex flex-col relative z-10">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            {saasView === 'landing' ? (
              <SaaS
                onOpenCatalog={() => setSaasView('catalog')}
                onOpenWizard={() => setSaasView('wizard')}
              />
            ) : saasView === 'catalog' ? (
              <ModelCatalog
                onBack={() => setSaasView('landing')}
                onGenerateUpdate={handleUpdateComplete}
              />
            ) : saasView === 'wizard' ? (
              <AppWizard
                onBack={() => setSaasView('landing')}
                onComplete={handleWizardComplete}
              />
            ) : (
              <PromptResult
                data={projectData}
                onBack={() => setSaasView('landing')}
              />
            )}
          </div>
        );
      case 'projects':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto relative z-10">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            <Projects
              projects={projects}
              onDeleteProject={deleteProject}
              onNewProject={() => {
                setActiveTab('saas');
                setSaasView('wizard');
              }}
              onGenerateUpdate={handleUpdateComplete}
            />
          </div>
        );
      case 'lp':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto relative z-10">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            <LandingPages onGenerateUpdate={handleUpdateComplete} />
          </div>
        );
      case 'prospector':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto relative z-10 h-full overflow-y-auto">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            <Prospector />
          </div>
        );
      case 'copywriter':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto relative z-10">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            <Copywriter
              leads={leads}
              onUpdateLeads={handleUpdateLeads}
            />
          </div>
        );
      case 'contracts':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto relative z-10">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            <Contracts
              contracts={contracts}
              onUpdateContracts={handleUpdateContracts}
            />
          </div>
        );
      case 'academy':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto relative z-10">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            <Academy
              progress={academyProgress}
              onUpdateProgress={handleUpdateAcademyProgress}
              onOpenChallenge={() => handleTabChange('challenge8d')}
              challengeProgressPercent={Math.round((challengeProgress.length / 8) * 100)}
            />
          </div>
        );
      case 'team':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto relative z-10">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            <Team members={teamMembers} onUpdateMembers={handleUpdateTeamMembers} />
          </div>
        );
      case 'challenge8d':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto relative z-10">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            <Challenge8D
              completedDays={challengeProgress}
              onUpdateProgress={handleUpdateChallenge}
            />
          </div>
        );
      case 'help':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto h-full flex flex-col relative z-10">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            <Help />
          </div>
        );
      case 'settings':
        return (
          <div className="p-4 md:px-10 py-4 md:py-10 max-w-[1600px] w-full mx-auto relative z-10">
            <MobileMenuButton onOpenMenu={() => setIsSidebarOpen(true)} />
            <Settings user={userData} onUpdateUser={handleUpdateUser} />
          </div>
        );
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-[#050507] text-[#94A3B8] selection:bg-white/10 antialiased font-['Inter'] relative overflow-hidden">
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-white/[0.01] blur-[120px] rounded-full pointer-events-none" />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onLogout={handleLogout}
        userName={userData.name || userData.email || "Usuário"}
        userRole={userData.role || "Acesso Master"}
        userPhoto={userData.photo}
        academyProgress={academyProgress}
      />

      <main className="flex-1 flex flex-col transition-all duration-300 md:ml-72 w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;