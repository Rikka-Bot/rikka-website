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
