import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Debug() {
  const [authStatus, setAuthStatus] = useState('Carregando...');
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Debug: Fazendo fetch para /api/auth/user');
        const response = await fetch('/api/auth/user', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('🔍 Debug: Response status:', response.status);
        const data = await response.json();
        console.log('🔍 Debug: Response data:', JSON.stringify(data, null, 2));

        if (data.authenticated) {
          setAuthStatus('✅ AUTENTICADO');
          setAuthData(data.user);
        } else {
          setAuthStatus('❌ NÃO AUTENTICADO');
          setAuthData(data);
        }
      } catch (error) {
        console.error('🔍 Debug: Erro:', error);
        setAuthStatus('❌ ERRO: ' + error.message);
      }
    };

    checkAuth();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#1e1e1e', color: '#00ff00', minHeight: '100vh' }}>
      <h1>🔍 DEBUG - Status de Autenticação</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#2d2d2d', borderRadius: '5px' }}>
        <h2>Status:</h2>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{authStatus}</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#2d2d2d', borderRadius: '5px' }}>
        <h2>Dados:</h2>
        <pre>{JSON.stringify(authData, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#2d2d2d', borderRadius: '5px' }}>
        <h2>Links de Teste:</h2>
        <ul>
          <li><Link href="/auth/discord"><a style={{ color: '#0099ff' }}>Login com Discord</a></Link></li>
          <li><Link href="/logout"><a style={{ color: '#0099ff' }}>Logout</a></Link></li>
          <li><Link href="/sucesso"><a style={{ color: '#0099ff' }}>Sucesso</a></Link></li>
          <li><Link href="/bloqueado"><a style={{ color: '#0099ff' }}>Bloqueado</a></Link></li>
          <li><Link href="/"><a style={{ color: '#0099ff' }}>Home</a></Link></li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#2d2d2d', borderRadius: '5px' }}>
        <h2>Console do Navegador:</h2>
        <p>Abra o console (F12) para ver os logs detalhados da autenticação.</p>
      </div>
    </div>
  );
}
