import Head from 'next/head';
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css';

function Verificado() {
  const closeWindow = () => {
    window.close();
  };

  return (
    <>
      <Head>
        <title>Conta ja verificada</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Sua conta ja esta verificada.</h1>
        <br />
        <h3 className={styles.meio}>
          Voce ja pode utilizar normalmente os comandos do bot.
        </h3>
        <br />
        <Button variant="contained" onClick={closeWindow}>
          <strong>Fechar</strong>
        </Button>
      </div>
    </>
  );
}

export default Verificado;
