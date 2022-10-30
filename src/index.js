import dotenv from 'dotenv';
dotenv.config();
import {checkEnvVariables} from "./util/checkEnvVaraibles.js";
checkEnvVariables();

import {ApolloServer} from "apollo-server";
import jwt from "jsonwebtoken";

import { connectToDb, syncModels } from './util/db.js';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import User from './models/user.js';

const start = async () => {
  await connectToDb();
  await syncModels();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
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

export {checkEnvVariables};