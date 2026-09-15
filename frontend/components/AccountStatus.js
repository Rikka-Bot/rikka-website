import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { localizedPath } from '../i18n/routes';
import { SUPPORT_URL } from '../lib/siteConfig';
import styles from '../styles/AccountStatus.module.css';

// Presentation only: each existing page supplies its fixed visual variant.
export default function AccountStatus({ variant }) {
  const { locale, t } = useLanguage();
  const [imageFailed, setImageFailed] = useState(false);
  const blocked = variant === 'blocked';
  const key = `account.${variant}`;

  return <>
    <Head><title>{t(`${key}.badge`)} | Rikka</title><meta name="robots" content="noindex, nofollow" /></Head>
    <main className={`${styles.page} ${blocked ? styles.blocked : ''}`}>
      <div className={styles.decorations} aria-hidden="true">
        <span>♡</span><span>✦</span><span>◇</span><span>☆</span><span>♡</span>
      </div>
      <section className={styles.layout} aria-labelledby="account-title">
        <div className={styles.scene} aria-hidden="true">
          <div className={styles.halo} />
          <div className={styles.backCard} />
          <div className={styles.frontCard}><span>RIKKA</span><span>◇</span></div>
          <span className={styles.sticker}>{t(`${key}.sticker`)} <span>✦</span></span>
          <div className={styles.reaction}>
            {imageFailed ? <span className={styles.fallback}>Rikka<span>♡</span></span> :
              <Image src={blocked ? '/emojis/chorando.png' : '/emojis/happy.png'} width={128} height={128} alt="" priority unoptimized onError={() => setImageFailed(true)} />}
          </div>
          <span className={styles.sceneSparkle}>✦</span>
          <span className={styles.sceneHeart}>♡</span>
          <span className={styles.caption}>RIKKA <i /> DISCORD</span>
        </div>
        <div className={styles.copy}>
          <span className={styles.badge}><span aria-hidden="true">{blocked ? '◇' : '✓'}</span>{t(`${key}.badge`)}</span>
          <h1 id="account-title">{t(`${key}.title`)}</h1>
          <p className={styles.description}>{t(`${key}.description`)}</p>
          <div className={styles.support}>
            <h2>{t(`${key}.supportTitle`)} <span aria-hidden="true">✦</span></h2>
            <p>{t(`${key}.supportText`)}</p>
          </div>
          <div className={styles.actions}>
            <a className={`button buttonPrimary ${styles.primary}`} href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">{t('account.supportCta')} <span aria-hidden="true">↗</span></a>
            <Link className={`button buttonGhost ${styles.home}`} href={localizedPath('home', locale)}>{t('account.home')}</Link>
          </div>
        </div>
      </section>
    </main>
  </>;
}
