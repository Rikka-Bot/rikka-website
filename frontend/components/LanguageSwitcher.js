import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import styles from '../styles/NavBar.module.css';

export default function LanguageSwitcher({ mobile = false, onSelect }) {
  const { locale, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') { setOpen(false); root.current?.querySelector('button')?.focus(); } };
    document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close);
  }, []);
  const choose = (next) => { setOpen(false); onSelect?.(); if (next !== locale) setLanguage(next); };
  return <div className={`${styles.language} ${mobile ? styles.languageMobile : ''}`} ref={root}>
    <button type="button" aria-label={`${t('lang.label')}: ${locale}`} aria-expanded={open} aria-haspopup="listbox" aria-controls={mobile ? 'mobile-language-menu' : 'language-menu'} onClick={() => setOpen(value => !value)}><span aria-hidden="true">◎</span><b>{locale === 'en' ? 'EN' : 'PT-BR'}</b><i aria-hidden="true">⌄</i></button>
    <div id={mobile ? 'mobile-language-menu' : 'language-menu'} className={`${styles.languageMenu} ${open ? styles.languageOpen : ''}`} role="listbox" aria-label={t('lang.label')}>
      <button role="option" aria-selected={locale === 'pt-BR'} onClick={() => choose('pt-BR')}><span><b>PT-BR</b>{t('lang.pt')}</span>{locale === 'pt-BR' && <i>✓</i>}</button>
      <button role="option" aria-selected={locale === 'en'} onClick={() => choose('en')}><span><b>EN</b>{t('lang.en')}</span>{locale === 'en' && <i>✓</i>}</button>
    </div>
  </div>;
}
