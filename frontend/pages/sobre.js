import Image from 'next/image';
import PageSeo from '../components/PageSeo';
import FinalCta from '../components/landing/FinalCta';
import PageHero from '../components/landing/PageHero';
import Reveal from '../components/landing/Reveal';
import {useLanguage} from '../contexts/LanguageContext';
import {DISCORD_INVITE_URL,DREAMS_URL,SUPPORT_URL,TOP_GG_URL} from '../lib/siteConfig';
import styles from '../styles/Home.module.css';
export default function Sobre(){
    const {t}=useLanguage();
    return <>
    <PageSeo titleKey="aboutPage.seo.title" descriptionKey="aboutPage.seo.description" pageKey="about"/>
    <main className={`${styles.page} ${styles.routePage}`}>
        <PageHero kicker={t('aboutPage.hero.kicker')} title={t('aboutPage.hero.title')} accent={t('aboutPage.hero.accent')} description={t('aboutPage.hero.text')}/>
        <section className="section"><Reveal className={styles.aboutStory}>
            <div className={styles.aboutPortrait}>
                <Image src="/rikka.png" width={280} height={280} alt={t('common.avatar')} priority/>
                <span>RIKKA · CARD BOT</span></div><div><span className="sectionKicker">{t('aboutPage.goal')}</span><h2>{t('aboutPage.center')}</h2>
                <p>{t('aboutPage.p1')}</p><p>{t('aboutPage.p2')}</p>
                <div className={styles.aboutLinks}>
                    <a href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">{t('common.addDiscord')} ↗</a>
                    <a href={SUPPORT_URL} target="_blank" rel="noreferrer">{t('common.support')} ↗</a>
                    <a href={TOP_GG_URL} target="_blank" rel="noreferrer">Top.gg ↗</a>
                    </div>
                    </div>
                    </Reveal>
                    </section>
                    <section className={styles.dreamsSection}>
                        <Reveal>
                            <span className="sectionKicker">Dreams Experience</span>
                            <h2>{t('aboutPage.dreamsTitle')}</h2><p>{t('aboutPage.dreamsText')}</p>
                            <a className="button buttonLight" href={DREAMS_URL} target="_blank" rel="noreferrer">{t('aboutPage.dreamsCta')} ↗</a>
                            </Reveal></section><FinalCta reaction="/emojis/carinho.png"/>
                            </main>
                            </>;
                            }
