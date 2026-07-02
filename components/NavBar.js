import Link from 'next/link'
import styles from '../styles/NavBar.module.css'
import { HomeIcon, QuestionMarkCircledIcon, DiscordLogoIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Button from '@mui/material/Button';
import AuthButton from './AuthButton';

export default function navbar() {
    return(<>
    <nav className={styles.navbar}>
    <div className={styles.logo}>
      <Image src='/logo.png' width="40" height="40" alt="Rikka"/>
      <h1>Rikka</h1>
    </div>
<ul className={styles.link_items}>
 <li>
    <Link href="/"><a><strong><HomeIcon />Home</strong></a></Link>
 </li>
 <li>
   <Link href="/suporte"><a><strong><DiscordLogoIcon/>Suporte</strong></a></Link>
 </li>
 <li>
  <Link href="/sobre"><a><strong><InfoCircledIcon/>Sobre</strong></a></Link>
 </li>
 <li>
  <AuthButton />
 </li>
</ul>
    </nav>
    </>)
}

