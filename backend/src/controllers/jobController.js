import { JobCreateSchema, JobUpdateSchema } from '../dtos/job.dto.js';
import * as jobService from '../services/jobService.js';


export const createJob = async (req, res, next) => {
  try {
    const jobData = JobCreateSchema.parse(req.body); //  Input validation using DTO
    const createdJob = await jobService.createJob(jobData); // Delegating to service
    res.status(201).json({ success: true, data: createdJob });
  } catch (error) {
    next(error); // Pass error to centralized error handler
  }
};


export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getJobs(req.query); // Optional filters from query
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
};


export const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};


export const updateJob = async (req, res, next) => {
  try {
    const updateData = JobUpdateSchema.parse(req.body); // Validate updated fields
    const updatedJob = await jobService.updateJob(req.params.id, updateData);

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: 'Job not found for update' });
    }

    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    next(error);
  }
};


export const deleteJob = async (req, res, next) => {
  try {
    const deleted = await jobService.deleteJob(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Job not found for deletion' });
    }

    res.status(204).send(); //  Success but no content
  } catch (error) {
    next(error);
  }
};
