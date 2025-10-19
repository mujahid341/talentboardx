import Job from '../../models/postgres/job.model.js';
import { Op } from 'sequelize';

const pgJobRepo = {
  async createJob(data) {
    return await Job.create(data);
  },

  async getJobById(id) {
    return await Job.findByPk(id);
  },

  async getAllJobs(filters = {}) {
    const where = {};

    if (filters.location) where.location = filters.location;
    if (filters.jobType) where.jobType = filters.jobType;
    if (filters.skills) where.skills = { [Op.overlap]: filters.skills };
    if (filters.search) {
      where.title = { [Op.iLike]: `%${filters.search}%` };
    }

    return await Job.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
  },

  async updateJob(id, updateData) {
    const job = await Job.findByPk(id);
    return await job.update(updateData);
  },

  async deleteJob(id) {
    const job = await Job.findByPk(id);
    return await job.destroy();
  },
};

export default pgJobRepo;
