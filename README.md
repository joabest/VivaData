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

## Deploy

A instalação executa `prisma generate` via `postinstall`. A aplicação não executa migrations durante o build da Vercel; aplique-as em uma etapa controlada com `npm run db:migrate:deploy`. A CI valida schema, lint, tipos, testes e build. O worker externo permanece no roadmap e não deve compartilhar o processo da aplicação web.

Na Vercel, configure `NEXT_PUBLIC_APP_URL` e `NEXTAUTH_URL` com o domínio HTTPS do projeto. Remova valores antigos apontando para `localhost`: quando `NEXTAUTH_URL` ou `AUTH_URL` está definido, o Auth.js pode usá-lo como origem canônica. Preview deployments podem omitir `NEXTAUTH_URL` e usar os headers confiáveis da Vercel; URLs absolutas da aplicação usam, em ordem, `NEXT_PUBLIC_APP_URL`, `VERCEL_PROJECT_PRODUCTION_URL` e `VERCEL_URL`.
