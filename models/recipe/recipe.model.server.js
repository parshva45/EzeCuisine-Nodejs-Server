var mongoose = require('mongoose');
var recipeSchema = require('./recipe.schema.server');
var recipeModel = mongoose.model('RecipeModel', recipeSchema);

function createRecipe(recipe) {
    return recipeModel.create(recipe);
}

function findAllRecipes() {
    return recipeModel.find();
}

function findRecipeByYummlyId(yummlyId) {
    return recipeModel.findOne({yummlyId: yummlyId});
}

function findRecipesBySearchQuery(recipeSearchText) {
    return recipeModel.find({$text: {$search: recipeSearchText}})
}

var api ={
    createRecipe,
    findAllRecipes,
    findRecipeByYummlyId,
    findRecipesBySearchQuery
}

module.exports = api;

