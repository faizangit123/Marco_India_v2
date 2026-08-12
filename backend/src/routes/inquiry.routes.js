import express from 'express';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { inquirySchema } from '../utils/validators.js';
import * as inquiryController from '../controllers/inquiry.controller.js';

const router = express.Router();

router.get('/', authenticate, inquiryController.listCreate);
router.post('/', contactLimiter, optionalAuth, validate(inquirySchema), inquiryController.listCreate);
router.get('/:id/', authenticate, admin, inquiryController.detail);
router.patch('/:id/', authenticate, admin, inquiryController.detail);

export default router;
