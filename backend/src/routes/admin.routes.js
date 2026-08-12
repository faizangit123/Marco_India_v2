import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import * as adminController from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/stats/', authenticate, admin, adminController.getStats);
router.get('/users/', authenticate, admin, adminController.listUsers);
router.get('/users/:id/', authenticate, admin, adminController.userDetail);
router.patch('/users/:id/', authenticate, admin, adminController.userDetail);
router.delete('/users/:id/', authenticate, admin, adminController.userDetail);

export default router;
