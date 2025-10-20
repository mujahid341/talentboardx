import express from 'express';
import { applyToJob, getMyApplications, getApplicationById } from '../controllers/applicationController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', authenticate, upload.single('resume'), applyToJob);
router.get('/me', authenticate, getMyApplications);
router.get('/:id', authenticate, getApplicationById);

export default router;
