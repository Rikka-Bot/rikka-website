
import Link from 'next/link'
import styles from '../styles/NavBar.module.css'
import { HomeIcon, DiscordLogoIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Button from '@mui/material/Button';

export default function navbar() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    return(<>
    <nav className={styles.navbar}>
    <div className={styles.logo}>
      <Image src="/logo.png" width={40} height={40} alt="Rikka" />
      <h1>Rikka</h1>
    </div>
<ul className={styles.link_items}>
 <li>
    <Link href="/"><strong><HomeIcon />Home</strong></Link>
 </li>
 <li>
   <Link href="/suporte"><strong><DiscordLogoIcon/>Suporte</strong></Link>
 </li>
 <li>
  <Link href="/sobre"><strong><InfoCircledIcon/>Sobre</strong></Link>
 </li>
 <li>
  <a href={apiUrl + '/auth/discord'}><Button variant='contained'><strong>Login</strong></Button></a>
 </li>
</ul>
    </nav>
    </>)
}

