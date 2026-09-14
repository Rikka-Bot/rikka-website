const { getAllowedOrigins } = require('./runtime');

const allowedOrigins = getAllowedOrigins();
function createCorsOptions(origins = allowedOrigins) {
  return {
    origin(origin, callback) {
      if (!origin || origins.includes(origin)) return callback(null, true);
      return callback(Object.assign(new Error('Origin not allowed by CORS'), { status: 403 }));
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  };
}

const corsOptions = createCorsOptions();

module.exports = corsOptions;
module.exports.allowedOrigins = allowedOrigins;
module.exports.createCorsOptions = createCorsOptions;
