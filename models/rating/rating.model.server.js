var mongoose = require('mongoose');
var ratingSchema = require('./rating.schema.server');
var ratingModel = mongoose.model('RatingModel', ratingSchema);

function rateRecipe(rating) {
    return ratingModel.create(rating);
}

function findRatedRecipesForUser(userId) {
    return ratingModel
        .find({user: userId})
        .populate('recipe')
        .exec();
}

function findRatedUsersForRecipe(recipeId) {
    return ratingModel
        .find({recipe: recipeId})
        .populate('user')
        .exec();
}

var api ={
    rateRecipe,
    findRatedRecipesForUser,
    findRatedUsersForRecipe
};

module.exports = api;