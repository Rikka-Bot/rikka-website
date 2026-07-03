const express = require('express');
const { passport } = require('../config/passport');
const {
  handleDiscordCallback,
  getAuthenticatedUser,
  logout,
  logoutAndRedirect,
} = require('../controllers/authController');

const router = express.Router();
const failureRedirect = process.env.CORS_ORIGIN || 'http://localhost:3000';

router.get('/auth/discord', passport.authenticate('discord'));
router.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect }), handleDiscordCallback);
router.get('/api/auth/callback', passport.authenticate('discord', { failureRedirect }), handleDiscordCallback);
router.get('/api/auth/user', getAuthenticatedUser);
router.post('/api/auth/logout', logout);
router.get('/logout', logoutAndRedirect);
router.post('/logout', logoutAndRedirect);

module.exports = router;
