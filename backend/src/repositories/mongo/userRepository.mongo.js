import User from '../../models/mongo/user.model.js';

const mongoUserRepo = {
  async createUser(data) {
    return await User.create(data);
  },
  async findUserByEmail(email) {
    return await User.findOne({ email });
  },
  async findUserById(id) {
    return await User.findById(id);
  },
  async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  },
};

export default mongoUserRepo;
