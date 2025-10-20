// routes/index.js
import express from 'express';
import jobRoutes from './jobRoutes.js';
import authRoutes from './authRoutes.js';
import applicationRoutes from './applicationRoutes.js';

const router = express.Router();

router.use('/jobs', jobRoutes); // Final path: /jobs
router.use('/auth', authRoutes);
router.use('/applications', applicationRoutes);

export default router;
