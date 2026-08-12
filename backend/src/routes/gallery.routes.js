import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { uploadGallery } from '../middleware/upload.js';
import * as galleryController from '../controllers/gallery.controller.js';

const router = express.Router();

router.get('/', galleryController.publicList);
router.post('/upload/', authenticate, admin, uploadGallery.single('image'), galleryController.create);
router.get('/admin/', authenticate, admin, galleryController.adminList);
router.get('/settings/', authenticate, admin, galleryController.settings);
router.patch('/settings/', authenticate, admin, galleryController.settings);
router.get('/:id/', authenticate, admin, galleryController.detail);
router.patch('/:id/', authenticate, admin, uploadGallery.single('image'), galleryController.detail);
router.delete('/:id/', authenticate, admin, galleryController.detail);

export default router;
