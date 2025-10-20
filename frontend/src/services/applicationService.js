import api from '../utils/api';

const normalizeApplication = (app) => {
  if (!app) return app;
  const id = app.id ?? app._id;
  
  // Normalize jobId if it's populated (MongoDB populate)
  let normalizedJobId = app.jobId;
  if (app.jobId && typeof app.jobId === 'object') {
    normalizedJobId = {
      ...app.jobId,
      id: app.jobId.id ?? app.jobId._id,
    };
  }
  
  return {
    ...app,
    id,
    jobId: normalizedJobId,
  };
};

export const applicationService = {
  // Apply to a job
  applyToJob: async (jobId, resumeFile) => {
    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('resume', resumeFile);

    const response = await api.post('/applications', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    const data = response.data;
    const appRaw = data?.data ?? data?.application ?? data;
    return { application: normalizeApplication(appRaw) };
  },

  // Get all applications for the current user
  getMyApplications: async () => {
    const response = await api.get('/applications/me');
    const data = response.data;
    const apps = Array.isArray(data?.data)
      ? data.data.map(normalizeApplication)
      : Array.isArray(data?.applications)
        ? data.applications.map(normalizeApplication)
        : Array.isArray(data)
          ? data.map(normalizeApplication)
          : [];
    return { applications: apps };
  },

  // Get a specific application by ID
  getApplicationById: async (id) => {
    const response = await api.get(`/applications/${id}`);
    const data = response.data;
    const appRaw = data?.data ?? data?.application ?? data;
    return { application: normalizeApplication(appRaw) };
  },
};
