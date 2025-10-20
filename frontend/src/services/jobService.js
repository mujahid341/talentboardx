import api from '../utils/api';

const normalizeJob = (job) => {
  if (!job) return job;
  const id = job.id ?? job._id;
  return {
    ...job,
    id,
    skills: Array.isArray(job.skills) ? job.skills : [],
  };
};

export const jobService = {
  getAllJobs: async (params = {}) => {
    const response = await api.get('/jobs', { params });
    const data = response.data;
    const jobs = Array.isArray(data?.data)
      ? data.data.map(normalizeJob)
      : Array.isArray(data?.jobs)
        ? data.jobs.map(normalizeJob)
        : Array.isArray(data)
          ? data.map(normalizeJob)
          : [];
    return { jobs };
  },

  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    const data = response.data;
    const jobRaw = data?.data ?? data?.job ?? data;
    return { job: normalizeJob(jobRaw) };
  },

  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    const data = response.data;
    const jobRaw = data?.data ?? data?.job ?? data;
    return { job: normalizeJob(jobRaw) };
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    const data = response.data;
    const jobRaw = data?.data ?? data?.job ?? data;
    return { job: normalizeJob(jobRaw) };
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return { success: response.status === 200 || response.status === 204 };
  },

  applyToJob: async (jobId, applicationData) => {
    const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
    return response.data;
  },

  getMyApplications: async () => {
    const response = await api.get('/applications/my');
    return response.data;
  },

  getJobApplications: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}/applications`);
    return response.data;
  },

  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.patch(`/applications/${applicationId}/status`, { status });
    return response.data;
  },
};
