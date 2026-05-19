# Dev4All — Aplicativo Mobile

Aplicativo mobile da agência de desenvolvimento **Dev4All**, desenvolvido em **React Native com Expo**.

---

## 👥 Integrantes da Equipe

| Nome | Função |
|------|--------|
| Felipe Almeida Albino | Product Owner & Dev Full Stack |
| Reuel Vinicius | Dev Back-end & DBA |
| Nathan Feitoza | Dev Full Stack & UX Designer |
| Murilo Lacerda | Dev Front-end & QA |
| Marcos Segundo | Estagiário de Suporte |

---

## 📱 Descrição do Aplicativo

O **Dev4All** é o aplicativo mobile oficial de uma agência de desenvolvimento web e mobile. O app permite que clientes conheçam os serviços, o portfólio de projetos e a equipe da agência, além de poderem solicitar orçamentos diretamente pelo celular.

**Funcionalidades principais:**
- Apresentação da agência com estatísticas e projetos em destaque
- Portfólio completo com filtros por categoria
- Detalhes de cada projeto com tecnologias utilizadas
- Página "Sobre nós" com missão, valores e equipe
- Formulário de orçamento com validação
- Telas de Login e Cadastro

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React Native | 0.81.5 | Framework mobile |
| Expo | SDK 54 | Ambiente de desenvolvimento |
| React Navigation | 7.x | Navegação entre telas |
| @expo/vector-icons | 15.x | Ícones (Feather) |
| react-native-safe-area-context | ~5.6.0 | Área segura do dispositivo |
| react-native-gesture-handler | ~2.28.0 | Gestos e interações |
| react-native-reanimated | ~4.1.1 | Animações |

> **Fase 1:** dados mockados, sem backend. O backend (Node.js + MongoDB) está na pasta `backend/` para a Fase 2.

---

## ✅ Funcionalidades Implementadas

- [x] **Tela Home** — hero, estatísticas (50+/98%/24/7), brands strip, 4 serviços, 4 etapas "Como funciona", portfólio em destaque, depoimentos de clientes e CTA
- [x] **Tela Portfólio** — listagem de projetos com filtros por categoria (Desenvolvimento, Design, Mobile, Web...)
- [x] **Tela Detalhe do Projeto** — imagem, categorias, descrição, tecnologias, informações e botão de orçamento
- [x] **Tela Sobre Nós** — missão, valores (Inovação, Qualidade, Comprometimento, Excelência), "Por que Dev4all?" e equipe completa
- [x] **Tela Contato** — formulário de orçamento com chips de serviço, validação de campos e cards de contato (WhatsApp, E-mail, Localização)
- [x] **Tela Login** — autenticação com tabs Login/Registro e botões sociais
- [x] **Tela Registro** — cadastro com validação de nome, e-mail e senha
- [x] **Navegação Bottom Tabs** — Home, Portfólio, Sobre nós, Contato, Login
- [x] **Navegação Stack** — detalhe de projetos e fluxo de autenticação

---

## 📂 Estrutura do Projeto

```
Dev4all-mobile/
│
├── mobile/                        ← App React Native (Fase 1)
│   ├── App.js                     ← Entrada da aplicação
│   ├── src/
│   │   ├── navigation/
│   │   │   └── AppNavigator.js    ← Bottom Tabs + Stack Navigator
│   │   ├── screens/
│   │   │   ├── HomeScreen.js      ← Tela inicial
│   │   │   ├── PortfolioScreen.js ← Lista de projetos com filtros
│   │   │   ├── ProjectDetailScreen.js ← Detalhe do projeto
│   │   │   ├── SobreScreen.js     ← Sobre nós / equipe
│   │   │   ├── ContactScreen.js   ← Formulário de orçamento
│   │   │   ├── LoginScreen.js     ← Login
│   │   │   └── RegistroScreen.js  ← Cadastro
│   │   └── data/
│   │       └── mockData.js        ← Dados mockados (projetos, equipe, serviços)
│   └── package.json
│
└── backend/                       ← API Node.js + MongoDB (Fase 2)
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── graphql/
    │   ├── middlewares/
    │   └── server.js
    ├── public/                    ← Frontend web estático
    └── package.json
```

---

## 🚀 Como Executar o App (Fase 1)

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [NPM](https://www.npmjs.com/)
- App **Expo Go** instalado no celular:
  - [Android — Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS — App Store](https://apps.apple.com/app/expo-go/id982107779)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/Dev4all-mobile.git
cd Dev4all-mobile

# 2. Entre na pasta do app mobile
cd mobile

# 3. Instale as dependências
npm install

# 4. Inicie o servidor Expo
npx expo start
```

**Após iniciar:** escaneie o **QR Code** exibido no terminal com o app **Expo Go** no celular.

> O app também pode ser executado no navegador com `npx expo start --web`

---

## 🖥️ Telas do Aplicativo

| Tela | Rota / Aba | Descrição |
|------|-----------|-----------|
| Home | Aba Home | Apresentação completa da agência |
| Portfólio | Aba Portfólio | Lista de projetos com filtros |
| Detalhe | (Stack) | Informações detalhadas do projeto |
| Sobre Nós | Aba Sobre nós | Missão, valores e equipe |
| Contato | Aba Contato | Formulário de orçamento |
| Login | Aba Login | Autenticação de usuário |
| Registro | (Stack) | Cadastro de novo usuário |

---

## 🔗 Backend — Fase 2

O backend já está implementado na pasta `backend/` e será integrado ao app na próxima fase.

```bash
cd backend
npm install
npm run seed   # popula o banco com dados de exemplo
npm run dev    # inicia em http://localhost:3000
```

Credenciais admin padrão (após seed):
- **E-mail:** `admin@dev4all.com`
- **Senha:** `admin`

---

**Desenvolvido pela equipe Dev4All — Turma de Desenvolvimento Mobile.**
