# Rikka Website Backend

Backend Express.js separado do frontend Next.js.

## Scripts

- npm run dev: inicia o servidor com recarregamento em desenvolvimento.
- npm start: inicia o servidor em produção.

## Variáveis de ambiente

Copie .env.example para .env e configure:

- PORT: porta local ou fornecida pela Railway.
- SESSION_SECRET: segredo aleatório com pelo menos 32 caracteres (obrigatório em produção).
- SESSION_COLLECTION: coleção Firestore das sessões (padrão: sessions).
- SESSION_COOKIE_NAME: nome do cookie (padrão: rikka.sid).
- SESSION_COOKIE_SAME_SITE: lax no fluxo same-origin recomendado; none apenas para acesso direto cross-site.
- SESSION_MAX_AGE_MS: duração renovável da sessão (padrão: 7 dias).
- DATABASE_URL: reservado para banco de dados futuro.
- FRONTEND_URL: URL canônica do frontend, usada nos redirects.
- CORS_ORIGINS: lista separada por vírgulas de origens explicitamente permitidas.
- DISCORD_CLIENT_ID: client id do app Discord.
- DISCORD_CLIENT_SECRET: client secret do app Discord.
- DISCORD_REDIRECT_URI: callback same-origin cadastrado no Discord, por exemplo https://seu-projeto.vercel.app/auth/discord/callback.
- DISCORD_WEBHOOK_URL: webhook opcional para avisar novo cadastro.
- FIREBASE_PROJECT_ID: id do projeto Firebase.
- FIREBASE_SERVICE_ACCOUNT: JSON da service account do Firebase em uma unica linha.

## APIs e rotas

- GET /auth/discord
- GET /auth/discord/callback
- GET /api/auth/callback
- GET /api/auth/user
- POST /api/auth/logout
- GET /logout: retorna 405; não altera sessão.
- POST /logout
- GET /api/hello
- GET /api/health

O backend não renderiza HTML e expõe APIs/redirects de autenticação. O frontend fica separado na Vercel.

As rotas de autenticação devem ser acessadas pelo domínio do frontend. O Next.js
as encaminha para o backend, mantendo o cookie como first-party. O Railway usa
Firestore como store persistente; configure uma política TTL para o campo
`expiresAt` da coleção escolhida para remover documentos expirados.

## Contrato de usuário

O OAuth é responsável somente por criar e sincronizar identidade/verificação em
`users/{discordUserId}`. Defaults de gameplay e os documentos
`profile/main` e `inventory/main` pertencem à Rikka e são completados de forma
idempotente no primeiro comando do usuário.

O `project_id` da service account deste backend deve ser o mesmo usado pela
Rikka. `FIREBASE_PROJECT_ID` sozinho não corrige uma credencial pertencente a
outro projeto.

## Segurança e operação

Logout usa POST e exige `Origin` autorizado (ou `Referer` autorizado quando
`Origin` não existe). O frontend usa `/api/auth/logout` pelo rewrite do Next.js.
Em produção, configure `NODE_ENV=production`, `SESSION_SECRET` aleatório e
origens HTTPS explícitas. Não reutilize o placeholder do `.env.example`.

OAuth: 20 inícios/10 minutos; callbacks compartilham 30/10 minutos; leitura de
sessão: 120/minuto; logout: 30/minuto, por IP e por processo. Reinícios e réplicas
não compartilham contadores. Health/hello não carregam sessão. Mantenha
`trust proxy=1` até validar a cadeia real de proxies; não use IP como autorização.


