import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import PageSeo from '../components/PageSeo';
import FinalCta from '../components/landing/FinalCta';
import Reveal from '../components/landing/Reveal';
import { CollectionShowcase, FlowSteps, ResourceCards } from '../components/landing/SharedSections';
import { useLanguage } from '../contexts/LanguageContext';
import { localizedPath } from '../i18n/routes';
import { DISCORD_INVITE_URL, DREAMS_URL, SITE_URL } from '../lib/siteConfig';
import styles from '../styles/Home.module.css';

export default function Home(){const {t,locale}=useLanguage();const data={'@context':'https://schema.org','@type':'SoftwareApplication',name:'Rikka',description:t('home.seo.description'),url:SITE_URL,applicationCategory:'EntertainmentApplication',operatingSystem:'Discord',creator:{'@type':'Organization',name:'Dreams Experience',url:DREAMS_URL}};return <><PageSeo titleKey="home.seo.title" descriptionKey="home.seo.description" pageKey="home"/><Head><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/></Head><main className={styles.page}>
  <section className={styles.hero}><div className={styles.heroGlow}/><div className={styles.heroContent}><div className={styles.heroCopy}><div className={styles.eyebrow}><span>✦</span>{t('home.kicker')}</div><h1>{t('home.title')}<br/><em>{t('home.accent')}</em></h1><p>{t('home.text')}</p><div className={styles.heroActions}><a className="button buttonPrimary" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">{t('common.add')} ↗</a><Link className="button buttonGhost" href={localizedPath('how',locale)}>{t('home.howCta')} →</Link></div><div className={styles.heroTags}><span>ANIME</span><span>GAMES</span><span>CARDS</span><span>DISCORD</span></div></div><div className={styles.heroArt}><div className={styles.heroImageFrame}><Image src="/selfinha.jpg" alt="Rikka" fill priority sizes="(max-width: 768px) 94vw, 52vw" className={styles.heroImage}/></div><div className={`${styles.floatingCard} ${styles.floatingCardTop}`}><span>DROP!</span><b>03 CARDS</b></div><div className={`${styles.floatingCard} ${styles.floatingCardBottom}`}><span>{t('flow.collection').toUpperCase()}</span><b>{t('collection.unique')} ♡</b></div><span className={styles.sparkleOne}>✦</span><span className={styles.sparkleTwo}>✦</span></div></div></section>
  <section className={styles.intro}><Reveal className={styles.introInner}><div className={styles.avatarSeal}><Image src="/rikka.png" alt={t('common.avatar')} width={88} height={88}/></div><div><span className="sectionKicker">{t('home.hello')}</span><h2>{t('home.intro')}</h2><p>{t('home.introText')}</p></div></Reveal></section>
  <FlowSteps preview/><CollectionShowcase preview/><div className={styles.previewResources}><ResourceCards preview/></div><FinalCta/>
  <section className={styles.homeDreams}><Reveal><span>{t('home.dreams')}</span><p>{t('home.dreamsText')}</p><Link href={localizedPath('about',locale)}>{t('home.aboutCta')} →</Link></Reveal></section>
  </main></>;}
