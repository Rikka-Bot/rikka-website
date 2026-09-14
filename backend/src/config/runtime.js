function normalizeUrl(value) {
  return String(value || '').trim().replace(/\/$/, '');
}

function getFrontendUrl() {
  return validateOrigin(process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'http://localhost:3000');
}

function validateOrigin(value) {
  const normalized = normalizeUrl(value);
  let url;
  try { url = new URL(normalized); } catch { throw new Error('Configure a valid frontend/CORS origin.'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.origin !== normalized || url.username || url.password) {
    throw new Error('Frontend/CORS configuration must contain origins only.');
  }
  if (process.env.NODE_ENV === 'production' && (url.protocol !== 'https:' || ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname))) {
    throw new Error('Production frontend/CORS origins must use public HTTPS.');
  }
  return normalized;
}

function getAllowedOrigins() {
  const configured = process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || getFrontendUrl();
  return [...new Set(configured.split(',').map(validateOrigin))];
}

module.exports = {
  getAllowedOrigins,
  getFrontendUrl,
  normalizeUrl,
};
