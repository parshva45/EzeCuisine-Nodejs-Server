module.exports = function (app) {

    app.post('/api/recipe/:recipeId/rating', rateRecipe);
    app.get('/api/user/ratedRecipe',findRatedRecipesForCurrentUser);
    app.get('/api/user/:userId/ratedRecipe',findRatedRecipesForUser);
    app.get('/api/recipe/:recipeId/ratedUser',findRatedUsersForRecipe);

    var recipeModel = require('../models/recipe/recipe.model.server');
    var ratingModel = require('../models/rating/rating.model.server');

    function findRatedRecipesForCurrentUser(req,res) {
        var currentUser = req.session['currentUser'];
        var userId = currentUser._id;
        ratingModel
            .findRatedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    function findRatedRecipesForUser(req,res) {
        var userId = req.params['userId'];
        ratingModel
            .findRatedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }



    function findRatedUsersForRecipe(req,res) {
        var recipeId = req.params['recipeId'];
        ratingModel
            .findRatedUsersForRecipe(recipeId)
            .then(users => res.json(users));
    }

    function rateRecipe(req,res) {
        var recipeId = req.params['recipeId'];
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var ratingObject = req.body;
        var rating = {
            user: userId,
            recipe: recipeId,
            rating: ratingObject['rating']
        };
        if (ratingObject['review']){
            rating['review'] =  ratingObject['review'];
        }
        ratingModel
            .rateRecipe(rating)
            .then(response => res.json(response));
    }
}