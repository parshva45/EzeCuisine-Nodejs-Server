var mongoose = require('mongoose');
var recipeSchema = require('./recipe.schema.server');
var recipeModel = mongoose.model('RecipeModel', recipeSchema);

function createRecipe(recipe) {
    return recipeModel.create(recipe);
}

function findAllRecipes() {
    return recipeModel.find();
}

function findAllCreatedRecipesForUser(userId) {
    return recipeModel.find({
        chef: userId
    });
}

function findRecipeByYummlyId(yummlyId) {
    return recipeModel.findOne({yummlyId: yummlyId});
}

function findRecipesBySearchQuery(recipeSearchText) {
    return recipeModel.find({
        $text: {$search: recipeSearchText},
        createdBy: 'Chef'
    })
}

var api ={
    createRecipe,
    findAllRecipes,
    findRecipeByYummlyId,
    findRecipesBySearchQuery,
    findAllCreatedRecipesForUser
}

module.exports = api;

