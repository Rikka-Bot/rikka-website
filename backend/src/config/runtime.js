function normalizeUrl(value) {
  return String(value || '').trim().replace(/\/$/, '');
}

function getFrontendUrl() {
  return normalizeUrl(process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'http://localhost:3000');
}

function getAllowedOrigins() {
  const configured = process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || getFrontendUrl();
  return [...new Set(configured.split(',').map(normalizeUrl).filter(Boolean))];
}

module.exports = {
  getAllowedOrigins,
  getFrontendUrl,
  normalizeUrl,
};
