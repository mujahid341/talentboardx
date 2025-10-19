import Job from '../../models/mongo/job.model.js';

const mongoJobRepo = {
  async createJob(data) {
    return await Job.create(data);
  },

  async getJobById(id) {
    return await Job.findById(id).populate('postedBy', 'name email');
  },

  async getAllJobs(filters = {}) {
    const query = {};
    if (filters.location) query.location = filters.location;
    if (filters.jobType) query.jobType = filters.jobType;
    if (filters.skills) query.skills = { $in: filters.skills };
    if (filters.search) {
      query.title = { $regex: filters.search, $options: 'i' };
    }

    return await Job.find(query).sort({ createdAt: -1 });
  },

  async updateJob(id, updateData) {
    return await Job.findByIdAndUpdate(id, updateData, { new: true });
  },

  async deleteJob(id) {
    return await Job.findByIdAndDelete(id);
  },
};

export default mongoJobRepo;
