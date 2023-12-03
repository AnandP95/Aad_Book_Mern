const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent,args,context) => {
      
        if (context.user) {
            data = await User.findOne({ _id: context.user._id }).select('-__v -password');
            return data;
          }
          throw new AuthenticationError('please, You need to be logged in here!');
      },
  },


  Mutation: {
    addUser: async (parent,  {username, email, password}) => {
      const user = await User.create({username,email,password});
      const token = signToken(user);
      return {token, user};
    },
    login: async (parent, { email,password }) => {
      const user = await User.findOneAndUpdate(
        { email },
       
      );
      if (!user) {
        throw new AuthenticationError('User doesnt found. Try again');
      }
      const correctPassword = await user.isCorrectPassword(password);
    
      if (!correctPassword) {
        throw new AuthenticationError('Incorrect credentials!');
      }
      const token = signToken(user);
    
      return { token, user };
    },

    saveBook: async (parent, { bookInput } , context ) => {
      console.log(context.user)
        if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id : context.user._id },
          { $push: { savedBooks: bookInput } },
          { new: false }
        );
        return updatedUser;
      }
      throw new AuthenticationError(' for save the book login required!');
    },


    removeBook: async (parent, { bookId } , context ) => {
        if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id : context.user._id },
          { $pull: { savedBooks: {bookId} } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError(' for remove the book login required!');
    },





  }
};

module.exports = resolvers;
