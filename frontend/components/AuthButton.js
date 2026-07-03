import Image from 'next/image';
import styles from '../styles/Auth.module.css';
import { useAuth } from '../contexts/AuthContext';

export default function AuthButton() {
  const { user, loading } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  if (loading) {
    return <div className={styles.button}>Carregando...</div>;
  }

  if (user) {
    return (
      <div className={styles.userContainer}>
        <div className={styles.userInfo}>
          {user.avatar && (
            <Image
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt={user.username}
              className={styles.avatar}
              width={32}
              height={32}
            />
          )}
          <span>Olá, {user.username}!</span>
        </div>
        <a href={`${apiUrl}/logout`} className={styles.logoutButton}>
          Sair
        </a>
      </div>
    );
  }

  return (
    <a href={`${apiUrl}/auth/discord`} className={`${styles.button} ${styles.loginButton}`}>
      Entrar com Discord
    </a>
  );
}
