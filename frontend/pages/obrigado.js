import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function obrigado() {

  return ( <>

<Head> 
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Rikka Website" />
      <meta property="og:description" content="Website da discord bot Rikka"/>
      <meta name="theme-color" content="#00d1ff" />
</Head>
    <div className={styles.container}>   
      <h1 className={styles.titulo}>Obrigado por adicionar a Rikka!❤️</h1>
      <br /><br />
      <h3 className={styles.meio}>Considere entrar no servidor de suporte:<br /><a href='https://discord.com/api/oauth2/authorize?client_id=770762400034848808&permissions=8&scope=bot%20applications.commands'><Button variant='contained'><strong>Convite</strong></Button></a></h3>
      <br/>
    
    </div>
    </>)
}

export default obrigado
