import styles from '../../styles/Home.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

export default function CardPlaceholder({ label, index = 0, selected = false, compact = false }) {
  const { t } = useLanguage();
  return (
    <div className={`${styles.card} ${styles[`cardTone${index % 4}`]} ${selected ? styles.cardSelected : ''} ${compact ? styles.cardCompact : ''}`}>
      <div className={styles.cardShine} aria-hidden="true" />
      <div className={styles.cardSilhouette} aria-hidden="true">
        <span />
      </div>
      <div className={styles.cardMeta}>
        <span>{label || `${t('collection.card')} ${String.fromCharCode(65 + index)}`}</span>
        <b>{t('collection.edition')} {String(index + 1).padStart(2, '0')}</b>
      </div>
    </div>
  );
}
