var mongoose = require('mongoose');

var ratingSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
    recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeModel'},
    rating: Number
}, {collection: 'rating'});

module.exports = ratingSchema;