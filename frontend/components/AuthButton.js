import Image from 'next/image';
import { logout } from '../lib/logout';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import styles from '../styles/Auth.module.css';

export default function AuthButton() {
  const { user, loading } = useAuth();
  const { t, locale } = useLanguage();
  if (loading) return <div className={styles.button}>{locale === 'en' ? 'Loading...' : 'Carregando...'}</div>;
  if (user) {
    return <div className={styles.userContainer}>
      <div className={styles.userInfo}>
        {user.avatar && <Image src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt={user.username} className={styles.avatar} width={32} height={32} />}
        <span>{locale === 'en' ? 'Hello' : 'Olá'}, {user.username}!</span>
      </div>
      <a href="/logout" onClick={logout} className={styles.logoutButton}>{locale === 'en' ? 'Log out' : 'Sair'}</a>
    </div>;
  }
  return <a href="/auth/discord" className={`${styles.button} ${styles.loginButton}`}>{t('nav.login')} Discord</a>;
}
