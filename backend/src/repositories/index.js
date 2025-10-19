import mongoUserRepo from './mongo/userRepository.mongo.js';
import pgUserRepo from './postgres/userRepository.pg.js';

const DB_TYPE = process.env.DB_TYPE || 'mongo';

export const userRepository =
  DB_TYPE === 'postgres' ? pgUserRepo : mongoUserRepo;
