import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Sobre.module.css'
function sobre() {
    return (
    <>
    <Head>
        <title>Sobre</title>
    </Head>
    <div>
    <h1 className={styles.sobre}> Sobre a Rikka</h1>
    <br />
    <Image className={styles.imagem} src='/rikkagame.png' width='300px' height='250px' alt='Rikka' />
    <br />
    <h3 className={styles.sobre.h3}>Oie, vou falar um pouco sobre a Rikkinha(para os intimos rsrs e esse texto passa de duas linhas kkkkk). <br /> Ela foi criada para ajudar o seu servidor a com diversas funções</h3>

    </div>
    </>
    )
}

export default sobre