import styles from '../styles/Auth.module.css';
import { useAuth } from '../contexts/AuthContext';

export default function AuthButton() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className={styles.button}>Carregando...</div>;
  }

  if (user) {
    return (
      <div className={styles.userContainer}>
        <div className={styles.userInfo}>
          {user.avatar && (
            <img 
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt={user.username}
              className={styles.avatar}
            />
          )}
          <span>Olá, {user.username}!</span>
        </div>
        <a href="/logout" className={styles.logoutButton}>
          Sair
        </a>
      </div>
    );
  }

  return (
    <a href="/auth/discord" className={`${styles.button} ${styles.loginButton}`}>
      Entrar com Discord
    </a>
  );
}
