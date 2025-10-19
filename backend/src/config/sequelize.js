import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.PG_DB_NAME,
  process.env.PG_DB_USER,
  process.env.PG_DB_PASSWORD,
  {
    host: process.env.PG_DB_HOST,
    port: process.env.PG_DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
