import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Suporte.module.css'
import Button from '@mui/material/Button';


function suporte() {
    return (
    <>
    <Head>
        <title>Suporte</title>
    </Head>
    <div>
    <h1 className={styles.support}>Precisando de ajuda?</h1>
    <h3 className={styles.support}>Entre no servidor Rikka Land e fale diretamente com os desenvolvedores:</h3>
    <br /><br />
    <Image className={styles.image} src='/rikkaland.png' width='300px' height='250px' alt='Rikka Land' />
    <br />
    <a href='https://discord.gg/eMzpeyxtHf'><Button variant='contained'><strong>Servidor</strong></Button></a>
    </div>


    </>
    )
}

export default suporte