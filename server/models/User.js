const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../index');

class User extends Model {}
User.init({
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
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
  modelName: 'user',
});

module.exports = User;
