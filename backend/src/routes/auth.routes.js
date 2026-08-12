import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { uploadAvatar } from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema, changePasswordSchema, passwordResetRequestSchema, passwordResetConfirmSchema } from '../utils/validators.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register/', authLimiter, validate(registerSchema), authController.register);
router.post('/login/', authLimiter, validate(loginSchema), authController.login);
router.post('/logout/', authenticate, authController.logout);
router.post('/google/', authLimiter, authController.googleLogin);
router.get('/me/', authenticate, authController.getMe);
router.put('/me/', authenticate, uploadAvatar.single('avatar'), authController.updateMe);
router.post('/change-password/', authenticate, validate(changePasswordSchema), authController.changePassword);
router.post('/password-reset/', authLimiter, validate(passwordResetRequestSchema), authController.passwordResetRequest);
router.post('/password-reset/confirm/', validate(passwordResetConfirmSchema), authController.passwordResetConfirm);
router.delete('/delete-account/', authenticate, authController.deleteAccount);
router.post('/token/refresh/', authController.refreshToken);

export default router;
