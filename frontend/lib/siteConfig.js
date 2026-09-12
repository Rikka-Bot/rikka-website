export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://rikka-website.vercel.app'
).replace(/\/$/, '');

export const DISCORD_INVITE_URL =
  'https://discord.com/api/oauth2/authorize?client_id=770762400034848808&permissions=8&scope=bot%20applications.commands';

export const SUPPORT_URL = 'https://discord.gg/eMzpeyxtHf';
export const DREAMS_URL = 'https://dreamsexperience.xyz/';
export const TOP_GG_URL = 'https://top.gg/bot/770762400034848808';

// TODO: confirmar o domínio canônico final em NEXT_PUBLIC_SITE_URL.
// TODO: confirmar URLs públicas de Termos e Privacidade.
