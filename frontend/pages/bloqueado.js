import Head from 'next/head'
import styles from '../styles/Home.module.css'

function bloqueado() {
  return (
    <>
      <Head>
        <title>Cadastro bloqueado</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Cadastro bloqueado</h1>
        <br />
        <h3 className={styles.meio}>Ja existe uma conta cadastrada usando este endereco de IP.</h3>
      </div>
    </>
  )
}

export default bloqueado
