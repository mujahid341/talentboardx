// src/models/postgres/user.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('employer', 'jobseeker', 'admin'),
      defaultValue: 'jobseeker',
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
