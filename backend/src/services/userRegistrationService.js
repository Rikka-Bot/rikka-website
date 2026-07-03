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

async function registerUserProfile(profile, ipAddress) {
  const discordId = String(profile.id);
  const userRef = db.collection('users').doc(discordId);
  const existingUser = await userRef.get();
  const now = FieldValue.serverTimestamp();
  const verifiedUserData = buildVerifiedUserData(profile, now);

  getPreparedCollectionRefs(userRef);

  if (existingUser.exists) {
    await userRef.set(verifiedUserData, { merge: true });
    return { status: 'existing' };
  }

  const batch = db.batch();

  batch.set(
    userRef,
    {
      ...verifiedUserData,
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
