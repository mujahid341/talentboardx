import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

const router = express.Router();

router.post('/', createJob);         // POST /jobs
router.get('/', getAllJobs);         // GET /jobs
router.get('/:id', getJobById);      // GET /jobs/:id
router.put('/:id', updateJob);       // PUT /jobs/:id
router.delete('/:id', deleteJob);    // DELETE /jobs/:id

export default router;
