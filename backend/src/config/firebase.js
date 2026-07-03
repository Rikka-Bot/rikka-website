const admin = require('firebase-admin');

function normalizeServiceAccount(serviceAccount) {
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }

  return serviceAccount;
}

function parseServiceAccount() {
  const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  const base64ServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (base64ServiceAccount) {
    const decoded = Buffer.from(base64ServiceAccount, 'base64').toString('utf8');
    return normalizeServiceAccount(JSON.parse(decoded));
  }

  if (!rawServiceAccount) {
    return null;
  }

  return normalizeServiceAccount(JSON.parse(rawServiceAccount));
}

function initializeFirebaseAdmin() {
  if (admin.apps.length) {
    return admin.app();
  }

  const serviceAccount = parseServiceAccount();

  if (!serviceAccount) {
    throw new Error('Configure FIREBASE_SERVICE_ACCOUNT ou FIREBASE_SERVICE_ACCOUNT_BASE64 no ambiente do backend.');
  }

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const firebaseApp = initializeFirebaseAdmin();
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
const FieldValue = admin.firestore.FieldValue;

module.exports = {
  admin,
  firebaseApp,
  db,
  auth,
  storage,
  FieldValue,
};
