export const ROUTES = {
  home: { 'pt-BR': '/', en: '/en' },
  how: { 'pt-BR': '/como-funciona', en: '/en/how-it-works' },
  collection: { 'pt-BR': '/colecao', en: '/en/collection' },
  features: { 'pt-BR': '/recursos', en: '/en/features' },
  about: { 'pt-BR': '/sobre', en: '/en/about' },
  support: { 'pt-BR': '/suporte', en: '/en/support' },
};

export function pageFromPath(pathname) {
  return Object.entries(ROUTES).find(([, paths]) => Object.values(paths).includes(pathname))?.[0] || null;
}

export function localizedPath(page, locale) {
  return ROUTES[page]?.[locale] || ROUTES.home[locale];
}
