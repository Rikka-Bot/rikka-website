# Rikka Website Backend

Backend Express.js separado do frontend Next.js.

## Scripts

- npm run dev: inicia o servidor com recarregamento em desenvolvimento.
- npm start: inicia o servidor em produção.

## Variáveis de ambiente

Copie .env.example para .env e configure:

- PORT: porta local ou fornecida pela Railway.
- SESSION_SECRET: segredo usado pelos cookies de sessão.
- DATABASE_URL: reservado para banco de dados futuro.
- CORS_ORIGIN: URL do frontend, por exemplo https://seu-projeto.vercel.app.
- DISCORD_CLIENT_ID: client id do app Discord.
- DISCORD_CLIENT_SECRET: client secret do app Discord.
- DISCORD_REDIRECT_URI: callback cadastrado no Discord, por exemplo https://seu-backend.up.railway.app/auth/discord/callback.
- DISCORD_WEBHOOK_URL: webhook opcional para avisar novo cadastro.
- FIREBASE_PROJECT_ID: id do projeto Firebase.
- FIREBASE_SERVICE_ACCOUNT: JSON da service account do Firebase em uma unica linha.

## APIs e rotas

- GET /auth/discord
- GET /auth/discord/callback
- GET /api/auth/callback
- GET /api/auth/user
- POST /api/auth/logout
- GET /logout
- POST /logout
- GET /api/hello
- GET /api/health

O backend não renderiza HTML e expõe APIs/redirects de autenticação. O frontend fica separado na Vercel.
