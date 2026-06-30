# Dev4all — Agência de Desenvolvimento Digital

Aplicação full stack mobile desenvolvida como trabalho de faculdade. O projeto consiste em um app mobile em React Native integrado a um backend Node.js com banco de dados MongoDB Atlas.

---

## Integrantes da Equipe

| Nome | Papel |
|---|---|
| Felipe Almeida Albino | Product Owner & Dev Full Stack |
| Reuel Vinicius | Dev Back-end & DBA |
| Nathan Feitoza | Dev Full Stack & UX Designer |
| Murilo Lacerda | Dev Front-end & QA |

---

## Descrição da Aplicação

O **Dev4all** é o sistema digital da agência de desenvolvimento Dev4all. Permite que clientes conheçam os serviços e portfólio da empresa, solicitem orçamentos, acompanhem o status dos seus pedidos e gerenciem sua conta. Administradores têm controle total sobre projetos e orçamentos via painel web.

**Funcionalidades principais:**
- Portfólio de projetos carregado do banco de dados
- Formulário de orçamento com código de rastreio único
- Autenticação completa (login / cadastro / perfil)
- Histórico de orçamentos do usuário logado
- Equipe carregada do banco de dados
- Painel web para administração (CRUD completo)

---

## Tecnologias Utilizadas

### Mobile
- React Native + Expo SDK 54
- React Navigation v7 (Bottom Tabs + Stack Navigator)
- react-native-reanimated ~4.1.1
- react-native-safe-area-context
- Context API (gerenciamento de autenticação)
- Fetch API nativa (comunicação HTTP com o backend)

### Backend
- Node.js + Express 4
- MongoDB Atlas + Mongoose 9
- JWT (jsonwebtoken) para autenticação stateless
- bcryptjs para hash de senhas
- Apollo Server + GraphQL (endpoint alternativo)
- Helmet, CORS, express-rate-limit (segurança)

### Website (Frontend Web)
- HTML5 + CSS3 + JavaScript puro
- Servido como estático pelo próprio backend Express

---

## Estrutura do Projeto

```
Dev4all-mobile/
├── backend/
│   ├── public/             # Website estático (HTML/CSS/JS)
│   │   ├── css/
│   │   ├── js/
│   │   ├── index.html
│   │   ├── portfolio.html
│   │   ├── sobre.html
│   │   ├── contato.html
│   │   └── painel.html
│   └── src/
│       ├── app.js          # Configuração do Express
│       ├── server.js       # Ponto de entrada
│       ├── config/         # Conexão DB e JWT
│       ├── controllers/    # Lógica de negócio (auth, projects, quotes, team)
│       ├── middlewares/    # Auth, validação, tratamento de erros
│       ├── models/         # Schemas Mongoose (User, Project, Quote, TeamMember)
│       ├── routes/         # Rotas da API REST
│       ├── graphql/        # Schema e resolvers GraphQL
│       ├── scripts/        # seed.js, create-admin.js
│       └── validators/     # Schemas Joi para validação
└── mobile/
    ├── App.js
    └── src/
        ├── context/        # AuthContext (estado global de autenticação)
        ├── data/           # mockData.js (cores e constantes de UI estáticas)
        ├── navigation/     # AppNavigator (Tab + Stack)
        ├── screens/        # HomeScreen, PortfolioScreen, SobreScreen,
        │                   # ContactScreen, LoginScreen, RegistroScreen,
        │                   # ProfileScreen, ProjectDetailScreen
        └── services/       # api.js (toda a comunicação HTTP com o backend)
```

---

## Endpoints da API

### Auth — `/api/auth`

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/auth/register` | Público | Criar conta |
| POST | `/auth/login` | Público | Fazer login |
| GET | `/auth/me` | Autenticado | Dados do usuário logado |

### Projetos — `/api/projects`

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | `/projects` | Público | Listar projetos ativos |
| GET | `/projects/:id` | Público | Buscar projeto por ID |
| POST | `/projects` | Admin | Criar projeto |
| PATCH | `/projects/:id` | Admin | Atualizar projeto |
| DELETE | `/projects/:id` | Admin | Desativar projeto (soft delete) |

### Orçamentos — `/api/quotes`

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/quotes` | Público | Enviar orçamento |
| GET | `/quotes/track/:codigo` | Público | Rastrear por código de 6 dígitos |
| GET | `/quotes/my` | Autenticado | Meus orçamentos |
| GET | `/quotes` | Admin | Listar todos os orçamentos |
| GET | `/quotes/:id` | Autenticado | Buscar orçamento por ID |
| PATCH | `/quotes/:id/status` | Admin | Atualizar status do orçamento |
| DELETE | `/quotes/:id` | Admin | Remover orçamento |

