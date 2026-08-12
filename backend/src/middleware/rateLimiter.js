import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { detail: 'Too many requests, please try again later.' }
});

export const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: { detail: 'Too many requests, please try again later.' }
});

export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  message: { detail: 'Too many requests, please try again later.' }
});
