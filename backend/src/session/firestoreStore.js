const crypto = require('crypto');
const session = require('express-session');

class FirestoreSessionStore extends session.Store {
  constructor({ db, collectionName = 'sessions' }) {
    super();
    if (!db) throw new Error('Firestore is required for the session store.');
    this.collection = db.collection(collectionName);
  }

  documentForSession(sid) {
    const id = crypto.createHash('sha256').update(sid).digest('hex');
    return this.collection.doc(id);
  }

  get(sid, callback) {
    this.documentForSession(sid).get()
      .then(async (snapshot) => {
        if (!snapshot.exists) return callback(null, null);
        const stored = snapshot.data() || {};
        const expiresAt = stored.expiresAt?.toDate?.() || stored.expiresAt;
        if (expiresAt && new Date(expiresAt).getTime() <= Date.now()) {
          await snapshot.ref.delete();
          return callback(null, null);
        }
        return callback(null, JSON.parse(stored.session));
      })
      .catch(callback);
  }

  set(sid, value, callback = () => {}) {
    const expiresAt = value.cookie?.expires
      ? new Date(value.cookie.expires)
      : new Date(Date.now() + (value.cookie?.originalMaxAge || 24 * 60 * 60 * 1000));
    this.documentForSession(sid).set({
      session: JSON.stringify(value),
      expiresAt,
      updatedAt: new Date(),
    }).then(() => callback()).catch(callback);
  }

  destroy(sid, callback = () => {}) {
    this.documentForSession(sid).delete().then(() => callback()).catch(callback);
  }

  touch(sid, value, callback = () => {}) {
    const expiresAt = value.cookie?.expires
      ? new Date(value.cookie.expires)
      : new Date(Date.now() + (value.cookie?.originalMaxAge || 24 * 60 * 60 * 1000));
    this.documentForSession(sid).update({ expiresAt, updatedAt: new Date() })
      .then(() => callback())
      .catch((error) => {
        if (error.code === 5 || error.code === 'not-found') return this.set(sid, value, callback);
        return callback(error);
      });
  }
}

module.exports = FirestoreSessionStore;
