import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex'),
    refreshSecret: process.env.JWT_REFRESH_SECRET || crypto.randomBytes(32).toString('hex'),
  },
  google: {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  corsOrigins: process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'],
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM || 'noreply@marcoindia.in',
    adminEmails: process.env.ADMIN_EMAILS 
      ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim()) 
      : ['faizanrock705@gmail.com', 'admin@marcoindia.in'],
  },
  env: process.env.NODE_ENV || 'development'
};
