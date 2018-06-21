var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
  name: String,
  ingredients: String,
  imageUrl: String,
  yield: String,
  totalTime: String,
  numberOfServings: Number,
  course: String,
  yummlyRating: Number,
  yummlyId: String
}, {collection: 'recipe'});

module.exports = recipeSchema;


