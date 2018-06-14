var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);

function createUser(user) {
  return userModel.create(user);
}

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {username: 1});
}

var api ={
  createUser,
  findUserByCredentials
};

module.exports = api;

