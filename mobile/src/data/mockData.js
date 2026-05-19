export const COLORS = {
  navyDark:   '#0a0f1e',
  navyMid:    '#0d1327',
  navyLight:  '#111827',
  blue:       '#2563eb',
  blueHover:  '#1d4ed8',
  bgLight:    '#f8f9fb',
  white:      '#ffffff',
  textDark:   '#111827',
  textMid:    '#4b5563',
  textMuted:  '#9ca3af',
  border:     '#e5e7eb',
  green:      '#22c55e',
};

export const teamMembers = [
  { id: '1', initials: 'FA', nome: 'Felipe Almeida Albino', cargo: 'Product Owner & Dev Full Stack', cor: '#2563eb' },
  { id: '2', initials: 'RV', nome: 'Reuel Vinicius',        cargo: 'Dev Back-end & DBA',             cor: '#10b981' },
  { id: '3', initials: 'NF', nome: 'Nathan Feitoza',        cargo: 'Dev Full Stack & UX Designer',   cor: '#8b5cf6' },
  { id: '4', initials: 'ML', nome: 'Murilo Lacerda',        cargo: 'Dev Front-end & QA',             cor: '#f59e0b' },
];

export const services = [
  { id: '1', icon: 'globe',      titulo: 'Sites Profissionais', desc: 'Sites modernos, responsivos e otimizados para SEO que convertem visitantes em clientes.', bg: '#dbeafe', color: '#2563eb' },
  { id: '2', icon: 'smartphone', titulo: 'Apps Mobile',         desc: 'Aplicativos iOS e Android de alta performance com UI/UX impecável e entrega ágil.',        bg: '#d1fae5', color: '#10b981' },
  { id: '3', icon: 'settings',   titulo: 'Sistemas Web',        desc: 'Plataformas e sistemas customizados com painel admin, automações e integrações.',          bg: '#ede9fe', color: '#8b5cf6' },
  { id: '4', icon: 'zap',        titulo: 'Performance & SEO',   desc: 'Otimização técnica para velocidade máxima, melhor ranqueamento e mais conversões.',         bg: '#ffedd5', color: '#f59e0b' },
];

export const steps = [
  { num: '01', titulo: 'Briefing',              desc: 'Entendemos seu projeto, metas e público alvo em uma reunião rápida.' },
  { num: '02', titulo: 'Design & Prototipagem', desc: 'Criamos o visual no Figma e apresentamos para sua aprovação.' },
  { num: '03', titulo: 'Desenvolvimento',       desc: 'Programamos com as melhores tecnologias: React, Next.js, Node.' },
  { num: '04', titulo: 'Entrega & Suporte',     desc: 'Lançamos o projeto e oferecemos suporte contínuo 24/7.' },
];

export const testimonials = [
  { id: '1', initials: 'CA', cor: '#2563eb', nome: 'Carlos Silva',   cargo: 'CEO MercadoBR',       texto: '"A Dev4all transformou nosso negócio! O site ficou incrível e as vendas aumentaram 3x em 60 dias."' },
  { id: '2', initials: 'AN', cor: '#10b981', nome: 'Ana Beatriz',    cargo: 'Fundadora StartupX',  texto: '"Equipe super profissional, prazo cumprido e suporte excelente. Recomendo 100% para qualquer empresa."' },
  { id: '3', initials: 'RO', cor: '#8b5cf6', nome: 'Roberto Lima',   cargo: 'CTO TechFlow',        texto: '"O app mobile superou todas as expectativas. Interface linda, rápido e sem bugs. Melhor investimento!"' },
];

export const projects = [
  { id: '1', titulo: 'E-commerce ModaFácil',       descricao: 'Plataforma completa de vendas online com painel admin, carrinho e pagamento integrado.', categorias: ['Desenvolvimento', 'Design'],     tecnologias: ['React', 'Node.js', 'MongoDB'],      imagemUrl: 'https://picsum.photos/seed/ecom/600/360',  destaque: true  },
  { id: '2', titulo: 'App de Agendamento MedFácil', descricao: 'Aplicativo mobile para agendamento de consultas médicas com notificações em tempo real.',  categorias: ['Mobile', 'Saúde'],               tecnologias: ['React Native', 'Firebase'],          imagemUrl: 'https://picsum.photos/seed/med/600/360',   destaque: true  },
  { id: '3', titulo: 'Dashboard Financeiro FinView', descricao: 'Painel de gestão financeira com gráficos interativos e relatórios exportáveis.',          categorias: ['Desenvolvimento', 'Dashboard'],   tecnologias: ['Vue.js', 'Node.js', 'PostgreSQL'],  imagemUrl: 'https://picsum.photos/seed/fin/600/360',   destaque: false },
  { id: '4', titulo: 'Site Institucional AdvSouza',  descricao: 'Site moderno e responsivo para escritório de advocacia com blog e área do cliente.',      categorias: ['Design', 'Web'],                 tecnologias: ['Next.js', 'Tailwind CSS'],           imagemUrl: 'https://picsum.photos/seed/adv/600/360',   destaque: false },
  { id: '5', titulo: 'Sistema de Gestão EduTrack',   descricao: 'Plataforma educacional com gestão de alunos, notas, frequência e comunicados.',           categorias: ['Desenvolvimento', 'Educação'],    tecnologias: ['React', 'Express', 'MySQL'],         imagemUrl: 'https://picsum.photos/seed/edu/600/360',   destaque: true  },
  { id: '6', titulo: 'Landing Page NovaPay',         descricao: 'Landing page de alta conversão para fintech com animações e integração de formulários.',  categorias: ['Design', 'Web'],                 tecnologias: ['Next.js', 'Framer Motion'],          imagemUrl: 'https://picsum.photos/seed/nova/600/360',  destaque: false },
];

export const brands = ['StartupX', 'MercadoBR', 'TechFlow', 'BuildCo', 'NovaPay', 'AgileHub'];

export const values = [
  { icon: 'zap',     titulo: 'Inovação',        desc: 'Utilizamos as tecnologias mais modernas para criar soluções eficientes e escaláveis.', bg: '#dbeafe', color: '#2563eb' },
  { icon: 'award',   titulo: 'Qualidade',        desc: 'Entregamos projetos com alto padrão de código, performance e experiência do usuário.', bg: '#d1fae5', color: '#10b981' },
  { icon: 'users',   titulo: 'Comprometimento',  desc: 'Cumprimos prazos e mantemos comunicação transparente em todas as etapas do projeto.', bg: '#ede9fe', color: '#8b5cf6' },
  { icon: 'star',    titulo: 'Excelência',       desc: 'Cada detalhe importa. Revisamos e otimizamos até que o produto esteja perfeito.',     bg: '#ffedd5', color: '#f59e0b' },
];
