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

import Head from 'next/head';

export default function Sucesso() {
  return (
    <>
      <Head>
        <title>Parabéns!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '420px' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>Parabéns!</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            Conta criada com sucesso.
            <br />
            Você pode voltar para o Discord.
          </p>
        </div>
      </main>
    </>
  );
}
// 19ed3627b1c9c09d74e34d41c4aa79d4dce1ecd6:pages/sucesso.js
