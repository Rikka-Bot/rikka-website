import styles from '../../styles/Home.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PageHero({ kicker, title, accent, description, children }) {
  const { t } = useLanguage();
  return <section className={styles.pageHero}>
    <div className={styles.pageHeroOrb} aria-hidden="true">✦</div>
    <div className={styles.pageHeroInner}>
      <div><span className="sectionKicker">{kicker}</span><h1>{title}<br /><em>{accent}</em></h1><p>{description}</p>{children}</div>
      <div className={styles.pageHeroCards} aria-hidden="true"><span>DROP</span><span>GRAB</span><span>{t('flow.collection').toUpperCase()}</span></div>
    </div>
  </section>;
}
