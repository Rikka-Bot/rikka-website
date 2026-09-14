require('dotenv').config();

const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/cors');
const sessionMiddleware = require('./config/session');
const { configurePassport, passport } = require('./config/passport');
const apiRoutes = require('./routes');
const authRoutes = require('./routes/authRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const requireTrustedOrigin = require('./middleware/csrf');
const limits = require('./middleware/rateLimits');

configurePassport();

const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(cors(corsOptions));
app.use(requireTrustedOrigin);
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Cache-Control', 'no-store');
  next();
});
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: false, limit: '16kb', parameterLimit: 20 }));
// Limit before loading/touching sessions and querying the current identity.
app.use('/auth/discord/callback', limits.oauthCallback);
app.use('/api/auth/callback', limits.oauthCallback);
app.all('/auth/discord', limits.oauthStart);
app.use('/api/auth/user', limits.sessionRead);
app.use(['/api/auth/logout', '/logout'], limits.logout);
// Public health/hello and unknown paths must not trigger Firestore session work.
app.all([
  '/auth/discord', '/auth/discord/callback', '/api/auth/callback',
  '/api/auth/user', '/api/auth/logout', '/logout',
], sessionMiddleware, passport.initialize(), passport.session());

app.use(authRoutes);
app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
