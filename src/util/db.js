import {Sequelize} from "sequelize";

import {checkEnvVariables} from "./checkEnvVaraibles.js";

const getDatabaseURL = () => {
  checkEnvVariables();

  const options = {
    dialect: 'postgres',
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE
  }

  return options;
}

const sequelize = new Sequelize(getDatabaseURL());

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

//module.exports = { sequelize, connectToDb, syncModels };
export { sequelize, connectToDb, syncModels };