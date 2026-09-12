import PageSeo from '../components/PageSeo';
import FinalCta from '../components/landing/FinalCta';
import PageHero from '../components/landing/PageHero';
import RikkaNote from '../components/landing/RikkaNote';
import { CollectionShowcase, EditionsSection, ResourceCards } from '../components/landing/SharedSections';
import { useLanguage } from '../contexts/LanguageContext';
import styles from '../styles/Home.module.css';

export default function Colecao() {
  const { t } = useLanguage();
  return <><PageSeo titleKey="collectionPage.seo.title" descriptionKey="collectionPage.seo.description" pageKey="collection"/><main className={`${styles.page} ${styles.routePage}`}><PageHero kicker={t('collectionPage.hero.kicker')} title={t('collectionPage.hero.title')} accent={t('collectionPage.hero.accent')} description={t('collectionPage.hero.text')}/><CollectionShowcase/><EditionsSection/><RikkaNote messageKey="rikkaNote.collection" tone="coral"/><ResourceCards showSupport={false}/><FinalCta title={t('collectionPage.cta.title')} description={t('collectionPage.cta.text')}/></main></>;
}
