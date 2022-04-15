const { UserInputError } = require('apollo-server');
const User = require('./models/user');

const resolvers = {
  Query: {
    allUsers: () => User.find({}).populate('users'),
    getUser: (root, args) => User.findOne({ username: args.username }),
  },
  Mutation: {
    addUser: async (root, args) => {
      let user = await User.findOne({ username: args.username });

      if (!user) {
        try {
          user = new User({ username: args.username, name: args.name, role: 'User' });
          await user.save();
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          });
        }
      } else {
        throw new UserInputError('Username already taken', {
          invalidArgs: args,
        });
      }

      return user;
    },
  },
};

module.exports = resolvers;
