const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { Sequelize } = require('sequelize');
const express = require('express');
const http = require('http');
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const sequelize = new Sequelize(process.env.POSTGRES_URI);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connecected to database at ${process.env.POSTGRES_URI}`);
  } catch (err) {
    console.error(`Error connecting to database ${err}`);
  }

  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: '/',
  });

  const PORT = 4000;

  httpServer.listen(PORT, () => console.log(`Server is now running at http://localhost:${PORT}`));
};

start();

module.exports = sequelize;
