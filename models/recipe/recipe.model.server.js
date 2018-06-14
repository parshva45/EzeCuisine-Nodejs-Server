var mongoose = require('mongoose');
var recipeSchema = require('./recipe.schema.server');
var recipeModel = mongoose.model('recipeModel', recipeSchema);

function createRecipe(recipe) {
    return recipeModel.create(recipe);
}

function findAllRecipes() {
    return recipeModel.find();
}

function findRecipeByYummlyId(yummlyId) {
    return recipeModel.findOne({yummlyId: yummlyId});
}

var api ={
    createRecipe,
    findAllRecipes,
    findRecipeByYummlyId
}

module.exports = api;

