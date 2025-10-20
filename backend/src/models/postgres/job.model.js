// src/models/postgres/job.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';
import User from './user.model.js'; // Make sure this exists and is properly defined

const Job = sequelize.define(
  'Job',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobType: {
      type: DataTypes.ENUM('Full-Time', 'Part-Time', 'Contract'),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Make sure table name is plural or matches User model
        key: 'id',
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  {
    timestamps: true,
    tableName: 'jobs',
  }
);

// If you want Sequelize association (optional but useful)
Job.belongsTo(User, { foreignKey: 'postedBy', as: 'poster' });

export default Job;
