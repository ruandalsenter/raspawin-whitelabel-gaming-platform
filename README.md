# 🎯 RaspaWin - Plataforma Whitelabel de Raspadinhas

Uma plataforma completa e moderna para criação e gestão de jogos de raspadinha whitelabel, desenvolvida com Next.js 15, TypeScript e Tailwind CSS.

## 🚀 Características Principais

### ✨ **Experiência do Usuário**
- **Interface Moderna**: Design minimalista com gradientes e animações suaves
- **Mobile-First**: Totalmente responsivo para todos os dispositivos
- **Raspadinha Interativa**: Canvas HTML5 com animações e feedback visual
- **Gamificação**: Sistema de níveis, estatísticas e histórico de jogos

### 🎨 **Customização Total (Whitelabel)**
- **Branding Completo**: Logos, cores, tipografia personalizáveis
- **Temas Dinâmicos**: Mudança de cores em tempo real
- **Mensagens Personalizadas**: Textos e comunicação customizáveis
- **Templates Predefinidos**: Layouts prontos para uso imediato

### 📊 **Analytics Avançados**
- **Dashboard Intuitivo**: Gráficos e métricas em tempo real
- **Relatórios Detalhados**: Performance, engajamento e financeiro
- **Segmentação de Usuários**: Análise por perfil e comportamento
- **Exportação de Dados**: Relatórios em múltiplos formatos

### 🔐 **Sistema de Roles**
- **Super Admin**: Gestão completa da plataforma whitelabel
- **Cliente Admin**: Controle do próprio ambiente e usuários
- **Jogador Final**: Interface otimizada para jogos

## 🏗️ Arquitetura da Plataforma

### **Tecnologias Utilizadas**
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Autenticação**: Sistema próprio com localStorage (MVP)
- **Estado Global**: React Context API
- **Animações**: CSS Animations + Canvas API
- **Responsividade**: Mobile-first design

### **Estrutura de Páginas**
```
/                    # Landing page da plataforma
/auth               # Sistema de autenticação
/play               # Interface do jogador (raspadinha)
/admin              # Dashboard do cliente admin
/super-admin        # Dashboard do super admin
```

## 🎮 Funcionalidades por Perfil

### 👑 **Super Admin Dashboard**
- **Gestão de Clientes**: Criar, editar e gerenciar clientes whitelabel
- **Analytics Global**: Visão consolidada de toda a plataforma
- **Configurações Gerais**: Parâmetros globais e políticas
- **Monitoramento**: Status e performance de todos os clientes
- **Faturamento**: Controle financeiro e comissões

**Credenciais de Teste:**
- Email: `super@raspawin.com`
- Senha: `123456`

### 🏢 **Cliente Admin Dashboard**
- **Personalização de Marca**: Cores, logos e identidade visual
- **Configuração de Prêmios**: Valores, probabilidades e tipos
- **Gestão de Usuários**: Controle dos jogadores finais
- **Analytics do Cliente**: Métricas específicas do negócio
- **Configurações Financeiras**: Controle de receitas e custos

**Credenciais de Teste:**
- Email: `admin@cliente1.com`
- Senha: `123456`

### 🎲 **Interface do Jogador**
- **Raspadinha Interativa**: Canvas com animações realistas
- **Sistema de Saldo**: Controle de créditos e ganhos
- **Histórico de Jogos**: Registro completo de partidas
- **Estatísticas Pessoais**: Performance e conquistas
- **Progressão de Níveis**: Sistema de gamificação

**Credenciais de Teste:**
- Email: `jogador@teste.com`
- Senha: `123456`

## 🎯 Sistema de Prêmios

### **Configuração Flexível**
- **Prêmios Personalizáveis**: Valores e nomes editáveis
- **Probabilidades Ajustáveis**: Controle fino das chances
- **Emojis e Visuais**: Representação gráfica dos prêmios
- **Ativação/Desativação**: Controle individual de cada prêmio

