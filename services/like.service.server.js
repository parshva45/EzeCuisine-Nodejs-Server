module.exports = function (app) {

    var recipeModel = require('../models/recipe/recipe.model.server');
    var likeModel = require('../models/like/like.model.server');

    app.post('/api/recipe/:recipeId/like', likeRecipe);
    app.get('/api/user/likedRecipe',findLikedRecipesForCurrentUser);
    app.get('/api/user/:userId/likedRecipe',findLikedRecipesForUser);
    app.get('/api/recipe/:recipeId/likedUser',findLikedUsersForRecipe);

    function findLikedUsersForRecipe(req,res) {
        var recipeId = req.params['recipeId'];
        likeModel
            .findLikedUsersForRecipe(recipeId)
            .then(users => res.json(users));
    }

    function findLikedRecipesForCurrentUser(req,res) {
        var currentUser = req.session['currentUser'];
        var userId = currentUser._id;
        likeModel
            .findLikedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    function findLikedRecipesForUser(req,res) {
        var userId = req.params['userId'];
        likeModel
            .findLikedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    function likeRecipe(req,res) {
        var recipeId = req.params['recipeId'];
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var like ={
            user: userId,
            recipe: recipeId
        }
        likeModel
            .likeRecipe(like)
            .then(response => res.json(response));

    }
}