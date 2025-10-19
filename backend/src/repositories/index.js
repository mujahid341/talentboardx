import mongoJobRepo from './mongo/jobRepository.mongo.js';
import pgJobRepo from './postgres/jobRepository.pg.js';
import mongoUserRepo from './mongo/userRepository.mongo.js';
import pgUserRepo from './postgres/userRepository.pg.js';

const DB_TYPE = process.env.DB_TYPE || 'mongo';

export const jobRepository = DB_TYPE === 'postgres' ? pgJobRepo : mongoJobRepo;
export const userRepository = DB_TYPE === 'postgres' ? pgUserRepo : mongoUserRepo;
