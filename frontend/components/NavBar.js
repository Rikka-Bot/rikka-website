import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import { localizedPath } from '../i18n/routes';
import { DISCORD_INVITE_URL } from '../lib/siteConfig';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import styles from '../styles/NavBar.module.css';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { locale, t } = useLanguage();
  const { user } = useAuth();
  const links = [['how', 'nav.how'], ['collection', 'nav.collection'], ['features', 'nav.features'], ['about', 'nav.about']];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const active = (href) => router.pathname === href;

  return <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
    <nav className={styles.nav} aria-label={t('nav.label')}>
      <Link className={styles.brand} href={localizedPath('home', locale)} aria-label={t('nav.logoLabel')}>
        <Image className={styles.brandLogo} src="/logo.png" width={44} height={44} alt="" priority />
        <span>Rikka<b>.</b></span>
      </Link>
      <div className={styles.desktopNav}>
        <ul>{links.map(([page, key]) => { const href = localizedPath(page, locale); return <li key={page}><Link href={href} className={active(href) ? styles.active : ''} aria-current={active(href) ? 'page' : undefined}>{t(key)}</Link></li>; })}</ul>
        <div className={styles.globalControls}><LanguageSwitcher /><ThemeToggle /></div>
        {user ? <UserMenu key={user.id} user={user} /> : <a className={styles.loginLink} href="/auth/discord">{t('nav.login')}</a>}
        <a className={styles.navCta} href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">{t('nav.add')} <span>↗</span></a>
      </div>
      <button className={styles.menuButton} type="button" aria-label={open ? t('nav.close') : t('nav.open')} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(value => !value)}><span /><span /><span /></button>
    </nav>
    <div id="mobile-menu" className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`} aria-hidden={!open}>
      <ul>{links.map(([page, key]) => { const href = localizedPath(page, locale); return <li key={page}><Link href={href} className={active(href) ? styles.active : ''} aria-current={active(href) ? 'page' : undefined} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{t(key)}<span>↗</span></Link></li>; })}</ul>
      <div className={styles.mobilePreferences}><div><small>{t('lang.label')}</small><LanguageSwitcher mobile onSelect={() => setOpen(false)} /></div><div><small>{t('theme.label')}</small><ThemeToggle mobile /></div></div>
      <div className={styles.mobileActions}>{user ? (open && <UserMenu key={user.id} user={user} mobile />) : <a href="/auth/discord" tabIndex={open ? 0 : -1}>{t('nav.login')}</a>}<a href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>{t('nav.add')}</a></div>
    </div>
  </header>;
}
