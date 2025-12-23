require('dotenv').config();

module.exports = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',

  // Admin
  defaultAdminUsername: process.env.ADMIN_USERNAME || 'admin',
  defaultAdminPassword: process.env.ADMIN_PASSWORD || 'admin123', // Change in production!

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};



