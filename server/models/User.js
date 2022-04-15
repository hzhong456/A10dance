const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', schema);
