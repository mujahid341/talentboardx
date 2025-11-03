import axios from 'axios';
import { AI_API_URL } from '../config/api.config.js';

const AI_BASE_URL = import.meta.env.VITE_AI_API_URL || AI_API_URL;

export const aiService = {
  /**
   * Analyze resume against job description using AI
   * @param {File} resumeFile - PDF resume file
   * @param {Object} job - Job object containing title, description, skills
   * @returns {Promise<Object>} AI analysis result with aiMatchScore and aiFeedback
   */
  analyzeResume: async (resumeFile, job) => {
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      
      // Prepare job data as JSON string
      const jobData = {
        title: job.title || '',
        description: job.description || '',
        skills: job.skills || [],
        requirements: job.requirements || [],
        responsibilities: job.responsibilities || [],
      };
      
      formData.append('job', JSON.stringify(jobData));

      const response = await axios.post(`${AI_BASE_URL}/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds timeout for AI processing
      });

      return response.data;
    } catch (error) {
      console.error('AI Analysis Error:', error);
      
      // Provide user-friendly error messages
      if (error.code === 'ECONNABORTED') {
        throw new Error('AI analysis timed out. Please try again.');
      }
      
      if (error.response) {
        throw new Error(error.response.data?.error || 'AI analysis failed. Please try again.');
      }
      
      if (error.request) {
        throw new Error('Unable to connect to AI service. Please ensure the AI service is running.');
      }
      
      throw new Error('An unexpected error occurred during AI analysis.');
    }
  },
};

export default aiService;
