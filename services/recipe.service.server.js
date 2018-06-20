module.exports = function (app) {
    app.post('/api/recipe', createRecipe);
    app.get('/api/recipe', findAllRecipes);
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

    function findRecipeByYummlyId(req,res) {
        var yummlyId = req.params['yummlyId'];
        recipeModel.findRecipeByYummlyId(yummlyId)
            .then(recipe => res.send(recipe));
    }
}