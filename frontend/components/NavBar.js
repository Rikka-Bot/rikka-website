<<<<<<< HEAD:frontend/components/NavBar.js
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
  <a href={apiUrl + '/auth/discord'}><Button variant='contained'><strong>Login</strong></Button></a>
 </li>
</ul>
    </nav>
    </>)
}

=======
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

>>>>>>> 19ed3627b1c9c09d74e34d41c4aa79d4dce1ecd6:components/NavBar.js
