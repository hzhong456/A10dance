const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URI, { dialect: 'postgres' });

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL at: ', process.env.POSTGRES_URI);
  } catch (err) {
    console.log('Error connecting to PostgreSQL: ', err);
    return process.exit(1);
  }

  return null;
};

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Models synced to PostgreSQL');
  } catch (err) {
    console.log('Error syncing models to PostgreSQL: ', err);
    return process.exit(1);
  }

  return null;
};

module.exports = { sequelize, connectToDb, syncModels };
