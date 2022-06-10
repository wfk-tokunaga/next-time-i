const { User, Activity } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('activities')
                .populate('friends');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
        },
        activities: async (parent, {username}) => {
            const params = username ? { username } : {};
            return Activity.find(params).sort({createdAt: -1});
        },
        activity: async(parent, { _id }) => {
            return Activity.findOne({ _id });
        },
        // get all users
        users: async() => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('activities');
        },
        // get a user by username
        user: async(parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('activities');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
          },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            
            const correctPw = await user.isCorrectPassword(password);
            
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            
            const token = signToken(user);
            return { token, user };
        },
        addActivity: async (parent, args, context) => {
            if (context.user) {
              const activity = await Activity.create({ ...args, username: context.user.username });
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { activities: activity._id } },
                { new: true }
              );
          
              return activity;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
        addNote: async(parent, { activityId, noteBody }, context) => {
            if (context.user) {
                const updatedActivity = await Activity.findOneAndUpdate({ _id: activityId }, { $push: { notes: { noteBody, username: context.user.username } } }, { new: true, runValidators: true });

                return updatedActivity;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
                ).populate('friends');
            
                return updatedUser;
            }
            
            throw new AuthenticationError('You need to be logged in!');
        }
          
    }
  };

/**
 * Final resolvers
const resolvers = {
    Query: {
        activities: async(parent, { username }) => {
            const params = username ? { username } : {};
            return Activity.find(params).sort({ createdAt: -1 });
        },
        activity: async(parent, { _id }) => {
            return Activity.findOne({ _id });
        },
        // get all users
        users: async() => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('activities');
        },
        // get a user by username
        user: async(parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('activities');
        },
        me: async(parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('activities')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addActivity: async(parent, args, context) => {
            if (context.user) {
                const activity = await Activity.create({...args, username: context.user.username });

                await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { activities: activity._id } }, { new: true });

                return activity;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addNote: async(parent, { thoughtId, noteBody }, context) => {
            if (context.user) {
                const updatedActivity = await Activity.findOneAndUpdate({ _id: thoughtId }, { $push: { notes: { noteBody, username: context.user.username } } }, { new: true, runValidators: true });

                return updatedActivity;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async(parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { friends: friendId } }, { new: true }).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};
*/

module.exports = resolvers;