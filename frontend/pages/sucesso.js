//HEAD:frontend/pages/sucesso.js
import Head from 'next/head'
import styles from '../styles/Home.module.css'

function sucesso() {
  return (
    <>
      <Head>
        <title>Cadastro realizado</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Cadastro realizado com sucesso!</h1>
        <br />
        <h3 className={styles.meio}>Você já pode retornar ao disord e começar a usar os comandos.</h3>
      </div>
    </>
  )
}

export default sucesso
