export interface Lesson {
    id: number;
    title: string;
    duration?: string;
    videoUrl?: string;
    externalLink?: string;
    type: 'video' | 'pdf' | 'spreadsheet';
}

export interface ModuleData {
    lessons: Lesson[];
    materials: any[];
}

export const MODULE_DATA: Record<number, ModuleData> = {
    1: {
        lessons: [
            { id: 1, title: 'Masterclass: Início da Jornada - Faturar Apps', duration: '12:45', videoUrl: 'https://www.youtube.com/embed/BJHU6lAHkW0', type: 'video' },
            { id: 2, title: 'Recurso: Protocolo Inicial de Engenharia (PDF)', duration: '05:00', externalLink: 'https://drive.google.com/file/d/1wFxhnEM-ntNAxO_RKYhCPJXDKm7nxMIy/view', type: 'pdf' },
            { id: 3, title: 'Recurso: Guia de Ecossistema Soberano (PDF)', duration: '08:20', externalLink: 'https://drive.google.com/file/d/1tvWqLFJF4Ygh5sff5on2EG234YWUU1-k/view', type: 'pdf' },
            { id: 4, title: 'Masterclass: Mercado de Prestação de Serviços', duration: '15:30', videoUrl: 'https://www.youtube.com/embed/7Z7XeTAT6Bw', type: 'video' },
            { id: 5, title: 'Recurso: Planilha de Operação Estratégica', duration: '10:00', externalLink: 'https://docs.google.com/spreadsheets/d/1pqlRWiY6kN8ryPrkbC2nXFJVi4UYfMEi/edit', type: 'spreadsheet' },
            { id: 6, title: 'Recurso: Checkpoint de Execução IA (PDF)', duration: '12:15', externalLink: 'https://drive.google.com/file/d/1NMuqMFIryOBadX_1hk6IW11CZqPb1Ge6/view', type: 'pdf' },
            { id: 7, title: 'Masterclass: Hierarquia das Ferramentas', duration: '20:45', videoUrl: 'https://www.youtube.com/embed/tIbW5oA6Nek', type: 'video' },
            { id: 8, title: 'Recurso: Roadmap de Escala e Resultados (PDF)', duration: '05:50', externalLink: 'https://drive.google.com/file/d/1Hj9Jpai-JeHzElOcpC0sstsfCjwfptwU/view', type: 'pdf' },
        ],
        materials: []
    },
    2: {
        lessons: [
            { id: 1, title: 'Masterclass: Criando um App funcional de tarefas na LOVABLE', videoUrl: 'https://www.youtube.com/embed/CaipuWkHUL4', type: 'video' },
            { id: 2, title: 'Masterclass: Ensinando Back-end na prática com a Lovable Cloud', videoUrl: 'https://www.youtube.com/embed/6vXg2cimcIU', type: 'video' },
            { id: 3, title: 'Masterclass: Back-end no Lovable com Supabase', videoUrl: 'https://www.youtube.com/embed/_1D8aissJX0', type: 'video' },
            { id: 4, title: 'Masterclass: Explicando de forma simples o que é o Front-end e o Back-end', videoUrl: 'https://www.youtube.com/embed/6cBf4l5sklI', type: 'video' },
            { id: 5, title: 'Masterclass: Criando um sistema para empresa com a Firebase Studio', videoUrl: 'https://www.youtube.com/embed/Zd8t0YrHv5A', type: 'video' },
            { id: 6, title: 'Masterclass: Back-end na Firebase Studio com o Firestore', videoUrl: 'https://www.youtube.com/embed/iWUJSajZDXQ', type: 'video' },
            { id: 7, title: 'Masterclass: Back-end na Firebase Studio com o Supabase', videoUrl: 'https://www.youtube.com/embed/XDO1SIq6EqM', type: 'video' },
            { id: 8, title: 'Masterclass: Criando um dashboard organizador de dados para empresas', videoUrl: 'https://www.youtube.com/embed/lh4NntIZgpE', type: 'video' },
            { id: 9, title: 'Masterclass: Back-end no Google AI Studio com LocalHost', videoUrl: 'https://www.youtube.com/embed/M3ur0F9XiaU', type: 'video' },
            { id: 10, title: 'Masterclass: Back-end no Google AI Studio na prática com o Supabase', videoUrl: 'https://www.youtube.com/embed/YolIjQA6blw', type: 'video' },
            { id: 11, title: 'Masterclass: Alternativas de Ferramentas de IA', videoUrl: 'https://www.youtube.com/embed/e0KA_F9OROg', type: 'video' },
            { id: 12, title: 'Masterclass: Alternativas de Bancos de Dados', videoUrl: 'https://www.youtube.com/embed/aPKHuwepyO8', type: 'video' },
        ],
        materials: []
    },
    3: {
        lessons: [
            { id: 1, title: 'Masterclass: Criando um portifólio profissional', videoUrl: 'https://www.youtube.com/embed/wNqbfXXWUqA', type: 'video' },
            { id: 2, title: 'Masterclass: Como não quebrar a sua estrutura', videoUrl: 'https://www.youtube.com/embed/EAYfxL2pRyA', type: 'video' },
            { id: 3, title: 'Recurso: Passos para alterações e atualizações (PDF)', externalLink: 'https://drive.google.com/file/d/1jip7s0G6n9yEneaEH2P4icGPb4oQ3Uhn/view', type: 'pdf' },
        ],
        materials: []
    },
    4: {
        lessons: [
            { id: 1, title: 'Masterclass: Passos para faturar e acelerar serviços', videoUrl: 'https://www.youtube.com/embed/YLbO-vEwa1c', type: 'video' },
            { id: 2, title: 'Recurso: Templates de Prospecção e Insights (PDF)', externalLink: 'https://drive.google.com/file/d/14mHc9UmiXonW1v3eQWrBvWrTUZc_nn6X/view', type: 'pdf' },
            { id: 3, title: 'Recurso: Segredos das Plataformas de Freelas (PDF)', externalLink: 'https://drive.google.com/file/d/1It123i8PVjrKOohIm3N3QZTS1X405N_g/view', type: 'pdf' },
        ],
        materials: []
    }
};
