export const ROUTES = {
  home: { 'pt-BR': '/', en: '/en', ja: '/ja' },
  how: { 'pt-BR': '/como-funciona', en: '/en/how-it-works', ja: '/ja/how-it-works' },
  collection: { 'pt-BR': '/colecao', en: '/en/collection', ja: '/ja/collection' },
  features: { 'pt-BR': '/recursos', en: '/en/features', ja: '/ja/features' },
  about: { 'pt-BR': '/sobre', en: '/en/about', ja: '/ja/about' },
  support: { 'pt-BR': '/suporte', en: '/en/support', ja: '/ja/support' },
  verified: { 'pt-BR': '/verificado', en: '/en/verified', ja: '/ja/verified' },
  blocked: { 'pt-BR': '/bloqueado', en: '/en/blocked', ja: '/ja/blocked' },
};

export function pageFromPath(pathname) {
  return Object.entries(ROUTES).find(([, paths]) => Object.values(paths).includes(pathname))?.[0] || null;
}

export function localizedPath(page, locale) {
  return ROUTES[page]?.[locale] || ROUTES.home[locale];
}
