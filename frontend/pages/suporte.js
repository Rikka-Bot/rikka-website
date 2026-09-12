import Image from 'next/image';
import PageSeo from '../components/PageSeo';
import {useLanguage} from '../contexts/LanguageContext';
import {SUPPORT_URL} from '../lib/siteConfig';
import styles from '../styles/Suporte.module.css';

export default function Suporte(){
    const {t}=useLanguage();
    return <>
    <PageSeo titleKey="support.seo" descriptionKey="support.text" pageKey="support" robots="noindex, follow"/>
    <main className={styles.page}>
        <div className={styles.content}>
            <Image src="/rikka.png" width={112} height={112} alt={t('common.avatar')} priority/>
    <span>{t('support.kicker')}</span>
    <h1>{t('support.title')}</h1>
    <p>{t('support.text')}</p>
    <a href={SUPPORT_URL} target="_blank" rel="noreferrer">{t('support.cta')} ↗</a>
    </div>
    </main>
    </>;}
