const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || 'http://localhost:4000/auth/discord/callback';

function configurePassport() {
  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
    console.warn('DISCORD_CLIENT_ID e DISCORD_CLIENT_SECRET não configurados. Login Discord ficará indisponível.');
    return;
  }

  passport.use(
    new DiscordStrategy(
      {
        clientID: DISCORD_CLIENT_ID,
        clientSecret: DISCORD_CLIENT_SECRET,
        callbackURL: DISCORD_REDIRECT_URI,
        scope: ['identify', 'email', 'guilds'],
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
          id: profile.id,
          username: profile.username,
          globalName: profile.global_name || profile.globalName || null,
          avatar: profile.avatar,
          email: profile.email,
          accessToken,
          refreshToken,
          guilds: profile.guilds,
        };

        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
  });

  passport.deserializeUser((userData, done) => {
    try {
      const user = typeof userData === 'string' ? JSON.parse(userData) : userData;
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = {
  configurePassport,
  passport,
};
