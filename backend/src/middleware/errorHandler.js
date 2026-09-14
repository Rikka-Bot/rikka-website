function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  const candidate = err.statusCode || err.status;
  const statusCode = Number.isInteger(candidate) && candidate >= 400 && candidate <= 599 ? candidate : 500;
  // Error messages/stacks from OAuth, JSON parsing and Firebase may contain secrets.
  console.error('Request failed', { status: statusCode, method: req.method });
  const messages = { 400: 'Invalid request', 403: 'Forbidden', 413: 'Request body too large' };
  res.status(statusCode).json({ message: messages[statusCode] || 'Internal server error' });
}

module.exports = errorHandler;
