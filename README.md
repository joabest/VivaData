# VivaData

Plataforma open source de inteligência competitiva baseada em dados públicos da TikTok Shop. A Etapa 1 oferece dashboard responsivo, autenticação, isolamento por usuário, cadastro de concorrentes/produtos e modelo de históricos.

> Vendas e GMV não são dados confirmados: serão mostrados somente como faixas estimadas com confiança e sinais.

Leia a [auditoria, arquitetura, riscos, custos e roadmap](docs/ARCHITECTURE.md). O dashboard executa consultas curtas; Playwright e filas serão serviços separados, nunca tarefas longas na Vercel.

## Desenvolvimento local
Requisitos: Node 20+, npm e Docker.
```bash
cp .env.example .env
docker compose up -d postgres
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```
A seed cria `demo@vivadata.dev` / `VivaData123` apenas em desenvolvimento.

## Qualidade
```bash
npm test
npm run typecheck
npm run build
```
Rotas privadas exigem sessão, senhas usam bcrypt custo 12, Zod valida entradas e mutações aplicam `userId` no servidor. Configure `AUTH_SECRET` forte e HTTPS. Somente informações públicas: não contorne login, CAPTCHA ou proteções; observe termos, limites e leis aplicáveis.

## Licença
MIT.
