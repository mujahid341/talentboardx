import { User } from '../../models/postgres';

const pgUserRepo = {
  async createUser(data) {
    return await User.create(data);
  },
  async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  },
  async findUserById(id) {
    return await User.findByPk(id);
  },
  async updateUser(id, data) {
    const user = await User.findByPk(id);
    return await user.update(data);
  },
};

export default pgUserRepo;
