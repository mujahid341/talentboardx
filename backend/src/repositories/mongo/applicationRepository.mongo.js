import Application from '../../models/mongo/application.model.js'; // or Postgres model

const mongoApplicationRepo = {
  async createApplication(data) {
    return await Application.create(data);
  },

  async findByUser(userId) {
    return await Application.find({ userId }).populate('jobId');
  },

  async findById(id) {
    return await Application.findById(id).populate('jobId');
  },
};

export default mongoApplicationRepo;