### Equipe — `/api/team`

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | `/team` | Público | Listar membros da equipe |
| POST | `/team` | Admin | Adicionar membro |
| PATCH | `/team/:id` | Admin | Atualizar membro |
| DELETE | `/team/:id` | Admin | Remover membro |

---

## Modelagem do Banco de Dados

### User
```
nomeCompleto  String       obrigatório
email         String       único, obrigatório
senha         String       hash bcrypt, obrigatório
role          String       'cliente' | 'admin'  (default: 'cliente')
ativo         Boolean      default: true
```

### Project
```
titulo        String       obrigatório
descricao     String       obrigatório
categorias    [String]     enum: Desenvolvimento | Design | Mobile | Web | Dashboard | Consultoria | Marketing | Outro
tecnologias   [String]     lista de stacks utilizadas
imagemUrl     String       URL da imagem de capa
destaque      Boolean      default: false
ativo         Boolean      default: true  (soft delete)
criadoPor     ObjectId     ref → User
```

### Quote (Orçamento)
```
nomeCompleto    String     obrigatório
email           String     obrigatório
telefone        String     obrigatório
tipoServico     [String]   enum: Consultoria | Desenvolvimento | Design | Marketing | Outro (mín. 1)
descricao       String     obrigatório
status          String     pendente | em_analise | aprovado | rejeitado
codigoRastreio  String     6 dígitos, gerado automaticamente, único
usuario         ObjectId   ref → User (opcional)
```

### TeamMember
```
nome      String    obrigatório
cargo     String    obrigatório
bio       String
cor       String    hex da cor do avatar
ordem     Number    para ordenação
ativo     Boolean
```

---

## Instruções para Execução

### Pré-requisitos
- Node.js >= 18
- **Expo Go SDK 54** instalado no celular
  - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
  - > ⚠️ Este projeto utiliza **Expo SDK 54**. O Expo Go deve estar na versão compatível com SDK 54. Caso o app não abra, atualize o Expo Go pela loja de aplicativos do seu dispositivo.

### 1. Backend

```bash
cd backend
npm install

# Popula o banco com projetos, equipe e orçamentos de exemplo
npm run seed

# Inicia o servidor em modo desenvolvimento (porta 3000)
npm run dev
```

O website estará disponível em: `http://localhost:3000`

**Credenciais admin padrão (após rodar o seed):**
```
Email: admin@dev4all.com
Senha: admin
```

### 2. App Mobile

```bash
cd mobile
npm install
```

Edite [`src/services/api.js`](mobile/src/services/api.js) e substitua o IP pelo endereço local da máquina que roda o backend:

```js
const BASE_URL = 'http://SEU_IP_LOCAL:3000/api';
```

Para descobrir seu IP: execute `ipconfig` (Windows) ou `ifconfig` (Mac/Linux) e use o **Endereço IPv4** da rede Wi-Fi.

```bash
npx expo start
```

Escaneie o QR Code com o **Expo Go**. O celular e o computador devem estar na **mesma rede Wi-Fi**.

### 3. Website

Após iniciar o backend, acesse `http://localhost:3000` no navegador.

---

## Checklist de Requisitos

- [x] App mobile em React Native integrado ao backend
- [x] Backend em Node.js com Express
- [x] Banco de dados MongoDB Atlas
- [x] Persistência de dados real (sem mock para entidades principais)
- [x] CRUD completo de Orçamentos (criar, listar, buscar, atualizar status, deletar)
- [x] CRUD completo de Projetos (via painel web admin)
- [x] Comunicação HTTP entre app e API (Fetch API)
- [x] Tratamento de erros (loading states, mensagens de erro, validação)
- [x] Autenticação com JWT
- [x] README com todas as seções obrigatórias
