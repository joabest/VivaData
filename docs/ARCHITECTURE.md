# Arquitetura e plano do VivaData

## 1. Arquitetura proposta
O MVP usa um monólito modular Next.js na Vercel para interface, autenticação, validação e consultas curtas. PostgreSQL/Prisma é a fonte de verdade. Na Etapa 2, Redis/BullMQ e um worker Node com Playwright são implantados separadamente em VPS, Railway ou Fly.io. Coletores nunca rodam como tarefas longas na Vercel. Analytics distingue dado confirmado, histórico próprio e estimativa.

## 2. Estrutura
`app/` reúne rotas e ações; `components/` contém UI; `lib/` centraliza banco, validação e analytics; `prisma/` mantém schema, migrations e seed; `docs/` registra decisões. Worker e pacotes compartilhados serão extraídos na Etapa 2 sem mudar o domínio.

## 3. Banco e isolamento
User é o tenant. Competitor, Alert e CollectionJob carregam `userId`; produtos são acessados pela relação com Competitor. Relações N:N cobrem vídeos/produtos, criadores/concorrentes e lives/produtos. Snapshots são append-only e indexados por entidade/data. Valores monetários usam Decimal e exclusões propagam em cascata.

## 4. Fluxo de dados
1. Usuário autenticado envia URL; Zod valida domínio e formato.
2. A API grava concorrente pertencente ao usuário e agenda coleta.
3. Worker obtém a página pública com limites, identifica parser e normaliza o resultado.
4. Transação faz upsert do estado atual e acrescenta snapshot.
5. Comparador lê snapshots, calcula deltas e persiste alertas idempotentes.
6. Dashboard consulta somente o tenant e rotula inferências como estimativas.

## 5. Estratégia de coleta responsável
Somente páginas públicas, observando termos, robots e legislação. Começar manualmente/diariamente; usar cache por URL, jitter, concorrência baixa, identificação, timeouts, backoff e no máximo três tentativas. Parsers versionados recebem fixtures em testes. Alterações geram erro observável, nunca valores inventados. Guardar metadados, URLs e miniaturas, não vídeos.

## 6. Limitações técnicas
TikTok pode variar HTML, região e disponibilidade, exigir JavaScript e aplicar limites. Não há acesso garantido a vendas reais; contagens podem ser arredondadas ou atrasadas. Lives exigem execução contínua e ficam fora do MVP. A plataforma não promete cobertura integral nem contorna autenticação/CAPTCHAs.

## 7. Riscos
Revisão jurídica reduz risco de termos; limites e pausa automática mitigam bloqueio; fixtures e quarentena protegem contra parser incorreto; filtros obrigatórios pelo usuário evitam vazamento multi-tenant. Estimativas sempre exibem faixa, confiança e sinais. Cotas de 20 concorrentes/500 produtos contêm custo.

## 8. Custos
Protótipo local: cerca de R$ 0/mês. MVP pequeno: R$ 30–150/mês conforme banco, Redis e worker. Vercel/Supabase gratuitos podem iniciar o painel; proxy pago não é requisito. Em escala, navegadores, frequência e observabilidade dominam o custo.

## 9. Etapas
- **Etapa 1:** Next.js, credenciais, Prisma, dashboard, tema, cadastros manuais, seed, alertas demonstrativos e testes.
- **Etapa 2:** BullMQ/Redis, fixture pública autorizada, snapshots, comparação, atualização manual e logs.
- **Etapa 3:** parsers reais revisados, vídeos/criadores, filtros, CSV, estimativas configuráveis e relatórios.
- **Etapa 4:** lives, canais externos, equipes, assinaturas, API, extensão e IA.

## 10. MVP versus futuro
O MVP acompanha conjunto explícito, histórico, novidades/remoções e alertas internos. Lives, WhatsApp, billing, ranking global, scraping em massa e dados privados ficam fora. Uma estimativa é sempre faixa com confiança, nunca fato.

## Auditoria de estabilização — 2026-07-29

A revisão encontrou quatro bloqueadores: páginas densamente minificadas dificultavam a inferência/diagnóstico TypeScript; o middleware importava a configuração completa de autenticação e, indiretamente, Prisma e bcrypt no Edge; faltavam `postinstall`, deploy de migrations e uma migration inicial materializável; e métricas demonstrativas não estavam suficientemente rotuladas. A estabilização separou a configuração Edge, declarou os payloads Prisma sem `any`, adicionou os scripts/migration/CI e identificou todos os números de demonstração. Workers e coleta real continuam deliberadamente fora da Vercel e não são declarados como concluídos.
