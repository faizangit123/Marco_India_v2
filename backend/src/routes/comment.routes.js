import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';
import { commentSchema } from '../utils/validators.js';
import * as commentController from '../controllers/comment.controller.js';

const router = express.Router();

router.get('/', commentController.listCreate);
router.post('/', authenticate, validate(commentSchema), commentController.listCreate);
router.get('/all/', authenticate, admin, commentController.listAll);
router.patch('/:id/', authenticate, admin, commentController.detail);
router.delete('/:id/', authenticate, admin, commentController.detail);

export default router;
