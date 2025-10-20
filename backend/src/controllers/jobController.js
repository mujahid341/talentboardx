// import { JobCreateSchema, JobUpdateSchema } from '../dtos/job.dto.js';
// import * as jobService from '../services/jobService.js';

// // POST /jobs
// export const createJob = async (req, res, next) => {
//   try {
//     const jobData = JobCreateSchema.parse(req.body);
//     const createdJob = await jobService.createJob(jobData);
//     res.status(201).json({ success: true, data: createdJob });
//   } catch (error) {
//     next(error);
//   }
// };

// // GET /jobs
// export const getAllJobs = async (req, res, next) => {
//   try {
//     const jobs = await jobService.getJobs(req.query);
//     res.status(200).json({ success: true, data: jobs });
//   } catch (error) {
//     next(error);
//   }
// };

// // GET /jobs/:id
// export const getJobById = async (req, res, next) => {
//   try {
//     const job = await jobService.getJobById(req.params.id);
//     res.status(200).json({ success: true, data: job });
//   } catch (error) {
//     next(error);
//   }
// };

// // PUT /jobs/:id
// export const updateJob = async (req, res, next) => {
//   try {
//     const updateData = JobUpdateSchema.parse(req.body);
//     const updatedJob = await jobService.updateJob(req.params.id, updateData);
//     res.status(200).json({ success: true, data: updatedJob });
//   } catch (error) {
//     next(error);
//   }
// };

// // DELETE /jobs/:id
// export const deleteJob = async (req, res, next) => {
//   try {
//     await jobService.deleteJob(req.params.id);
//     res.status(204).send(); // Success, no content
//   } catch (error) {
//     next(error);
//   }
// };



import { JobCreateSchema, JobUpdateSchema } from '../dtos/job.dto.js';
import * as jobService from '../services/jobService.js';

// POST /jobs
export const createJob = async (req, res, next) => {
  try {
    // Validate body using DTO
    const jobData = JobCreateSchema.parse(req.body);

    // Automatically set the logged-in user's ID as postedBy
    const finalJobData = {
      ...jobData,
      postedBy: req.user.id, // comes from JWT payload set by authenticate middleware
    };

    const createdJob = await jobService.createJob(finalJobData);
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: createdJob,
    });
  } catch (error) {
    next(error);
  }
};

// GET /jobs
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getJobs(req.query);
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// GET /jobs/:id
export const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /jobs/:id
export const updateJob = async (req, res, next) => {
  try {
    const updateData = JobUpdateSchema.parse(req.body);
    const updatedJob = await jobService.updateJob(req.params.id, updateData);
    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /jobs/:id
export const deleteJob = async (req, res, next) => {
  try {
    await jobService.deleteJob(req.params.id);
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};
