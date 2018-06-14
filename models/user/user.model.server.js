var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);

function createUser(user) {
  return userModel.create(user);
}

var api ={
  createUser
};

module.exports = api;

