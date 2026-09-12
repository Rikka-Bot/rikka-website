import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import { localizedPath } from '../../i18n/routes';
import CardPlaceholder from './CardPlaceholder';
import DiscordDrop from './DiscordDrop';
import Reveal from './Reveal';
import styles from '../../styles/Home.module.css';

export function FlowSteps({ preview = false }) {
  const { t, locale } = useLanguage();
  const items = [['01','flow.drop','flow.dropText'],['02','flow.grab','flow.grabText'],['03','flow.collection','flow.collectionText']];
  return <section className={`section ${styles.flowSection}`}><Reveal className="sectionHeading"><span className="sectionKicker">{t('flow.kicker')}</span><h2>{t('flow.title')}</h2><p>{t('flow.subtitle')}</p></Reveal><div className={styles.flow}>{items.map(([number,title,text],index)=><Reveal className={styles.flowStep} delay={index*100} key={number}><div className={styles.flowNumber}>{number}</div><div className={styles.flowIcon} aria-hidden="true">{index===0?'✦':index===1?'↗':'♡'}</div><h3>{t(title)}</h3><p>{t(text)}</p>{index<2&&<span className={styles.flowLine} aria-hidden="true">······›</span>}</Reveal>)}</div>{preview&&<div className={styles.centerLink}><Link className="button buttonGhost" href={localizedPath('how',locale)}>{t('flow.cta')} →</Link></div>}</section>;
}

export function DropGrabSections() {
  const { t } = useLanguage();
  return <>
    <section className={`${styles.featureBand} ${styles.dropBand}`}><div className={styles.featureGrid}><Reveal className={styles.featureCopy}><span className={`${styles.sticker} ${styles.stickerCoral}`}>{t('sticker.drop')}</span><span className="sectionKicker">01 · Drop</span><h2>{t('drop.title')}</h2><p>{t('drop.text')}</p><span className={styles.note}>{t('common.cardsNote')}</span></Reveal><Reveal className={styles.mockupTilt}><DiscordDrop /></Reveal></div></section>
    <section className={`${styles.featureBand} ${styles.grabBand}`}><div className={`${styles.featureGrid} ${styles.reverse}`}><Reveal className={styles.mockupTiltReverse}><div className={`${styles.sticker} ${styles.grabSticker}`}>{t('sticker.gotIt')}</div><DiscordDrop grab /></Reveal><Reveal className={styles.featureCopy}><span className="sectionKicker">02 · Grab</span><h2>{t('grab.title')}</h2><p>{t('grab.text')}</p><div className={styles.miniChecklist}><span>✓ {t('grab.fast')}</span><span>✓ {t('grab.feedback')}</span></div></Reveal></div></section>
  </>;
}

export function CollectionShowcase({ preview = false }) {
  const { t, locale } = useLanguage();
  return <section className={`section ${styles.collectionSection}`}><div className={styles.collectionGrid}><Reveal className={styles.collectionCopy}><span className="sectionKicker">{t('collection.kicker')}</span><h2>{t('collection.title')}</h2><p>{t('collection.text')}</p><div className={styles.collectionStat}><b>{t('collection.deck')}</b><span>{t('collection.unique')}</span></div>{preview&&<Link className={styles.inlineLink} href={localizedPath('collection',locale)}>{t('collection.cta')} →</Link>}</Reveal><Reveal className={styles.collectionBoard}><span className={`${styles.sticker} ${styles.collectionSticker}`}>{t('sticker.plusOne')}</span>{[0,1,2,3,4,5].map(item=><CardPlaceholder key={item} index={item} compact />)}</Reveal></div></section>;
}

export function EditionsSection() {
  const { t } = useLanguage();
  return <section className={styles.editions}><Reveal className="sectionHeading"><span className="sectionKicker">{t('editions.kicker')}</span><h2>{t('editions.title')}<br/><em>{t('editions.accent')}</em></h2><p>{t('editions.text')}</p></Reveal><div className={styles.editionFan}>{[0,1,2].map(item=><CardPlaceholder key={item} index={item} label={`${t('editions.item')} ${String(item+1).padStart(2,'0')}`} />)}</div></section>;
}

export function ResourceCards({ preview = false, showSupport = true }) {
  const { t, locale } = useLanguage();
  return <section className={`section ${styles.resourcesSection}`}><Reveal className="sectionHeading"><span className="sectionKicker">{t('resources.kicker')}</span><h2>{t('resources.title')}</h2></Reveal><div className={styles.resourceGrid}>
    <Reveal className={`${styles.resourceCard} ${styles.wishlistCard}`}><span className={`${styles.sticker} ${styles.wantedSticker}`}>{t('sticker.wanted')}</span><div className={styles.resourceIcon}>♡</div><div><span className="sectionKicker">{t('wishlist.label')}</span><h3>{t('wishlist.title')}</h3><p>{t('wishlist.text')}</p></div><div className={styles.wishlistUi}><span>♡ {t('wishlist.item')}</span><b>{t('wishlist.state')}</b></div></Reveal>
    <Reveal className={`${styles.resourceCard} ${styles.tradeCard}`} delay={100}><div className={styles.resourceIcon}>⇄</div><div><span className="sectionKicker">{t('trade.label')}</span><h3>{t('trade.title')}</h3><p>{t('trade.text')}</p></div><div className={styles.tradeUi}><span><i>A</i>{t('collection.card')} A</span><b>⇄</b><span><i>B</i>{t('collection.card')} B</span></div></Reveal>
  </div>{showSupport&&<Reveal className={styles.supportTools}><div className={styles.coinStack} aria-hidden="true"><span>R</span><span>R</span><span>R</span></div><div><span className="sectionKicker">{t('supportTools.label')}</span><h3>{t('supportTools.title')}</h3><p>{t('supportTools.text')}</p></div></Reveal>}{preview&&<div className={styles.centerLink}><Link className="button buttonGhost" href={localizedPath('features',locale)}>{t('resources.cta')} →</Link></div>}</section>;
}
