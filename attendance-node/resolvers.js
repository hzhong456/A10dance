const { UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
require('dotenv').config();

const resolvers = {
  Query: {
    allUsers: () => User.findAll(),
    getUser: (root, args) => User.findOne({ where: { username: args.username.toLowerCase() } }),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addUser: async (root, args) => {
      if (!args.username || !args.name || !args.password) {
        throw new UserInputError('Some fields are blank');
      }

      let user = await User.findOne({ where: { username: args.username.toLowerCase() } });

      if (!user) {
        const hashedPassword = await bcrypt.hash(args.password, 10);

        try {
          user = new User(
            {
              username: args.username.toLowerCase(),
              password: hashedPassword,
              name: args.name,
              role: args.role,
              attendanceCount: 0,
            },
          );
          await user.save();

          return {
            value: jwt.sign({
              username: user.username,
              id: user.id,
            }, process.env.SECRET),
          };
        } catch (err) {
          throw new UserInputError(err.errors[0].message);
        }
      } else {
        throw new UserInputError('There is an existing account with the username');
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ where: { username: args.username.toLowerCase() } });

      if (user) {
        const passwordCorrect = await bcrypt.compare(args.password, user.password);

        if (!passwordCorrect) {
          throw new UserInputError('Invalid password');
        }

        try {
          return {
            value: jwt.sign({
              username: user.username,
              id: user.id,
            }, process.env.SECRET),
            user,
          };
        } catch (err) {
          throw new UserInputError(err.errors[0].message);
        }
      } else {
        throw new UserInputError('No account with username found');
      }
    },
    attended: async (root, args) => {
      const user = await User.findOne({ where: { username: args.username.toLowerCase() } });

      if (user) {
        try {
          // eslint-disable-next-line no-multi-assign
          user.attendanceCount = user.attendanceCount += 1;
          await user.save();
        } catch (err) {
          throw new UserInputError(err.errors[0].message);
        }
      } else {
        throw new UserInputError('User not found');
      }

      return user;
    },
  },
};

module.exports = resolvers;
