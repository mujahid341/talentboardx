import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Application = sequelize.define(
  'Application',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resumePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('submitted', 'reviewed', 'shortlisted', 'rejected'),
      defaultValue: 'submitted',
    },
    aiMatchScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    aiFeedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'applications',
    timestamps: true,
  }
);

export default Application;
