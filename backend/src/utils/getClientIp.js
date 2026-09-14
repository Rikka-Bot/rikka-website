function getClientIp(req) {
  return req.ip || req.socket?.remoteAddress || 'unknown';
}

module.exports = getClientIp;
