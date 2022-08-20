const { Schema, model } = require('mongoose');
// const  { Thought } = require('../models');


const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  });

  userSchema.virtual('friend_count').get(function() {
    return this.friends.length
  })
  
  const User = model('User', userSchema);

  module.exports = User;