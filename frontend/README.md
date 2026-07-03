# Rikka Website Frontend

Frontend Next.js separado do backend Express.js.

## Scripts

- npm run dev: inicia o Next.js em desenvolvimento.
- npm run build: gera o build de produção.
- npm run start: inicia o build de produção.

## Variáveis de ambiente

Copie .env.example para .env.local e configure:

- NEXT_PUBLIC_API_URL: URL pública do backend, por exemplo https://seu-backend.up.railway.app.

O botão de Login envia o usuário para NEXT_PUBLIC_API_URL/auth/discord. APIs autenticadas devem ser chamadas com credentials quando usarem cookies de sessão.
