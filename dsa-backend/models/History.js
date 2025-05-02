const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  output: [String],
  errors: [String],
  language: {
    type: String,
    required: true,
    enum: ['python', 'cpp', 'java', 'javascript']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('History', historySchema);