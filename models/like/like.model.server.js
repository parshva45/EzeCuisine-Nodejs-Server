var mongoose = require('mongoose');
var likeSchema = require('./like.schema.server');
var likeModel = mongoose.model('LikeModel', likeSchema);

function likeRecipe(like) {
    return likeModel.create(like);
}

function findLikedRecipesForUser(userId) {
    return likeModel
        .find({user: userId})
        .populate('recipe')
        .exec();
}

function findLikedUsersForRecipe(recipeId) {
    return likeModel
        .find({recipe: recipeId})
        .populate('user')
        .exec();
}

var api ={
    likeRecipe,
    findLikedRecipesForUser,
    findLikedUsersForRecipe
};

module.exports = api;