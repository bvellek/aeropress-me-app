const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    default: //author's # recipe
  }
  author: {
    type: String,
    default: //creator name using creator ID to get creator name
  },
  orientation: String,
  massWater: Number,
  massCoffee: Number,
  waterTemp: Number,
  grind: String,
  instructions: String,
  votes: //data from votes collection
  owner: {
    userID: , //creator userID or username?
  },
  created: {
    type: Date,
    default: Date.now
  }
});


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
