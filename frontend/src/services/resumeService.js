import api from '../utils/api';

export const resumeService = {
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  analyzeResume: async (resumeId, jobId = null) => {
    const response = await api.post('/resume/analyze', { resumeId, jobId });
    return response.data;
  },

  matchResumeWithJob: async (resumeId, jobId) => {
    const response = await api.post('/resume/match', { resumeId, jobId });
    return response.data;
  },

  getResumeAnalysis: async (resumeId) => {
    const response = await api.get(`/resume/${resumeId}/analysis`);
    return response.data;
  },

  downloadReport: async (analysisId) => {
    const response = await api.get(`/resume/report/${analysisId}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
