const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || 'http://localhost:3000/auth/discord/callback';

function sessionIdentity(user) {
  return {
    id: String(user.id),
    username: user.username || 'Unknown',
    globalName: user.globalName || null,
    avatar: user.avatar || null,
    verificationStatus: user.verificationStatus || 'unverified',
  };
}

async function loadCurrentIdentity(identity, db = require('./firebase').db) {
  const snapshot = await db.collection('users').doc(String(identity.id)).get();
  if (!snapshot.exists) return { ...identity, verificationStatus: identity.verificationStatus === 'blocked' ? 'blocked' : 'unverified' };
  const user = snapshot.data() || {};
  return {
    ...identity,
    username: user.username || identity.username,
    globalName: user.globalName || identity.globalName,
    avatar: user.avatar ?? identity.avatar,
    verificationStatus: user.blacklisted ? 'blocked' : (user.verified ? 'verified' : 'unverified'),
  };
}

function configurePassport({ loadIdentity = loadCurrentIdentity } = {}) {
  if (DISCORD_CLIENT_ID && DISCORD_CLIENT_SECRET) {
    passport.use(new DiscordStrategy({
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: DISCORD_REDIRECT_URI,
      scope: ['identify'],
      state: true,
    }, (_accessToken, _refreshToken, profile, done) => done(null, {
      id: profile.id,
      username: profile.username,
      globalName: profile.global_name || profile.globalName || null,
      avatar: profile.avatar,
    })));
  } else {
    console.warn('DISCORD_CLIENT_ID e DISCORD_CLIENT_SECRET não configurados. Login Discord ficará indisponível.');
  }
  passport.serializeUser((user, done) => done(null, sessionIdentity(user)));
  passport.deserializeUser((identity, done) => {
    Promise.resolve(loadIdentity(identity)).then((user) => done(null, user)).catch(done);
  });
}

module.exports = { configurePassport, passport, sessionIdentity, loadCurrentIdentity };
