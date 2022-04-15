const { ApolloServer } = require('apollo-server');
const { connectToDb, syncModels } = require('./util/db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require('dotenv').config();

const start = async () => {
  await connectToDb();
  await syncModels();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

start();
