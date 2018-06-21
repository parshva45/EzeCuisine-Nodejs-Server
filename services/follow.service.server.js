module.exports = function (app) {

    var followModel = require('../models/follow/follow.model.server');

    app.post('/api/user/:userId/follow', followUser);
    app.get('/api/user/:userId/following', getFollowing);
    app.get('/api/user/:userId/followers', getFollowers);
    app.get('/api/user/following', getFollowingForCurrentUser);
    app.get('/api/user/followers', getFollowersForCurrentUser);

    function followUser(req,res){
        var toUserId = req.params['userId'];
        var currentUser = req.session.currentUser;
        var fromUserId = currentUser._id;
        var follow ={
            from: fromUserId,
            to: toUserId
        }
        followModel
            .followUser(follow)
            .then(response => res.json(response));
    }

    function getFollowing(req,res) {
        var userId = req.params['userId'];
        followModel
            .getFollowing(userId)
            .then(following => res.json(following));
    }

    function getFollowingForCurrentUser(req,res) {
        var currentUser = req.session['currentUser'];
        var userId = currentUser._id;
        followModel
            .getFollowing(userId)
            .then(following => res.json(following));
    }

    function getFollowers(req,res) {
        var userId = req.params['userId'];
        followModel
            .getFollowers(userId)
            .then(followers=> res.json(followers));
    }

    function getFollowersForCurrentUser(req,res) {
        var currentUser = req.session['currentUser'];
        var userId = currentUser._id;
        followModel
            .getFollowers(userId)
            .then(followers=> res.json(followers));
    }
}