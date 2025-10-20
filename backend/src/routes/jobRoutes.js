
import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Only employer or admin can create a job
router.post('/', authenticate, authorize('employer', 'admin'), createJob);

// Public: anyone can view all jobs
router.get('/', getAllJobs);

// Public: anyone can view a single job by ID
router.get('/:id', getJobById);

// Only employer or admin can update a job
router.put('/:id', authenticate, authorize('employer', 'admin'), updateJob);

// Only employer or admin can delete a job
router.delete('/:id', authenticate, authorize('employer', 'admin'), deleteJob);

export default router;
