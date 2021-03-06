module.exports = function (app) {
    app.post('/api/recipe', createRecipe);
    app.get('/api/recipe', findAllRecipes);
    app.get('/api/user/createdRecipe', findAllCreatedRecipesForCurrentUser);
    app.get('/api/user/:userId/createdRecipe', findAllCreatedRecipesForUser);
    app.get('/api/recipe/search/:recipeSearchText', findRecipesBySearchQuery)
    app.get('/api/recipe/yummly/:yummlyId', findRecipeByYummlyId);
    app.get('/api/recipe/:recipeId', findRecipeById);
    app.delete('/api/recipe/:recipeId', deleteRecipe);
    app.put('/api/recipe/:recipeId', updateRecipe);

    var recipeModel = require('../models/recipe/recipe.model.server');
    var likeModel = require('../models/like/like.model.server');
    var ratingModel = require('../models/rating/rating.model.server');

    function createRecipe(req, res) {
        var recipe = req.body;
        recipeModel.createRecipe(recipe)
            .then(recipe => res.send(recipe));
    }

    function deleteRecipe(req, res) {
        var recipeId = req.params['recipeId'];
        likeModel.deleteLikesForRecipe(recipeId)
            .then(() => ratingModel.deleteRatingsForRecipe(recipeId))
            .then(() => recipeModel.deleteRecipe(recipeId))
            .then(response => res.send(response));
    }

    function updateRecipe(req, res) {
        var recipeId = req.params['recipeId'];
        var recipeObject = req.body;
        recipeModel.updateRecipe(recipeId, recipeObject)
            .then(status => res.send(status));
    }

    function findAllRecipes(req, res) {
        recipeModel.findAllRecipes()
            .then(recipes => res.send(recipes));
    }

    function findAllCreatedRecipesForCurrentUser(req, res) {
        var currentUser = req.session['currentUser'];
        var userId = currentUser['_id'];
        recipeModel.findAllCreatedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    function findAllCreatedRecipesForUser(req, res) {
        var userId = req.params['userId'];
        recipeModel.findAllCreatedRecipesForUser(userId)
            .then(recipes => res.json(recipes))
    }

    function findRecipesBySearchQuery(req, res) {
        var recipeSearchText = req.params['recipeSearchText'];
        recipeModel.findRecipesBySearchQuery(recipeSearchText)
            .then(recipes => res.json(recipes));
    }

    function findRecipeByYummlyId(req, res) {
        var yummlyId = req.params['yummlyId'];
        recipeModel.findRecipeByYummlyId(yummlyId)
            .then(recipe => res.send(recipe));
    }

    function findRecipeById(req, res) {
        var recipeId = req.params['recipeId'];
        recipeModel.findRecipeById(recipeId)
            .then(recipe => res.send(recipe));
    }
}