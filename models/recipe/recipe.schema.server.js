var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
  name: String,
  ingredients: String,
  imageUrl: String,
  totalTime: String,
  numberOfServings: Number,
  yummlyRating: Number,
  yummlyId: String,
  createdBy: String
}, {collection: 'recipe'});

recipeSchema.index({'name':'text', 'ingredients': 'text'});

module.exports = recipeSchema;


