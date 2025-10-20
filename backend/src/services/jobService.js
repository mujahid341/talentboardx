
  import { jobRepository } from '../repositories/index.js';
  import { createError } from '../utils/customError.js';

  // Create new job
  export const createJob = async (jobData) => {
    return await jobRepository.createJob(jobData);
  };

  // Search and filter jobs
  export const getJobs = async (filters) => {
    return await jobRepository.getAllJobs(filters);
  };

  // Fetch single job with error handling
  export const getJobById = async (id) => {
    const job = await jobRepository.getJobById(id);
    if (!job) throw createError('Job not found', 404);
    return job;
  };

  // Update job
  export const updateJob = async (id, updateData) => {
    const job = await jobRepository.getJobById(id);
    if (!job) throw createError('Job not found', 404);

    return await jobRepository.updateJob(id, updateData);
  };

  // Delete job
  export const deleteJob = async (id) => {
    const job = await jobRepository.getJobById(id);
    if (!job) throw createError('Job not found', 404);

    return await jobRepository.deleteJob(id);
  };
