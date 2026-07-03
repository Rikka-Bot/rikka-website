<<<<<<< HEAD:frontend/pages/bloqueado.js
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
=======
import Head from 'next/head';

export default function Bloqueado() {
  return (
    <>
      <Head>
        <title>Conta já cadastrada</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '420px' }}>
          <h1 style={{ fontSize: '2.1rem', marginBottom: '16px' }}>Uma conta já foi cadastrada!</h1>
        </div>
      </main>
    </>
  );
}
>>>>>>> 19ed3627b1c9c09d74e34d41c4aa79d4dce1ecd6:pages/bloqueado.js
