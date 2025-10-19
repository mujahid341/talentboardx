import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.PG_DB_NAME,
  process.env.PG_DB_USER,
  process.env.PG_DB_PASSWORD,
  {
    host: process.env.PG_DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
