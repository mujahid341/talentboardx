// routes/index.js
import express from 'express';
import jobRoutes from './jobRoutes.js';
import authRoutes from './authRoutes.js';
const router = express.Router();

router.use('/jobs', jobRoutes); // Final path: /jobs
router.use('/auth', authRoutes);

export default router;
