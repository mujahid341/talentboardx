import { ApplicationCreateSchema } from '../dtos/application.dto.js';
import * as applicationService from '../services/applicationService.js';

export const applyToJob = async (req, res, next) => {
  try {
    const validated = ApplicationCreateSchema.parse(req.body);
    const resume = req.file;
    if (!resume) throw new Error('Resume file is required');

    const app = await applicationService.applyToJob({
      userId: req.user.id,
      jobId: validated.jobId,
      resumePath: resume.path,
    });

    res.status(201).json({ success: true, data: app });
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const apps = await applicationService.getApplicationsByUser(req.user.id);
    res.status(200).json({ success: true, data: apps });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const app = await applicationService.getApplicationById(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
    res.status(200).json({ success: true, data: app });
  } catch (error) {
    next(error);
  }
};
