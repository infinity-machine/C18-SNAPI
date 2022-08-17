const { Schema, model } = require('mongoose');

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
    thoughts: [],
    friends: []
  });
  
  const User = model('User', userSchema);

  module.exports = User;