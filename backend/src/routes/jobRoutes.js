import express from 'express';
import * as jobService from '../services/jobService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const job = await jobService.createJob(req.body);
  res.status(201).json(job);
});

router.get('/', async (req, res) => {
  const jobs = await jobService.getJobs(req.query);
  res.status(200).json(jobs);
});

export default router;
