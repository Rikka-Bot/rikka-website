import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { localizedPath } from '../i18n/routes';
import { DISCORD_INVITE_URL, DREAMS_URL, SUPPORT_URL } from '../lib/siteConfig';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const { locale, t } = useLanguage();
  return <footer className={styles.footer}><div className={styles.top}><div className={styles.brand}><Image src="/rikka.png" width={52} height={52} alt={t('common.avatar')} /><div><b>Rikka</b><span>{t('footer.tagline')}</span></div></div><div className={styles.links}>
    <div><b>Rikka</b><a href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">{t('nav.add')}</a><a href={SUPPORT_URL} target="_blank" rel="noreferrer">{t('common.support')}</a></div>
    <div><b>{t('footer.project')}</b><Link href={localizedPath('about',locale)}>{t('nav.about')}</Link><a href={DREAMS_URL} target="_blank" rel="noreferrer">Dreams Experience</a></div>
    <div><b>{t('footer.legal')}</b><span>{t('footer.terms')} <i>{t('footer.soon')}</i></span><span>{t('footer.privacy')} <i>{t('footer.soon')}</i></span></div>
  </div></div><div className={styles.bottom}><span>© {new Date().getFullYear()} Rikka. {t('footer.rights')}</span><a href={DREAMS_URL} target="_blank" rel="noreferrer">{t('footer.dreams')} ↗</a></div></footer>;
}
