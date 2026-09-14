const { getAllowedOrigins } = require('../config/runtime');

function requireTrustedOrigin(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const origin = req.get('origin');
  let source = origin;
  if (!source) {
    try { source = new URL(req.get('referer')).origin; } catch { /* Fail closed. */ }
  }
  if (!getAllowedOrigins().includes(source)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return next();
}

module.exports = requireTrustedOrigin;
