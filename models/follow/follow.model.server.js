var mongoose = require('mongoose');
var followSchema = require('./follow.schema.server');
var followModel = mongoose.model('FollowModel', followSchema);


function followUser(follow) {
    return followModel.create(follow);
}

function unfollowUser(unfollow) {
    return followModel.remove(unfollow);
}

function getFollowing(userId) {
    return followModel
        .find({from: userId})
        .populate('to')
        .exec();
}

function getFollowers(userId) {
    return followModel
        .find({to: userId})
        .populate('from')
        .exec();
}

var api ={
    followUser,
    getFollowing,
    getFollowers,
    unfollowUser
};

module.exports = api;