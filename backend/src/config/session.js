const session = require('express-session');
const FirestoreSessionStore = require('../session/firestoreStore');

const isProduction = process.env.NODE_ENV === 'production';
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function getSameSite() {
  const configured = String(process.env.SESSION_COOKIE_SAME_SITE || 'lax').toLowerCase();
  if (!['lax', 'strict', 'none'].includes(configured)) {
    throw new Error('SESSION_COOKIE_SAME_SITE must be lax, strict or none.');
  }
  return configured;
}

function getCookieOptions(production = isProduction) {
  const sameSite = getSameSite();
  const secure = production || sameSite === 'none';
  const maxAge = Number(process.env.SESSION_MAX_AGE_MS || 7 * DAY_IN_MS);
  if (!Number.isFinite(maxAge) || maxAge <= 0) {
    throw new Error('SESSION_MAX_AGE_MS must be a positive number.');
  }
  return { secure, httpOnly: true, sameSite, path: '/', maxAge };
}

function createSessionMiddleware({ store } = {}) {
  if (isProduction && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)) {
    throw new Error('SESSION_SECRET with at least 32 characters is required in production.');
  }
  let selectedStore = store;
  if (!selectedStore) {
    if (process.env.NODE_ENV === 'test') {
      selectedStore = new session.MemoryStore();
    } else {
      const { db } = require('./firebase');
      selectedStore = new FirestoreSessionStore({
        db,
        collectionName: process.env.SESSION_COLLECTION || 'sessions',
      });
    }
  }
  return session({
    name: process.env.SESSION_COOKIE_NAME || 'rikka.sid',
    secret: process.env.SESSION_SECRET || 'development-only-change-me',
    store: selectedStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    proxy: isProduction,
    cookie: getCookieOptions(isProduction),
  });
}

module.exports = createSessionMiddleware();
module.exports.createSessionMiddleware = createSessionMiddleware;
module.exports.getCookieOptions = getCookieOptions;
