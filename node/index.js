const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { connectToDb, syncModels } = require('./util/db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const User = require('./models/user');
require('dotenv').config();

const start = async () => {
  await connectToDb();
  await syncModels();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // eslint-disable-next-line consistent-return
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
        const currentUser = await User.findOne({ where: { id: decodedToken.id } });
        return { currentUser };
      }
    },
  });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

start();
