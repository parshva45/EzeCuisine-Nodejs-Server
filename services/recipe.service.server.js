module.exports = function (app) {
    app.post('/api/recipe', createRecipe);
    app.get('/api/recipe', findAllRecipes);
    app.get('/api/user/createdRecipe', findAllCreatedRecipesForCurrentUser);
    app.get('/api/user/:userId/createdRecipe', findAllCreatedRecipesForUser);
    app.get('/api/recipe/search/:recipeSearchText', findRecipesBySearchQuery)
    app.get('/api/recipe/:yummlyId', findRecipeByYummlyId);

    var recipeModel = require('../models/recipe/recipe.model.server');

    function createRecipe(req,res) {
        var recipe = req.body;
        recipeModel.createRecipe(recipe)
            .then(recipe => res.send(recipe));
    }

    function findAllRecipes(req,res) {
        recipeModel.findAllRecipes()
            .then(recipes => res.send(recipes));
    }

    function findAllCreatedRecipesForCurrentUser(req,res) {
        var currentUser = req.session['currentUser'];
        var userId = currentUser['_id'];
        recipeModel.findAllCreatedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    function findAllCreatedRecipesForUser(req,res) {
        var userId = req.params['userId'];
        recipeModel.findAllCreatedRecipesForUser(userId)
            .then(recipes => res.json(recipes))
    }

    function findRecipesBySearchQuery(req,res) {
        var recipeSearchText = req.params['recipeSearchText'];
        recipeModel.findRecipesBySearchQuery(recipeSearchText)
            .then(recipes => res.json(recipes));
    }

    function findRecipeByYummlyId(req,res) {
        var yummlyId = req.params['yummlyId'];
        recipeModel.findRecipeByYummlyId(yummlyId)
            .then(recipe => res.send(recipe));
    }
}