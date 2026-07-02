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
