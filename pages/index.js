import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Home() {

  return ( <>

<Head> 
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Rikka Website" />
      <meta property="og:description" content="Website da discord bot Rikka"/>
      <meta name="theme-color" content="#00d1ff" />
</Head>
    <div className={styles.container}>   
      <h1 className={styles.titulo}>Ohayo user! Seja bem-vindo(a) ao meu website!</h1>
      <br /><br />
      <Image className={styles.imagem} src='/Rikka-no-back.png' width='300px' height='250px' alt='Rikka' />
      <h3 className={styles.meio}>Me convide para seu servidor:<br /><a href='https://discord.com/api/oauth2/authorize?client_id=770762400034848808&permissions=8&scope=bot%20applications.commands'><Button variant='contained'><strong>Convite</strong></Button></a></h3>
      <br/>
      <h3 className={styles.meio2}>Acesse o painel:<br /><Button variant='contained' disabled><strong>Em desenvolvimento</strong></Button></h3>
    
    </div>
    </>)
}

export default Home
