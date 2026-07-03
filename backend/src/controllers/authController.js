const getClientIp = require('../utils/getClientIp');
const { registerUserProfile } = require('../services/userRegistrationService');

function getFrontendUrl() {
  return (process.env.CORS_ORIGIN || 'http://localhost:3000').replace(/\/$/, '');
}

async function handleDiscordCallback(req, res) {
  try {
    const ipAddress = getClientIp(req);
    const result = await registerUserProfile(req.user, ipAddress);

    if (result.status === 'existing') {
      return res.redirect(getFrontendUrl() + '/verificado');
    }

    if (result.status === 'ip_taken') {
      return res.redirect(getFrontendUrl() + '/bloqueado');
    }

    return res.redirect(getFrontendUrl() + '/sucesso');
  } catch (error) {
    console.error('Erro ao processar cadastro do Discord:', error);
    return res.redirect(getFrontendUrl());
  }
}

function getAuthenticatedUser(req, res) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ authenticated: false });
  }

  return res.json({ authenticated: true, user: req.user });
}

function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }

    return res.json({ success: true });
  });
}

function logoutAndRedirect(req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }

    return res.redirect(getFrontendUrl() + '/?logged_out=true');
  });
}

module.exports = {
  handleDiscordCallback,
  getAuthenticatedUser,
  logout,
  logoutAndRedirect,
};
