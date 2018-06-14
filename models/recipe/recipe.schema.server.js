var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    name: String,
    ingredients: String,
    imageUrl: String,
    yummlyId: String
}, {collection: 'recipe'});

module.exports = recipeSchema;


