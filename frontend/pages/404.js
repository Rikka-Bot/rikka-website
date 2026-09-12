import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { localizedPath } from '../i18n/routes';
import styles from '../styles/NotFound.module.css';

export default function NotFound() {
  const { locale, t } = useLanguage();

  return <>
    <Head>
      <title>{t('notFound.seoTitle')}</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <main className={styles.page}>
      <span className={`${styles.sparkle} ${styles.sparkleOne}`} aria-hidden="true">✦</span>
      <span className={`${styles.sparkle} ${styles.sparkleTwo}`} aria-hidden="true">✦</span>
      <section className={styles.content} aria-labelledby="not-found-title">
        <div className={styles.copy}>
          <span className={styles.kicker}>{t('notFound.kicker')}</span>
          <h1 id="not-found-title">404</h1>
          <h2>{t('notFound.title')}</h2>
          <p>{t('notFound.text')}</p>
          <div className={styles.actions}>
            <Link className="button buttonPrimary" href={localizedPath('home', locale)}>{t('notFound.home')} <span aria-hidden="true">→</span></Link>
            <Link className="button buttonGhost" href={localizedPath('how', locale)}>{t('notFound.how')} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className={styles.scene}>
          <div className={styles.cardWrap} aria-hidden="true">
            <span className={styles.sticker}>{t('notFound.sticker')}</span>
            <div className={styles.missingCard}>
              <span className={styles.cardSparkle}>✦</span>
              <strong>?</strong>
              <span>{t('notFound.card')}</span>
              <i>404</i>
            </div>
            <span className={styles.doodle}>···⌁</span>
          </div>
          <div className={styles.rikkaMessage}>
            <Image src="/rikka.png" width={68} height={68} alt={t('common.avatar')} priority />
            <p>{t('notFound.rikka')}</p>
          </div>
        </div>
      </section>
    </main>
  </>;
}
