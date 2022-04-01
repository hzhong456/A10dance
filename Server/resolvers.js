const { UserInputError } = require('apollo-server');

let users = [
  {
    username: 'testusername-1',
    name: 'Test 1',
    id: 12345,
  },
  {
    username: 'testusername-2',
    name: 'Test 2',
    id: 12345,
  },
];

const resolvers = {
  Query: {
    allUsers: () => users,
    getUser: (root, args) => users.find((u) => u.username === args.username),
  },
  Mutation: {
    addUser: (root, args) => {
      if (users.find((u) => u.username === args.username)) {
        throw new UserInputError('Username currently in use', {
          invalidArgs: args.username,
        });
      }

      const user = { ...args, id: Math.floor(Math.random() * 1000000) };
      users = users.concat(user);
      return user;
    },
  },
};

module.exports = resolvers;
