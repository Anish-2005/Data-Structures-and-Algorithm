const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const { ALLOWED_ORIGINS, CORS_OPTIONS } = require('./constants');

const configureMiddleware = (app) => {
  // CORS Configuration
  const corsOptions = {
    ...CORS_OPTIONS,
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      try {
        const url = new URL(origin);
        const baseOrigin = `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ''}`;
        
        const isAllowed = ALLOWED_ORIGINS.some(allowedOrigin => {
          const normalize = (str) => str.replace(/\/+$/, '').toLowerCase();
          return normalize(baseOrigin) === normalize(allowedOrigin);
        });

        if (isAllowed) {
          callback(null, true);
        } else {
          console.warn(`CORS blocked request from: ${origin}`);
          callback(new Error('Not allowed by CORS'));
        }
      } catch (err) {
        console.warn(`Invalid origin format: ${origin}`);
        callback(new Error('Invalid origin'));
      }
    }
  };

  // Security Middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:']
      }
    },
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  // Performance Middleware
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cors(corsOptions));
};

module.exports = configureMiddleware;