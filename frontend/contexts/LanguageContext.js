import { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import pt from '../i18n/locales/pt-BR';
import en from '../i18n/locales/en';
import { localizedPath, pageFromPath } from '../i18n/routes';

const dictionaries = { 'pt-BR': pt, en };
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const router = useRouter();
  const locale = router.pathname === '/en' || router.pathname.startsWith('/en/') ? 'en' : 'pt-BR';
  const page = pageFromPath(router.pathname);
  const t = (key) => dictionaries[locale][key] ?? pt[key] ?? key;

  useEffect(() => {
    document.documentElement.lang = locale;
    const saved = localStorage.getItem('rikka-language');
    if (page && (saved === 'pt-BR' || saved === 'en') && saved !== locale) {
      router.replace(localizedPath(page, saved));
      return;
    }
    if (!saved && page && locale === 'pt-BR') {
      const detected = navigator.language?.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
      localStorage.setItem('rikka-language', detected);
      if (detected === 'en') router.replace(localizedPath(page, 'en'));
      return;
    }
    localStorage.setItem('rikka-language', locale);
  }, [locale, page, router]);

  const setLanguage = (next) => {
    localStorage.setItem('rikka-language', next);
    router.push(localizedPath(page || 'home', next));
  };

  return <LanguageContext.Provider value={{ locale, page, t, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
