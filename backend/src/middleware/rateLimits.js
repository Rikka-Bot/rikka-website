const { rateLimit } = require('express-rate-limit');

function createLimiter(limit, windowMs) {
  return rateLimit({
    limit,
    windowMs,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { message: 'Too many requests. Try again later.' },
  });
}

// Per-process abuse controls; do not use these as authorization or account identity.
module.exports = {
  oauthStart: createLimiter(20, 10 * 60_000),
  oauthCallback: createLimiter(30, 10 * 60_000),
  sessionRead: createLimiter(120, 60_000),
  logout: createLimiter(30, 60_000),
  createLimiter,
};
