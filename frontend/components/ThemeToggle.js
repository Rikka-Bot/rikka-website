import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import styles from '../styles/NavBar.module.css';

export default function ThemeToggle({ mobile = false }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const label = theme === 'dark' ? t('theme.light') : t('theme.dark');
  return <button suppressHydrationWarning type="button" className={`${styles.themeToggle} ${mobile ? styles.controlMobile : ''}`} onClick={toggleTheme} aria-label={label} title={label}><span suppressHydrationWarning aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>{mobile && <b suppressHydrationWarning>{theme === 'dark' ? t('theme.nameDark') : t('theme.nameLight')}</b>}</button>;
}
