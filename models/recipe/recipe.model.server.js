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

function updateRecipe(recipeId, newRecipe) {
    return recipeModel.update({
        _id: recipeId
    },{
        $set: {
            name: newRecipe['name'],
            ingredients: newRecipe['ingredients'],
            totalTime: newRecipe['totalTime'],
            numberOfServings: newRecipe['numberOfServings'],
            imageUrl: newRecipe['imageUrl']
        }
    })
}

var api ={
    createRecipe,
    findAllRecipes,
    findRecipeByYummlyId,
    findRecipesBySearchQuery,
    findAllCreatedRecipesForUser,
    findRecipeById,
    deleteRecipe,
    updateRecipe
}

module.exports = api;

