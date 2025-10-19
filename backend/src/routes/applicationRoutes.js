import express from 'express';
import { applyToJob, getMyApplications, getApplicationById } from '../controllers/applicationController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Apply to job with resume upload
router.post('/', authenticate, upload.single('resume'), applyToJob);

// My applications
router.get('/me', authenticate, getMyApplications);

// Specific application
router.get('/:id', authenticate, getApplicationById);

export default router;
