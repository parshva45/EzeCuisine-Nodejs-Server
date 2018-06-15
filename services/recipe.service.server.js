module.exports = function (app) {
    app.post('/api/recipe', createRecipe)
    app.get('/api/recipe', findAllRecipes)
    app.get('/api/recipe/:yummlyId', findRecipeByYummlyId)

    app.post('/api/recipe/:recipeId/like', likeRecipe)
    app.get('/api/user/likedRecipe',findLikedRecipesForUser)
    app.get('/api/recipe/:recipeId/likedUser',findLikedUsersForRecipe)

    app.post('/api/recipe/:recipeId/rating', rateRecipe)
    app.get('/api/user/ratedRecipe',findRatedRecipesForUser)
    app.get('/api/recipe/:recipeId/ratedUser',findRatedUsersForRecipe)

    var recipeModel = require('../models/recipe/recipe.model.server');
    var likeModel = require('../models/like/like.model.server');
    var ratingModel = require('../models/rating/rating.model.server');

    function createRecipe(req,res) {
        var recipe = req.body
        recipeModel.createRecipe(recipe)
            .then(recipe => res.send(recipe));
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

    function rateRecipe(req,res) {
        var recipeId = req.params['recipeId'];
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var ratingValue = req.body
        var rating ={
            user: userId,
            recipe: recipeId,
            rating: ratingValue['rating']
        }
        ratingModel
            .rateRecipe(rating)
            .then(response => res.json(response));

    }
    
    function findLikedRecipesForUser(req,res) {
        var currentUser = req.session['currentUser'];
        var userId = currentUser._id;
        likeModel
            .findLikedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    function findRatedRecipesForUser(req,res) {
        var currentUser = req.session['currentUser'];
        var userId = currentUser._id;
        ratingModel
            .findRatedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    function findLikedUsersForRecipe(req,res) {
        var recipeId = req.params['recipeId'];
        likeModel
            .findLikedUsersForRecipe(recipeId)
            .then(users => res.json(users));
    }

    function findRatedUsersForRecipe(req,res) {
        var recipeId = req.params['recipeId'];
        ratingModel
            .findRatedUsersForRecipe(recipeId)
            .then(users => res.json(users));
    }

    function findAllRecipes(req,res) {
        recipeModel.findAllRecipes()
            .then(recipes => res.send(recipes));
    }

    function findRecipeByYummlyId(req,res) {
        var yummlyId = req.params['yummlyId'];
        recipeModel.findRecipeByYummlyId(yummlyId)
            .then(recipe => res.send(recipe));
    }
}