// src/repositories/postgres/applicationRepository.pg.js
import Application from '../../models/postgres/application.model.js';

const pgApplicationRepo = {
  
  async createApplication(data) {
    // data should match your Sequelize model fields
    const created = await Application.create(data);
    return created;
  },

  async findByUser(userId) {
    // If userId is string and your DB uses integers, Sequelize will coerce; convert if necessary:
    // const uid = Number(userId);
    const apps = await Application.findAll({
      where: { userId },
      // include associated models if defined (Job, User etc.)
      include: [{ all: true, nested: true }],
      order: [['createdAt', 'DESC']],
    });
    return apps;
  },

  
  async findById(id) {
    const app = await Application.findByPk(id, {
      include: [{ all: true, nested: true }],
    });
    return app;
  },
};

export default pgApplicationRepo;
