const { db, FieldValue } = require('../config/firebase');
const { sendNewUserWebhook } = require('./discordWebhookService');

function buildVerifiedUserData(profile, timestamp) {
  const discordId = String(profile.id);

  return {
    discordId,
    username: profile.username || 'Unknown',
    globalName: profile.globalName || null,
    avatar: profile.avatar || null,
    verified: true,
    verifiedAt: timestamp,
    updatedAt: timestamp,
  };
}

function getPreparedCollectionRefs(userRef) {
  return {
    cards: userRef.collection('collection').doc('cards'),
    albums: userRef.collection('collection').doc('albums'),
  };
}

async function ensureBlacklistField(userRef, userSnapshot) {
  if (!Object.prototype.hasOwnProperty.call(userSnapshot.data() || {}, 'blacklisted')) {
    await userRef.set({ blacklisted: false }, { merge: true });
  }
}

async function registerUserProfile(profile, ipAddress) {
  const discordId = String(profile.id);
  const normalizedIpAddress = ipAddress || 'unknown';
  const userRef = db.collection('users').doc(discordId);
  const existingUser = await userRef.get();
  const now = FieldValue.serverTimestamp();
  const verifiedUserData = buildVerifiedUserData(profile, now);

  getPreparedCollectionRefs(userRef);

  if (existingUser.exists) {
    await ensureBlacklistField(userRef, existingUser);
    return { status: 'existing' };
  }

  if (normalizedIpAddress !== 'unknown') {
    const existingIpSnapshot = await db
      .collection('users')
      .where('ipAddress', '==', normalizedIpAddress)
      .limit(1)
      .get();

    if (!existingIpSnapshot.empty) {
      return { status: 'ip_taken' };
    }
  }

  const batch = db.batch();

  batch.set(
    userRef,
    {
      ...verifiedUserData,
      ipAddress: normalizedIpAddress,
      blacklisted: false,
      createdAt: now,
    },
    { merge: true }
  );

  batch.set(
    userRef.collection('profile').doc('stats'),
    {
      drops: 0,
      claimed: 0,
      trades: 0,
      marketSales: 0,
      marketPurchases: 0,
      favoriteCard: null,
      wishlistCount: 0,
    },
    { merge: true }
  );

  batch.set(
    userRef.collection('inventory').doc('economy'),
    {
      coins: 0,
      gems: 0,
      tickets: 0,
    },
    { merge: true }
  );

  await batch.commit();

  try {
    await sendNewUserWebhook({ username: profile.username, discordId, ipAddress });
  } catch (webhookError) {
    console.error('Erro ao enviar webhook do Discord:', webhookError.message);
  }

  return { status: 'created' };
}

module.exports = {
  registerUserProfile,
  getPreparedCollectionRefs,
};
