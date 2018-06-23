module.exports = function (app) {
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);
  app.get('/api/user', findAllUsers);
  app.get('/api/profile/:username',getProfileOfUser)
  app.post('/api/logout', logout);
  app.post('/api/login', login);
  app.put('/api/profile', updateProfile);

  var userModel = require('../models/user/user.model.server');

  function profile(req, res) {
      res.send(req.session['currentUser']);
  }

  function login(req, res) {
      var credentials = req.body;
      userModel
          .findUserByCredentials(credentials)
          .then(function(user) {
              if (user !== null){
                  req.session['currentUser'] = user;
                  res.json(user);
              }else{
                  res.json({});
              }
          })
  }

  function getProfileOfUser(req,res) {
      var username = req.params['username'];
      userModel
          .findUserByUsername(username)
          .then(users => res.json(users[0]));
  }

  function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }

  function updateProfile(req,res) {
      var currentUser = req.session['currentUser'];
      var userId = currentUser['_id'];
      var newUser = req.body;

      userModel
          .updateUser(userId,newUser)
          .then(status => {
              req.session['currentUser'] = newUser;
              res.send(status)
          });
  }

  function findAllUsers(req,res) {
    userModel.findAllUsers()
        .then(users => res.json(users));
  }

  function createUser(req,res) {
      var user = req.body;
      userModel.findUserByUsername(user.username)
          .then((users) => {
              if(users.length === 0) {
                  userModel.createUser(user)
                      .then(user => {
                          req.session['currentUser'] = user;
                          res.send(user)
                      });
              }else res.send({})
          });
  }
}