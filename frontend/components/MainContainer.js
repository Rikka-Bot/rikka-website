import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { useLanguage } from '../contexts/LanguageContext';
import styles from '../styles/MainContainer.module.css';

export default function MainContainer({ children, routeKey }) {
  const { t } = useLanguage();
  return <><Head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><link rel="icon" type="image/png" sizes="96x96" href="/rikka-96.png" /><link rel="apple-touch-icon" sizes="180x180" href="/rikka-180.png" /><link rel="manifest" href="/site.webmanifest" /></Head>
    <div className={styles.wrapper}><ScrollToTop /><a className={styles.skipLink} href="#main-content">{t('skip')}</a><NavBar /><div key={routeKey} id="main-content" className={`${styles.container} ${styles.pageTransition}`}>{children}</div><Footer /></div>
  </>;
}
