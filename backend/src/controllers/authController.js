const getClientIp = require('../utils/getClientIp');
const { getCookieOptions } = require('../config/session');
const { getFrontendUrl } = require('../config/runtime');

function saveSession(req) {
  return new Promise((resolve, reject) => {
    req.session.save((error) => error ? reject(error) : resolve());
  });
}

function refreshLogin(req, user) {
  return new Promise((resolve, reject) => {
    req.logIn(user, (error) => error ? reject(error) : resolve());
  });
}

function createDiscordCallbackHandler(registerUser = (...args) => {
  const { registerUserProfile } = require('../services/userRegistrationService');
  return registerUserProfile(...args);
}) {
  return async function handleDiscordCallback(req, res) {
  try {
    const result = await registerUser(req.user, getClientIp(req));
    const verificationStatus = result.verificationStatus || (result.status === 'ip_taken' ? 'blocked' : 'verified');

    // Passport regenerates the session during logIn, protecting against fixation.
    await refreshLogin(req, { ...req.user, verificationStatus });
    // Persist the regenerated session before the browser follows the redirect.
    await saveSession(req);

    if (verificationStatus === 'blocked') return res.redirect(getFrontendUrl() + '/bloqueado');
    if (result.status === 'existing') return res.redirect(getFrontendUrl() + '/verificado');
    return res.redirect(getFrontendUrl() + '/sucesso');
  } catch (error) {
    console.error('Discord registration failed');
    return res.redirect(getFrontendUrl());
  }
  };
}

const handleDiscordCallback = createDiscordCallbackHandler();

function getAuthenticatedUser(req, res) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ authenticated: false });
  }
  const { id, username, globalName, avatar, verificationStatus } = req.user;
  return res.json({
    authenticated: true,
    user: { id, username, globalName, avatar, verificationStatus },
  });
}

function clearSession(req, res, callback) {
  req.logout((logoutError) => {
    if (logoutError) return callback(logoutError);
    if (!req.session) return callback();
    req.session.destroy((destroyError) => {
      if (destroyError) return callback(destroyError);
      const clearCookieOptions = { ...getCookieOptions() };
      delete clearCookieOptions.maxAge;
      res.clearCookie(process.env.SESSION_COOKIE_NAME || 'rikka.sid', clearCookieOptions);
      return callback();
    });
  });
}

function logout(req, res) {
  clearSession(req, res, (error) => {
    if (error) return res.status(500).json({ error: 'Erro ao fazer logout' });
    return res.json({ success: true });
  });
}

function logoutAndRedirect(req, res) {
  clearSession(req, res, (error) => {
    if (error) return res.status(500).json({ error: 'Erro ao fazer logout' });
    return res.redirect(303, getFrontendUrl() + '/?logged_out=true');
  });
}

module.exports = {
  handleDiscordCallback,
  createDiscordCallbackHandler,
  getAuthenticatedUser,
  logout,
  logoutAndRedirect,
};
