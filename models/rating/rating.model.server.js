var mongoose = require('mongoose');
var ratingSchema = require('./rating.schema.server');
var ratingModel = mongoose.model('RatingModel', ratingSchema);

function rateRecipe(rating) {
    return ratingModel.create(rating);
}

function updateRating(ratingId, ratingObject) {
    if (ratingObject['review']) {
        return ratingModel.update(
            {_id: ratingId},{
            $set: {
                rating: ratingObject['rating'],
                review: ratingObject['review']
            }
        })
    } else {
        return ratingModel.update(
            {_id: ratingId},{
            $set: {
                rating: ratingObject['rating'],
            }
        })
    }
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
    findRatedUsersForRecipe,
    updateRating
};

module.exports = api;