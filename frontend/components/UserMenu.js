import { useEffect, useId, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { logout } from '../lib/logout';
import styles from '../styles/NavBar.module.css';

function UserAvatar({ user, name }) {
  const [failedSource, setFailedSource] = useState(null);
  const source = !user.avatar ? null : /^https?:\/\//i.test(user.avatar)
    ? user.avatar
    : user.id ? `https://cdn.discordapp.com/avatars/${encodeURIComponent(user.id)}/${encodeURIComponent(user.avatar)}.png?size=64` : null;

  return <span className={styles.userAvatar} aria-hidden="true">
    {source && failedSource !== source
      // Discord's small CDN image is already sized; keep image failure handling local.
      // eslint-disable-next-line @next/next/no-img-element
      ? <img src={source} alt="" width={30} height={30} onError={() => setFailedSource(source)} />
      : <span>{Array.from(name.trim())[0]?.toLocaleUpperCase() || '?'}</span>}
  </span>;
}

export default function UserMenu({ user, mobile = false }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const menu = useRef(null);
  const id = useId();
  const name = user.globalName || user.username || t('nav.user');
  const showUsername = user.username && user.username !== name;

  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector('[role="menuitem"]')?.focus();
    const outside = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setOpen(false);
      trigger.current?.focus();
    };
    const breakpoint = window.matchMedia('(max-width: 1140px)');
    const close = () => setOpen(false);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape, true);
    breakpoint.addEventListener('change', close);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape, true);
      breakpoint.removeEventListener('change', close);
    };
  }, [open]);

  const navigate = (event) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const items = [...menu.current.querySelectorAll('[role="menuitem"]')];
    const index = items.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1
      : (index + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length;
    items[next]?.focus();
  };

  return <div ref={root} className={`${styles.userMenu} ${mobile ? styles.userMenuMobile : ''}`}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button ref={trigger} id={`${id}-trigger`} className={styles.userTrigger} type="button"
      aria-expanded={open} aria-haspopup="menu" aria-controls={`${id}-menu`} title={name}
      onClick={() => setOpen(value => !value)}
      onKeyDown={(event) => { if (['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); setOpen(true); } }}>
      <UserAvatar user={user} name={name} />
      <span className={styles.userName}>{name}</span>
      <span className={styles.userChevron} aria-hidden="true">▾</span>
    </button>
    {open && <div className={styles.userDropdown}>
      <div className={styles.userSummary}>
        <UserAvatar user={user} name={name} />
        <div><strong title={name}>{name}</strong>{showUsername && <small title={`@${user.username}`}>@{user.username}</small>}</div>
      </div>
      <div ref={menu} id={`${id}-menu`} role="menu" aria-labelledby={`${id}-trigger`} onKeyDown={navigate}>
        <button type="button" role="menuitem" tabIndex={-1} className={styles.userMenuItem} onClick={logout}>{t('nav.logout')}</button>
      </div>
    </div>}
  </div>;
}
