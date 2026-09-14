const { getAllowedOrigins } = require('./runtime');

const allowedOrigins = getAllowedOrigins();
function createCorsOptions(origins = allowedOrigins) {
  return {
    origin(origin, callback) {
      if (!origin || origins.includes(origin.replace(/\/$/, ''))) return callback(null, true);
      return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  };
}

const corsOptions = createCorsOptions();

module.exports = corsOptions;
module.exports.allowedOrigins = allowedOrigins;
module.exports.createCorsOptions = createCorsOptions;
