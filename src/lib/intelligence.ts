import { supabase } from './supabase';

export interface UserContext {
    niche?: string;
    target_audience?: string;
    tone_of_voice?: string;
    main_objective?: string;
    sophistication_level?: string;
    learned_insights?: any[];
    total_interactions?: number;
}

export interface InteractionInput {
    feature: 'saas' | 'app' | 'lp' | 'copy' | 'site' | 'store';
    data: any;
    modelId?: string;
}

/**
 * Motor de Inteligência Soberano v4.0 - DEEP INFERENCE & ELITE SCRIPTS
 */
export const IntelligenceEngine = {
    // Base de Conhecimento Interna para Modelos do Catálogo
    MODEL_KNOWLEDGE: {
        'SYS-001': {
            niche: 'DELIVERY / HAMBURGUERIA',
            tech_stack: 'React + Vite, Tailwind, Supabase Realtime, Lucide Icons, Framer Motion.',
            features: ['Gestão de Pedidos em Tempo Real', 'Integração Direta WhatsApp API', 'Cardápio Dinâmico com Filtros HSL', 'Painel Administrativo de Cozinha'],
            data_model: 'Table: orders (id, customer_data, items_jsonb, total, status_enum), Table: menu_items (id, name, price, availability, category_id)',
            ux_strategy: 'Foco em Mobile-First, Checkout de 2 cliques, Animações de loading tipo "preparando pedido".'
        },
        'SYS-002': {
            niche: 'PIZZARIA DELIVERY',
            tech_stack: 'React, PostgREST, Framer Motion (para montagem de pizza), WhatsApp API.',
            features: ['Seletor de Tamanho e Bordas', 'Metade/Metade com cálculo proporcional', 'Acompanhamento em tempo real via Stepper', 'Histórico de Pedidos Favoritos'],
            data_model: 'Table: pizzas (customization_options), Table: deliveries (geodata, rider_id, status)',
            ux_strategy: 'Visual rico em imagens (Glassmorphism), seletores circulares, tom conversional.'
        },
        'SYS-003': {
            niche: 'E-COMMERCE / MODA',
            tech_stack: 'Next.js rendering style, Stripe/MercadoPago Integration, Supabase Storage.',
            features: ['Filtros Avançados (Tamanho, Cor, Coleção)', 'Lógica de Upsell no Carrinho', 'Gestão de Estoque Variacional', 'Visualização de Categorias Premium'],
            data_model: 'Table: products (sku, variations_jsonb, stock_level), Table: cart_sessions (user_id, items, expires_at)',
            ux_strategy: 'Minimalismo Apple Style, imagens full-screen, fontes Syne para títulos.'
        },
        'SYS-004': {
            niche: 'SERVIÇO / BARBEARIA PREMIUN',
            tech_stack: 'Supabase Database, FullCalendar.js Integration, SMS/Email Triggers.',
            features: ['Agendamento Inteligente com conflito zero', 'Lembretes Automáticos', 'Perfis de Profissionais com Avaliação', 'Venda de pacotes de recorrência'],
            data_model: 'Table: appointments (start_time, end_time, service_id, professional_id), Table: professionals (availability_window)',
            ux_strategy: 'Dark Mode High-Contrast, calendários intuitivos, botões de ação rápida.'
        }
    },

    async updateGlobalContext(userId: string, context: UserContext) {
        const { error } = await supabase.from('user_contexts').upsert({
            user_id: userId,
            ...context,
            updated_at: new Date().toISOString()
        });
        return { error };
    },

    async getUserContext(userId: string): Promise<UserContext | null> {
        const { data, error } = await supabase.from('user_contexts').select('*').eq('user_id', userId).single();
        return error ? null : data;
    },

    async generateProfessionalPrompt(userId: string, input: InteractionInput) {
        const { feature, data, modelId } = input;
        const contextData = await this.getUserContext(userId);

        // 1. INFERÊNCIA PROFUNDA (Knowledge Iniection)
        const modelKnowledge = modelId && this.MODEL_KNOWLEDGE[modelId as keyof typeof this.MODEL_KNOWLEDGE]
            ? this.MODEL_KNOWLEDGE[modelId as keyof typeof this.MODEL_KNOWLEDGE]
            : null;

        const { data: history } = await supabase
            .from('ai_interactions')
            .select('enriched_prompt, created_at')
            .eq('user_id', userId)
            .eq('feature', feature)
            .order('created_at', { ascending: false })
            .limit(3);

        const interactionCount = (contextData?.total_interactions || 0) + 1;

        // Atualiza cérebro
        await supabase.from('user_contexts').upsert({
            user_id: userId,
            total_interactions: interactionCount,
            updated_at: new Date().toISOString()
        });

        const appName = data.appName || data.projectName || (modelKnowledge ? `${modelKnowledge.niche} Elite` : "Protocol_Ultra");
        const niche = data.niche || modelKnowledge?.niche || contextData?.niche || 'SaaS Premium';

        let promptFinal = '';

        if (feature === 'copy') {
            const canal = data.channel || 'whatsapp';
            const person = data.targetPerson || 'Líder';
            const business = data.targetBusiness || 'operação';
            const userNm = data.userName || contextData?.niche || 'Estrategista';

            // Extração de Inteligência do Formulário
            const hook = data.hook || 'Tenho um insight estratégico para você';
            const dor = data.pain || 'gargalos operacionais que travam a escala';
            const solucao = data.solution || 'metodologia proprietária de aceleração';
            const promessa = data.promise || 'ter uma operação previsível e lucrativa';
            const segmento = data.marketSegment || data.niche || 'Mercado Geral';

            // Construção Analítica do Script (Hiper-Personalizado)
            let finalScript = '';

            const saudar = (n: string) => {
                const h = new Date().getHours();
                const saudacao = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
                return `${saudacao} ${n.split(' ')[0]}`;
            }

            if (canal === 'whatsapp') {
                finalScript = `${saudar(person)}, ${userNm.split(' ')[0]} aqui.

${hook}. Analisando a ${business}, percebi que ${dor} é o que está impedindo você de ${promessa} hoje.

Eu resolvo isso exatamente através de ${solucao}. Minha abordagem no setor de ${segmento} é focada em eliminar esse dreno e destravar sua escala.

Topa dar uma olhada no diagnóstico que preparei para você?`;
            } else if (canal === 'instagram') {
                finalScript = `Fala ${person.split(' ')[0]}! ${hook} sobre a ${business}.

Notei que ${dor} está travando seus resultados. Usando ${solucao}, conseguimos reverter isso para você finalmente ${promessa}. 

Te mandei um diagnóstico no direct. Podemos falar sobre isso?`;
            } else if (canal === 'linkedin') {
                finalScript = `Olá ${person}, sigo o trabalho da ${business} e identifiquei que ${dor} é um desafio comum em ${segmento}.

Minha especialidade é aplicar ${solucao} para gerar ${promessa}. Acredito que temos uma sinergia grande para otimizar sua operação atual.

Gostaria de compartilhar o que analisei sobre sua estrutura. Teria agenda para um breve call?`;
            } else {
                finalScript = `Assunto: Análise Estratégica: ${business} e a meta de ${promessa}

Olá ${person},

Ao estudar o posicionamento da ${business} no setor de ${segmento}, ficou claro que ${dor} é o dreno de caixa que precisa ser estancado.

Implementamos ${solucao} justamente para proporcionar ${promessa} de forma soberana e automática.

Preparei um documento detalhando essa transição para você. Responda se deseja que eu envie o documento.`;
            }

            promptFinal = `### PROTOCOL: SCRIPT PERSONALIZADO 💎
[STATUS: ANÁLISE CONCLUÍDA]

${finalScript}

[REGRAS: Estritamente personalizado para ${person} - Canal ${canal.toUpperCase()}]`;
        } else {
            // PROMPT PARA APP / SAAS / LP (Briefing Arquitetural soberano)
            promptFinal = `### ARCHITECTURAL MASTER-BRIEFING: ${appName.toUpperCase()} 🚀
[ROLE: CHIEF PRODUCT OFFICER & SOFTWARE ARCHITECT SENIOR]

#### 1. PRODUCT VISION & MARKET FIT
- **SaaS Name**: ${appName}
- **Master Objective**: ${data.objective || (modelKnowledge ? modelKnowledge.features.join(', ') : 'Dominar o mercado via tecnologia elite.')}
- **Core Niche**: ${niche}
- **Target Audience**: ${contextData?.target_audience || 'Power Users & Decision Makers'}

#### 2. TECH STACK & ENGINE INTEGRATION (DEEP SPEC)
- **Engine Optimization**: Optimized for ${data.aiPlatform || 'Lovable / Bolt / v0'}.
- **Front-end Stack**: ${modelKnowledge?.tech_stack || 'React, Tailwind, Framer Motion, Lucide Icons.'}
- **State Management**: Shared Context API or Zustand for global responsiveness.

#### 3. ARCHITECTURAL BLUEPRINT (THE SOVEREIGN FATURESET)
${modelKnowledge ? modelKnowledge.features.map(f => `- [CRITICAL] ${f}`).join('\n') : `- [CRITICAL] Full Onboarding Experience\n- [CRITICAL] Real-time Dashboard Analytics\n- [CRITICAL] AI-Powered Content Generation`}
- **Additional Specs**: ${data.pages || 'Auth Flow, Core App, Admin Panel, Settings.'}

#### 4. DATA MODELING (RELATIONAL SCHEMA)
${modelKnowledge ? `[MODEL_SUGGESTION]\n${modelKnowledge.data_model}` : '[GENERIC_DATA_MODEL]\nTable: users, Table: projects, Table: activities, Table: logs'}

#### 5. THE DESIGN SYSTEM (SOBERANO DESIGN)
- **Design Tokens**: ${data.designStyle || 'Elite Glassmorphism'} / ${data.colorPalette || 'Modern Dark'}
- **Visual Identity**: High usage of Blur [120px], subtle gradients (#A855F7), and Syne font for headlines.

#### 6. STEP-BY-STEP IMPLEMENTATION LOGIC
1. Initialize the Base Layout with the Sovereign Design System.
2. Setup Supabase Auth & DB connections as per the Data Model.
3. Build the ${data.pages || 'Core UI'} following the UX strategy: ${modelKnowledge?.ux_strategy || 'Foco em conversão e rapidez.'}
4. Optimize for Mobile Performance and Edge delivery.

[END OF PROTOCOL - EXECUTE WITH MAXIMUM PRECISION]`;
        }

        // Persistência Histórica
        await supabase.from('ai_interactions').insert({
            user_id: userId,
            feature: feature,
            prompt_input: data,
            enriched_prompt: promptFinal,
            model_id: modelId
        });

        return promptFinal;
    }
};
