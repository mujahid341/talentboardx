import { applicationRepository, jobRepository } from '../repositories/index.js';
import { createError } from '../utils/customError.js';

export const applyToJob = async ({ userId, jobId, resumePath }) => {
  const job = await jobRepository.getJobById(jobId);
  if (!job) throw createError('Job not found', 404);
  if (!job.isActive) throw createError('Job is closed', 400);

  return await applicationRepository.createApplication({
    userId,
    jobId,
    resumePath,
    status: 'submitted',
    aiMatchScore: null,
    aiFeedback: null,
  });
};

export const getApplicationsByUser = async (userId) => {
  return await applicationRepository.findByUser(userId);
};

export const getApplicationById = async (id) => {
  return await applicationRepository.findById(id);
};
