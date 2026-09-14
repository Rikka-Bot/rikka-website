# Rikka Website Frontend

Frontend Next.js separado do backend Express.js.

## Scripts

- npm run dev: inicia o Next.js em desenvolvimento.
- npm run build: gera o build de produção.
- npm run start: inicia o build de produção.

## Variáveis de ambiente

Copie .env.example para .env.local e configure:

- API_URL: URL pública do backend, usada apenas no servidor pelo proxy/rewrite do Next.js.

O botão de Login usa `/auth/discord` no próprio domínio. As rotas `/auth/*`,
`/api/auth/*` e `/logout` são encaminhadas a `API_URL`, evitando depender de
cookies third-party entre Vercel e Railway. Fetches autenticados usam
`credentials: 'include'`.
