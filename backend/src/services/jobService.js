import { jobRepository } from '../repositories/index.js';

export const createJob = async (data) => {
  return await jobRepository.createJob(data);
};

export const getJobs = async (filters) => {
  return await jobRepository.getAllJobs(filters);
};
