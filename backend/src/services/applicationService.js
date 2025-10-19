import { applicationRepository } from '../repositories/index.js';

// Create new application
export const applyToJob = async ({ userId, jobId, resumePath }) => {
  return await applicationRepository.createApplication({
    jobId,
    userId,
    resumePath,
    status: 'submitted',
    aiMatchScore: null, // Will be updated by AI later
    aiFeedback: null,
  });
};

// Get all applications by user
export const getApplicationsByUser = async (userId) => {
  return await applicationRepository.findByUser(userId);
};

// Get application by ID
export const getApplicationById = async (id) => {
  return await applicationRepository.findById(id);
};
