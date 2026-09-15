function hasOwn(source, key) {
  return Object.prototype.hasOwnProperty.call(source ?? {}, key);
}

function sameValue(left, right) {
  return left === right || (left == null && right == null);
}

function buildExistingUserPatch(existing, profile, timestamp) {
  const desiredIdentity = {
    discordId: String(profile.id),
    username: profile.username || 'Unknown',
    globalName: profile.globalName || null,
    avatar: profile.avatar || null,
    email: profile.email || null,
    verified: true,
  };
  const patch = {};

  for (const [key, value] of Object.entries(desiredIdentity)) {
    if (!sameValue(existing?.[key], value)) patch[key] = value;
  }

  if (!hasOwn(existing, 'blacklisted')) patch.blacklisted = false;
  if (!hasOwn(existing, 'verifiedAt')) patch.verifiedAt = timestamp;
  if (!hasOwn(existing, 'createdAt')) patch.createdAt = timestamp;
  if (Object.keys(patch).length > 0) patch.updatedAt = timestamp;

  return patch;
}

function buildNewUserData(profile, ipAddress, timestamp) {
  return {
    discordId: String(profile.id),
    username: profile.username || 'Unknown',
    globalName: profile.globalName || null,
    avatar: profile.avatar || null,
    email: profile.email || null,
    verified: true,
    verifiedAt: timestamp,
    updatedAt: timestamp,
    ipAddress,
    blacklisted: false,
    createdAt: timestamp,
  };
}

function createUserRegistrationService({ db, FieldValue, sendNewUserWebhook }) {
  if (!db || !FieldValue) throw new Error('Firestore dependencies are required.');

  return async function registerUserProfile(profile, ipAddress) {
    const discordId = String(profile.id);
    const normalizedIpAddress = ipAddress || 'unknown';
    const userRef = db.collection('users').doc(discordId);

    const result = await db.runTransaction(async (transaction) => {
      const existingUser = await transaction.get(userRef);
      const now = FieldValue.serverTimestamp();

      if (existingUser.exists) {
        const patch = buildExistingUserPatch(existingUser.data() || {}, profile, now);
        if (Object.keys(patch).length > 0) {
          transaction.set(userRef, patch, { merge: true });
        }
        return { status: 'existing', verificationStatus: existingUser.data().blacklisted ? 'blocked' : 'verified', wrote: Object.keys(patch).length > 0 };
      }

      if (normalizedIpAddress !== 'unknown') {
        const ipQuery = db.collection('users')
          .where('ipAddress', '==', normalizedIpAddress)
          .limit(1);
        const existingIpSnapshot = await transaction.get(ipQuery);

        if (!existingIpSnapshot.empty) return { status: 'ip_taken', wrote: false };
      }

      transaction.set(userRef, buildNewUserData(profile, normalizedIpAddress, now));
      return { status: 'created', wrote: true };
    });

    if (result.status === 'created' && sendNewUserWebhook) {
      try {
        await sendNewUserWebhook({
          username: profile.username,
          discordId,
          ipAddress: normalizedIpAddress,
        });
      } catch (webhookError) {
        console.error('Discord registration webhook failed');
      }
    }

    return result;
  };
}

module.exports = {
  buildExistingUserPatch,
  buildNewUserData,
  createUserRegistrationService,
};
