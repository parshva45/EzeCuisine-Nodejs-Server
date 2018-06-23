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

function findRecipeById(recipeId) {
    return recipeModel.findOne({_id: recipeId});
}

function findRecipesBySearchQuery(recipeSearchText) {
    return recipeModel.find({
        $text: {$search: recipeSearchText},
        createdBy: 'Chef'
    })
}

function deleteRecipe(recipeId) {
    return recipeModel.remove({_id: recipeId});
}

var api ={
    createRecipe,
    findAllRecipes,
    findRecipeByYummlyId,
    findRecipesBySearchQuery,
    findAllCreatedRecipesForUser,
    findRecipeById,
    deleteRecipe
}

module.exports = api;

