const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
    required: true
  }
});

const User = mongoose.model('login', userSchema);

module.exports = User;
