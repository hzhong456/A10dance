const { UserInputError } = require('apollo-server');
const User = require('./models/user');

const resolvers = {
  Query: {
    allUsers: () => User.findAll(),
    getUser: (root, args) => User.findOne({ where: { username: args.username } }),
  },
  Mutation: {
    addUser: async (root, args) => {
      let user = await User.findOne({ where: { username: args.username } });

      if (!user) {
        try {
          user = new User({ username: args.username, name: args.name, role: 'User' });
          await user.save();
        } catch (err) {
          throw new UserInputError(err.errors[0].message);
        }
      } else {
        throw new UserInputError('There is an existing account with the username');
      }

      return user;
    },
  },
};

module.exports = resolvers;
