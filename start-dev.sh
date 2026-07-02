#!/bin/bash
# Script para facilitar o desenvolvimento local

echo "🚀 Iniciando Rikka Website com Autenticação Discord"
echo ""
echo "📋 Checklist pré-execução:"
echo "✅ Node.js instalado?"
echo "✅ npm install executado?"
echo "✅ .env.local configurado com credenciais Discord?"
echo ""
echo "Para obter as credenciais:"
echo "1. Acesse: https://discord.com/developers/applications"
echo "2. Crie uma Nova Aplicação"
echo "3. Copie Client ID e Client Secret"
echo "4. Adicione Redirect URI: http://localhost:3000/auth/discord/callback"
echo ""
echo "Atualize os valores em .env.local:"
echo "  DISCORD_CLIENT_ID=seu_client_id"
echo "  DISCORD_CLIENT_SECRET=seu_client_secret"
echo ""
echo "Iniciando servidor..."
echo ""

npm run dev
