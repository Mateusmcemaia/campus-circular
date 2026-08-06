# ♻️ CirculaCampus — Marketplace de Economia Circular

**Candidato:** Mateus Maia Cavalcante Evangelista (Ciência da Computação - UNIFOR)
**Projeto:** Processo Seletivo para Estágio Full-Stack | Laboratório VORTEX

## 📖 Sobre o Projeto
O **CirculaCampus** é uma plataforma web e mobile (PWA) focada na economia circular dentro do ambiente universitário. O sistema conecta estudantes do mesmo campus para revender, doar e reaproveitar itens como livros, calculadoras, componentes e equipamentos. 

O projeto foi concebido utilizando uma arquitetura moderna dividida entre uma interface responsiva instalável via Service Workers (Frontend) e uma integração direta com banco de dados relacional em nuvem via API RESTful (Backend as a Service).

> **🚀 APLICAÇÃO EM PRODUÇÃO (DEPLOY)**
> O sistema está no ar com CI/CD configurado e banco de dados real (Supabase).
> **🔗 Acesse agora: [https://campuscircularvortex.netlify.app](https://campuscircularvortex.netlify.app)**
https://campuscircularvortex.netlify.app/

---

## 🛠️ Tecnologias e Arquitetura

O projeto foi desenvolvido buscando alta performance e componentização, utilizando:
* **Frontend:** React.js, TypeScript, Vite.
* **Roteamento:** TanStack Router (Rotas baseadas em arquivos).
* **Estilização:** Tailwind CSS e shadcn/ui.
* **Backend & Autenticação:** Supabase (PostgreSQL, APIs REST automáticas).
* **Infraestrutura e Deploy:** Netlify (CI/CD) e configuração nativa de PWA (manifest + sw.js).

---

## 🚀 Como rodar o projeto localmente

**Pré-requisitos:** Node.js (v18+) e NPM instalados.

1. **Clone o repositório:**
```bash
git clone https://github.com/Mateusmcemaia/campus-circular.git
cd campus-circular

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as Variáveis de Ambiente:**
Crie um arquivo `.env` na raiz do projeto e insira suas chaves do Supabase:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

4. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:8080`.

---

## 🧠 Diário de Bordo da IA (Uso Ético e Estratégico)

O uso de Inteligência Artificial Generativa neste projeto foi tratado como uma ferramenta de pair-programming, visando acelerar a construção de boilerplate visual e debater decisões de arquitetura, mantendo o controle total da engenharia e da lógica de negócios sob minha responsabilidade.

**Ferramentas Utilizadas:**
* **Lovable (IA Visual):** Geração de componentes React isolados (UI/UX) baseados em descrições de interface.
* **Gemini Pro (LLM):** Debugging avançado, configuração de infraestrutura (PWA/Deploy) e pair-programming para resolução de erros de integração.

### 💡 Engenharia de Prompts (Exemplos Práticos)

Abaixo destaco prompts estruturados que utilizei para guiar a IA na resolução de gargalos arquitetônicos e operacionais, demonstrando domínio das camadas do projeto:

**Prompt 1 (Segurança e Banco de Dados - Supabase RLS):**
> "O frontend está enviando a requisição DELETE corretamente para a API, mas a linha não é excluída e a página apenas recarrega, indicando um bloqueio silencioso no backend. Acredito que a IA de UI esqueceu das políticas de segurança. Escreva a query SQL exata para habilitar temporariamente a Row Level Security (RLS) para 'DELETE' na tabela 'anuncios' do Supabase, permitindo que eu teste o CRUD completo antes de implementar o fluxo de Auth."

**Prompt 2 (Responsividade e UX/UI Mobile):**
> "A IA gerou a interface, mas a bottom navigation mobile criou um 'beco sem saída' na UX, pois as telas secundárias perderam a rota para o Início. Mapeie a árvore de diretórios do meu `src` que acabei de listar, encontre o componente base (provavelmente o AppShell) e me forneça a refatoração exata injetando a rota raiz ('/') na matriz de abas. Certifique-se de usar a flag `activeOptions={{ exact: true }}` no componente Link do TanStack Router para evitar problemas de persistência de estado ativo."

**Prompt 3 (Configuração de Build / DevOps):**
> "O deploy no Netlify está quebrando com erro de 'Directory not found'. A configuração gerada autonomamente apontou o diretório de publicação do build para 'dist/client', o que foge do padrão de saída do Vite. Gere um arquivo `netlify.toml` enxuto que sobrescreva esse comportamento, apontando diretamente para o diretório genérico `dist` e aplicando regras de SPA (Single Page Application) com `_redirects` integrados no arquivo."

### ⚠️ Reflexão Crítica: Intervenção Humana e Correção de Alucinações

Durante o desenvolvimento, a IA cometeu erros conceituais e lógicos que exigiram minha intervenção técnica imediata. Destaco três momentos cruciais:

1. **Alucinação na configuração de Build (CI/CD):** A ferramenta tentou configurar o deploy assumindo um ambiente Node/Express acoplado, instruindo o servidor a buscar uma pasta estática que não existia (`dist/client`). Identifiquei a falha lendo os logs de deploy no Netlify e atuei manualmente criando o arquivo `netlify.toml` e `_redirects` com as regras corretas de roteamento SPA e a pasta nativa do Vite.
2. **Omissão de Segurança em Banco de Dados:** Ferramentas focadas em frontend tendem a ignorar a camada de segurança. O CRUD gerado visualmente realizava a exclusão no estado da tela, mas falhava na persistência real porque a IA ignorou o funcionamento das Políticas de Nível de Linha (RLS - Row Level Security) do Supabase. Intervi escrevendo as liberações SQL adequadas diretamente no console do banco.
3. **Erros de Arquitetura de Componentes PWA:** O layout original empurrou componentes vitais para fora da tela no mobile. A IA falhou em estruturar as classes do Tailwind de forma "Mobile First". Tive que analisar a hierarquia do DOM, remover classes de conflito e refatorar manualmente os arquivos `SiteHeader.tsx` e `index.tsx` para injetar controles de flexbox responsivos e esconder barras de busca no celular, garantindo os requisitos de PWA do edital.