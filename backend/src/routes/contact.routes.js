import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { contactSchema } from '../utils/validators.js';
import * as contactController from '../controllers/contact.controller.js';

const router = express.Router();

router.post('/', contactLimiter, validate(contactSchema), contactController.create);
router.get('/all/', authenticate, admin, contactController.adminList);
router.get('/:id/', authenticate, admin, contactController.adminDetail);
router.patch('/:id/', authenticate, admin, contactController.adminDetail);
router.delete('/:id/', authenticate, admin, contactController.adminDetail);

export default router;
