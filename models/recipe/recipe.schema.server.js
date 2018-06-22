var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
  name: String,
  ingredients: String,
  imageUrl: String,
  totalTime: String,
  numberOfServings: Number,
  yummlyRating: Number,
  yummlyId: String
}, {collection: 'recipe'});

module.exports = recipeSchema;


