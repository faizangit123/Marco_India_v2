import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { uploadTestimonial } from '../middleware/upload.js';
import * as testimonialController from '../controllers/testimonial.controller.js';

const router = express.Router();

router.get('/', testimonialController.publicList);
router.post('/create/', authenticate, admin, uploadTestimonial.single('avatar'), testimonialController.create);
router.get('/all/', authenticate, admin, testimonialController.listAll);
router.get('/settings/', authenticate, admin, testimonialController.settings);
router.patch('/settings/', authenticate, admin, testimonialController.settings);
router.get('/:id/', authenticate, admin, testimonialController.detail);
router.patch('/:id/', authenticate, admin, uploadTestimonial.single('avatar'), testimonialController.detail);
router.delete('/:id/', authenticate, admin, testimonialController.detail);

export default router;
