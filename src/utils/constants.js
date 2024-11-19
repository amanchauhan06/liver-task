// Environment
const ENV = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test'
  };
  
  // Server Configuration
  const SERVER = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || ENV.DEVELOPMENT,
    API_PREFIX: '/api',
    API_VERSION: '/v1',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
  };
  
  // Firebase Configuration
  const FIREBASE = {
    PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    COLLECTION: {
      USERS: 'users',
      RECENTLY_VIEWED: 'recentlyViewed',
      PRODUCTS: 'products'
    }
  };
  
  // Redis Configuration
  const REDIS = {
    HOST: process.env.REDIS_HOST || 'localhost',
    PORT: process.env.REDIS_PORT || 6379,
    PASSWORD: process.env.REDIS_PASSWORD,
    PREFIX: {
      USER: 'user:',
      PRODUCT: 'product:',
      RECENTLY_VIEWED: 'recently-viewed:'
    },
    EXPIRATION: {
      RECENTLY_VIEWED: 60 * 60 * 24, // 24 hours
      PRODUCT: 60 * 60 * 12,         // 12 hours
      USER: 60 * 60                  // 1 hour
    }
  };
  
  // Email Configuration
  const EMAIL = {
    SERVICE: process.env.EMAIL_SERVICE || 'gmail',
    USER: process.env.EMAIL_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
    FROM: process.env.EMAIL_FROM || 'noreply@yourapp.com',
    TEMPLATES: {
      PRODUCT_VIEW_NOTIFICATION: 'product-view-notification',
      WELCOME: 'welcome'
    }
  };
  
  // Product Configuration
  const PRODUCT = {
    MAX_RECENTLY_VIEWED: 10,
    VIEW_THRESHOLD: {
      NOTIFICATION: 3,    // Send notification after 3 views
      MILESTONE: 5        // Send milestone notification after 5 views
    },
    TIME_WINDOW: {
      RECENT: 24 * 60 * 60 * 1000,  // 24 hours in milliseconds
      POPULAR: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
    }
  };
  
  // Authentication Configuration
  const AUTH = {
    TOKEN_TYPE: 'Bearer',
    HEADER: 'Authorization',
    EXPIRATION: 60 * 60 * 24,  // 24 hours
    ERROR_MESSAGES: {
      INVALID_TOKEN: 'Invalid token provided',
      MISSING_TOKEN: 'No token provided',
      EXPIRED_TOKEN: 'Token has expired',
      UNAUTHORIZED: 'Unauthorized access'
    }
  };
  
  // API Response Status Codes
  const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
  };
  
  // API Response Messages
  const MESSAGES = {
    SUCCESS: {
      PRODUCT_VIEW_LOGGED: 'Product view logged successfully',
      RECENTLY_VIEWED_FETCHED: 'Recently viewed products fetched successfully'
    },
    ERROR: {
      PRODUCT_NOT_FOUND: 'Product not found',
      USER_NOT_FOUND: 'User not found',
      INVALID_REQUEST: 'Invalid request parameters',
      SERVER_ERROR: 'Internal server error occurred'
    }
  };
  
  // Cache Keys
  const CACHE_KEYS = {
    RECENTLY_VIEWED: (userId) => `${REDIS.PREFIX.RECENTLY_VIEWED}${userId}`,
    PRODUCT: (productId) => `${REDIS.PREFIX.PRODUCT}${productId}`,
    USER: (userId) => `${REDIS.PREFIX.USER}${userId}`
  };
  
  // Logger Configuration
  const LOGGER = {
    LEVELS: {
      ERROR: 'error',
      WARN: 'warn',
      INFO: 'info',
      DEBUG: 'debug'
    },
    FILES: {
      ERROR: 'logs/error.log',
      COMBINED: 'logs/combined.log'
    }
  };
  
  // Validation Constants
  const VALIDATION = {
    USER_ID: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 50
    },
    PRODUCT_ID: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 50
    }
  };
  
  // Export all constants
  module.exports = {
    ENV,
    SERVER,
    FIREBASE,
    REDIS,
    EMAIL,
    PRODUCT,
    AUTH,
    STATUS_CODES,
    MESSAGES,
    CACHE_KEYS,
    LOGGER,
    VALIDATION,
    
    // Helper function to get full API path
    getApiPath: (path) => `${SERVER.API_PREFIX}${SERVER.API_VERSION}${path}`,
    
    // Helper function to get cache key
    getCacheKey: (type, id) => {
      switch(type) {
        case 'recentlyViewed':
          return CACHE_KEYS.RECENTLY_VIEWED(id);
        case 'product':
          return CACHE_KEYS.PRODUCT(id);
        case 'user':
          return CACHE_KEYS.USER(id);
        default:
          throw new Error('Invalid cache key type');
      }
    }
  };