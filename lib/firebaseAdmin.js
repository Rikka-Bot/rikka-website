// lib/firebaseAdmin.js
// Configuração do Firebase Admin (server-side para API routes)

import admin from 'firebase-admin';

// Verificar se o Firebase Admin já foi inicializado
if (!admin.apps.length) {
  // Converter a chave privada de string para objeto se necessário
  let serviceAccount;
  
  try {
    // Se for uma string JSON
    if (typeof process.env.FIREBASE_SERVICE_ACCOUNT === 'string') {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
      serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    }
  } catch (error) {
    console.error('Erro ao parsear FIREBASE_SERVICE_ACCOUNT:', error);
    serviceAccount = null;
  }

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } else {
    console.warn('⚠️ FIREBASE_SERVICE_ACCOUNT não configurado. Algumas funções podem não funcionar.');
  }
}

export const adminDB = admin.firestore();
export const adminAuth = admin.auth();

export default admin;
