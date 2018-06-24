var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeModel'}
}, {collection: 'like'});

module.exports = likeSchema;