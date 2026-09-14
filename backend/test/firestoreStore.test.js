const assert = require('node:assert/strict');
const { test } = require('node:test');
const FirestoreSessionStore = require('../src/session/firestoreStore');

function fakeFirestore() {
  const records = new Map();
  const document = (id) => ({
    async get() {
      return {
        exists: records.has(id),
        data: () => records.get(id),
        ref: document(id),
      };
    },
    async set(value) { records.set(id, value); },
    async update(value) {
      if (!records.has(id)) throw Object.assign(new Error('not found'), { code: 5 });
      records.set(id, { ...records.get(id), ...value });
    },
    async delete() { records.delete(id); },
  });
  return { collection: () => ({ doc: document }), records };
}

function storeCall(store, method, ...args) {
  return new Promise((resolve, reject) => {
    store[method](...args, (error, value) => error ? reject(error) : resolve(value));
  });
}

test('Firestore store persists, reloads, touches and destroys a session', async () => {
  const db = fakeFirestore();
  const store = new FirestoreSessionStore({ db });
  const value = {
    cookie: { expires: new Date(Date.now() + 60_000), originalMaxAge: 60_000 },
    passport: { user: { id: '123' } },
  };

  await storeCall(store, 'set', 'secret-session-id', value);
  assert.equal(db.records.has('secret-session-id'), false, 'session IDs are hashed in Firestore');
  assert.deepEqual((await storeCall(store, 'get', 'secret-session-id')).passport.user, { id: '123' });
  await storeCall(store, 'touch', 'secret-session-id', value);
  await storeCall(store, 'destroy', 'secret-session-id');
  assert.equal(await storeCall(store, 'get', 'secret-session-id'), null);
});

test('Firestore store rejects and removes expired sessions', async () => {
  const db = fakeFirestore();
  const store = new FirestoreSessionStore({ db });
  await storeCall(store, 'set', 'expired', {
    cookie: { expires: new Date(Date.now() - 1), originalMaxAge: 1 },
  });
  assert.equal(await storeCall(store, 'get', 'expired'), null);
  assert.equal(db.records.size, 0);
});
