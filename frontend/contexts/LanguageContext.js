import { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import pt from '../i18n/locales/pt-BR';
import en from '../i18n/locales/en';
import ja from '../i18n/locales/ja';
import { localizedPath, pageFromPath } from '../i18n/routes';

const dictionaries = { 'pt-BR': pt, en, ja };
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const router = useRouter();
  const requestedPath = router.asPath.split(/[?#]/)[0];
  const locale = requestedPath === '/ja' || requestedPath.startsWith('/ja/') ? 'ja'
    : requestedPath === '/en' || requestedPath.startsWith('/en/') ? 'en' : 'pt-BR';
  const page = pageFromPath(router.pathname);
  const t = (key) => dictionaries[locale][key] ?? pt[key] ?? key;

  useEffect(() => {
    document.documentElement.lang = locale;
    const saved = localStorage.getItem('rikka-language');
    if (page && Object.hasOwn(dictionaries, saved) && saved !== locale) {
      router.replace(localizedPath(page, saved));
      return;
    }
    if (!saved && page && locale === 'pt-BR') {
      const language = navigator.language?.toLowerCase();
      const detected = language?.startsWith('ja') ? 'ja' : language?.startsWith('pt') ? 'pt-BR' : 'en';
      localStorage.setItem('rikka-language', detected);
      if (detected !== 'pt-BR') router.replace(localizedPath(page, detected));
      return;
    }
    localStorage.setItem('rikka-language', locale);
  }, [locale, page, router]);

  const setLanguage = (next) => {
    if (!Object.hasOwn(dictionaries, next)) return;
    localStorage.setItem('rikka-language', next);
    if (!page) {
      router.push(next === 'pt-BR' ? '/404' : `/${next}/404`);
      return;
    }
    router.push(localizedPath(page, next));
  };

  return <LanguageContext.Provider value={{ locale, page, t, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
