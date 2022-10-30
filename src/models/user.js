import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../util/db.js';

class User extends Model {}

User.init({
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attendanceCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'User',
});

export default User;
