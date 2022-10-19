import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Suporte.module.css'


function suporte() {
    return (
    <>
    <Head>
        <title>Suporte</title>
    </Head>
    <h1 className={styles.support}>Precisando de ajuda?</h1>
    <h3 className={styles.support}>Entre no servidor Rikka Land e fale diretamente com os desenvolvedores:</h3>
    </>
    )
}

export default suporte