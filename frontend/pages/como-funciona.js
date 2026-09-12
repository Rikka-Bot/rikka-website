import PageSeo from '../components/PageSeo';
import FinalCta from '../components/landing/FinalCta';
import PageHero from '../components/landing/PageHero';
import RikkaNote from '../components/landing/RikkaNote';
import { CollectionShowcase, DropGrabSections, FlowSteps } from '../components/landing/SharedSections';
import { useLanguage } from '../contexts/LanguageContext';
import styles from '../styles/Home.module.css';

export default function ComoFunciona() {
  const { t } = useLanguage();
  return <><PageSeo titleKey="how.seo.title" descriptionKey="how.seo.description" pageKey="how"/><main className={`${styles.page} ${styles.routePage}`}><PageHero kicker={t('how.hero.kicker')} title={t('how.hero.title')} accent={t('how.hero.accent')} description={t('how.hero.text')}/><FlowSteps/><RikkaNote messageKey="rikkaNote.drop" reaction="/emojis/rikka_anotado.png"/><DropGrabSections/><CollectionShowcase/><FinalCta title={t('how.cta.title')} description={t('how.cta.text')}/></main></>;
}
