var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {password: 0});
}

function findUserById(userId) {
    return userModel.findOne({_id: userId});
}

function findUserByUsername(username) {
    return userModel.find({username: username});
}

function updateUser(userId,newUser) {
    return userModel.update({
        _id:userId
    },{
        $set: {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

var api ={
  createUser,
  findUserByCredentials,
  updateUser,
  findUserByUsername,
  deleteUser,
  findUserById
};

module.exports = api;

