const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  recipeID: {
    type: String,
    required: true
  },
  voterID: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});


const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
