import Head from 'next/head';
import { SITE_URL } from '../lib/siteConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { localizedPath } from '../i18n/routes';

export default function PageSeo({ title, description, titleKey, descriptionKey, pageKey = 'home', path, robots = 'index, follow' }) {
  const { locale, t } = useLanguage();
  const resolvedTitle = titleKey ? t(titleKey) : title;
  const resolvedDescription = descriptionKey ? t(descriptionKey) : description;
  const currentPath = path || localizedPath(pageKey, locale);
  const canonical = `${SITE_URL}${currentPath === '/' ? '/' : currentPath}`;
  const ptPath = localizedPath(pageKey, 'pt-BR');
  const ptUrl = `${SITE_URL}${ptPath === '/' ? '/' : ptPath}`;
  const enUrl = `${SITE_URL}${localizedPath(pageKey, 'en')}`;
  const jaUrl = `${SITE_URL}${localizedPath(pageKey, 'ja')}`;
  return <Head>
    <title>{resolvedTitle}</title><meta name="description" content={resolvedDescription} /><meta name="robots" content={robots} />
    <meta name="keywords" content="Rikka, Discord bot, Discord card collection bot, card collection, Dreams Experience" />
    <link rel="canonical" href={canonical} /><link rel="alternate" hrefLang="pt-BR" href={ptUrl} /><link rel="alternate" hrefLang="en" href={enUrl} /><link rel="alternate" hrefLang="x-default" href={ptUrl} />
    <link rel="alternate" hrefLang="ja" href={jaUrl} />
    <meta property="og:type" content="website" /><meta property="og:title" content={resolvedTitle} /><meta property="og:description" content={resolvedDescription} /><meta property="og:url" content={canonical} /><meta property="og:site_name" content="Rikka" />
    <meta property="og:locale" content={{ 'pt-BR': 'pt_BR', en: 'en_US', ja: 'ja_JP' }[locale]} />
    {Object.entries({ 'pt-BR': 'pt_BR', en: 'en_US', ja: 'ja_JP' }).filter(([language]) => language !== locale).map(([language, value]) => <meta key={language} property="og:locale:alternate" content={value} />)}
    <meta property="og:image" content={`${SITE_URL}/og-image.png`} /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta property="og:image:alt" content="Rikka — Discord card collection bot" />
    <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={resolvedTitle} /><meta name="twitter:description" content={resolvedDescription} /><meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
  </Head>;
}
