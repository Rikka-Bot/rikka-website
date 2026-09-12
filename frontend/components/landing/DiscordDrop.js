import Image from 'next/image';
import CardPlaceholder from './CardPlaceholder';
import styles from '../../styles/Home.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

export default function DiscordDrop({ grab = false }) {
  const { t } = useLanguage();
  return (
    <div className={`${styles.discordMockup} ${grab ? styles.grabMockup : ''}`}>
      <div className={styles.mockupTop} aria-hidden="true">
        <span /><span /><span />
        <small>{t('mock.channel')}</small>
      </div>
      <div className={styles.messageRow}>
        <Image src="/rikka.png" width={48} height={48} alt={t('common.avatar')} className={styles.botAvatar} />
        <div className={styles.messageBody}>
          <p><strong>Rikka</strong><em>BOT</em><time>{t('mock.now')}</time></p>
          <span>{grab ? t('grab.message') : t('drop.message')}</span>
        </div>
      </div>
      <div className={styles.dropCards}>
        {[0, 1, 2].map((item) => (
          <CardPlaceholder key={item} index={item} selected={grab && item === 1} />
        ))}
      </div>
      {grab && <div className={styles.grabToast}><span>✓</span> {t('grab.toast')}</div>}
    </div>
  );
}
