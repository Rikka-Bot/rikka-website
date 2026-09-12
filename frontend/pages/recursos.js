import PageSeo from '../components/PageSeo';
import FinalCta from '../components/landing/FinalCta';
import PageHero from '../components/landing/PageHero';
import {ResourceCards} from '../components/landing/SharedSections';
import {useLanguage} from '../contexts/LanguageContext';
import styles from '../styles/Home.module.css';
export default function Recursos(){
    const {t}=useLanguage();
    const steps=[['01','journey.want','journey.wantText'],['02','journey.trade','journey.tradeText'],['03','journey.complete','journey.completeText']];
    return <>
    <PageSeo titleKey="featuresPage.seo.title" descriptionKey="featuresPage.seo.description" pageKey="features"/>
    <main className={`${styles.page} ${styles.routePage}`}>
        <PageHero kicker={t('featuresPage.hero.kicker')} title={t('featuresPage.hero.title')} accent={t('featuresPage.hero.accent')} description={t('featuresPage.hero.text')}/>
        <ResourceCards/>
        <section className={styles.resourceJourney}>{steps.map(([n,title,text],i)=><span key={n} className={styles.journeyGroup}>
            <div>
                <span>{n}</span><b>{t(title)}</b>
                <p>{t(text)}</p>
                </div>
                {i<2&&<i>→</i>}</span>)}</section>
                <FinalCta/>
                </main>
                </>;
                }