### **Prêmios Padrão**
| Prêmio | Valor | Probabilidade | Emoji |
|--------|-------|---------------|-------|
| Jackpot | R$ 1.000,00 | 1% | 💎 |
| Super Prêmio | R$ 500,00 | 2% | 🏆 |
| Grande Prêmio | R$ 100,00 | 5% | 🎁 |
| Prêmio Médio | R$ 50,00 | 10% | 🎯 |
| Prêmio Pequeno | R$ 20,00 | 15% | 🎪 |
| Prêmio Mínimo | R$ 10,00 | 20% | 🎈 |
| Tente Novamente | R$ 0,00 | 47% | 😔 |

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**
```bash
# Clone o repositório
git clone [repository-url]

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

### **Acesso**
- **URL Local**: http://localhost:8000
- **Credenciais**: Veja as credenciais de teste acima

## 🎨 Personalização de Marca

### **Cores Personalizáveis**
- **Primária**: Cor principal da marca
- **Secundária**: Cor de apoio e detalhes
- **Gradientes**: Gerados automaticamente
- **Tema Escuro/Claro**: Suporte completo

### **Elementos Visuais**
- **Logo**: Upload e posicionamento
- **Tipografia**: Fontes Google Fonts
- **Backgrounds**: Imagens e padrões
- **Animações**: Efeitos personalizáveis

## 📊 Analytics e Relatórios

### **Métricas Principais**
- **Receita Total**: Faturamento consolidado
- **Jogos Realizados**: Volume de atividade
- **Usuários Ativos**: Engajamento
- **Taxa de Vitória**: Performance dos jogos
- **Retenção**: Análise de comportamento

### **Relatórios Disponíveis**
- **Performance Mensal**: Evolução temporal
- **Top Prêmios**: Prêmios mais populares
- **Segmentação de Usuários**: Perfis e comportamentos
- **Análise Financeira**: ROI e lucratividade

## 🔧 Configurações Técnicas

### **Variáveis de Ambiente**
```env
# Não necessário para MVP - usando localStorage
```

### **Customização de Cores CSS**
```css
:root {
  --primary-color: #10B981;
  --secondary-color: #059669;
  --background-gradient: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}
```

## 🛡️ Segurança e Conformidade

### **Recursos de Segurança**
- **Autenticação Segura**: Sistema de login protegido
- **Validação de Dados**: Sanitização de inputs
- **Controle de Acesso**: Roles e permissões
- **Auditoria**: Logs de atividades

### **Conformidade**
- **LGPD**: Proteção de dados pessoais
- **Regulamentações**: Conformidade com leis locais
- **Transparência**: Políticas claras de uso

## 🚀 Roadmap Futuro

### **Próximas Funcionalidades**
- [ ] **Integração com Pagamentos**: PIX, cartões, wallets
- [ ] **API REST Completa**: Integrações externas
- [ ] **App Mobile**: React Native
- [ ] **IA e ML**: Análise preditiva
- [ ] **Blockchain**: Transparência e auditoria
- [ ] **Multi-idiomas**: Internacionalização

### **Melhorias Técnicas**
- [ ] **Banco de Dados**: PostgreSQL/MongoDB
- [ ] **Cache**: Redis para performance
- [ ] **CDN**: Distribuição global
- [ ] **Monitoramento**: Logs e métricas avançadas
- [ ] **Testes**: Cobertura completa

## 📞 Suporte e Contato

### **Documentação**
- **Guia do Usuário**: Instruções detalhadas
- **API Reference**: Documentação técnica
- **FAQ**: Perguntas frequentes
- **Tutoriais**: Vídeos explicativos

### **Suporte Técnico**
- **Chat Online**: Suporte em tempo real
- **Email**: Atendimento especializado
- **Base de Conhecimento**: Artigos e soluções
- **Comunidade**: Fórum de usuários

---

## 🎉 Demonstração

A plataforma está totalmente funcional e pode ser testada imediatamente. Use as credenciais fornecidas para explorar cada perfil de usuário e descobrir todas as funcionalidades disponíveis.

**Desenvolvido com ❤️ para revolucionar o mercado de jogos digitais whitelabel.**
