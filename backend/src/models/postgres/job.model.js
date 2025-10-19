import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Job = sequelize.define(
  'Job',
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    jobType: {
      type: DataTypes.ENUM('Full-Time', 'Part-Time', 'Contract'),
      allowNull: false,
    },
    company: { type: DataTypes.STRING, allowNull: false },
    postedBy: { type: DataTypes.INTEGER, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    skills: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  },
  {
    timestamps: true,
    tableName: 'jobs',
  }
);

export default Job;
