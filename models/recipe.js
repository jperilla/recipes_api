const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: String,
  prepTimeInMinutes: Number,
  totalTimeInMinutes: Number,
  numberOfServings: Number,
  calories: Number,
  ingredients: [String],
  instructions: [String],
  photos: [String],
  tags: [String],
  favorite: Boolean
});

module.exports = mongoose.model('recipe', RecipeSchema)
