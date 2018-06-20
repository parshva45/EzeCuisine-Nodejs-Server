module.exports = function (app) {
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);
  app.post('/api/logout', logout);
  app.post('/api/login', login);

  var userModel = require('../models/user/user.model.server');

  function profile(req, res) {
      res.send(req.session['currentUser']);
  }

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
      .then(function(user) {
        req.session['currentUser'] = user;
        res.json(user);
      })
  }

  function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }

  function createUser(req,res) {
    var user = req.body;
    userModel.createUser(user)
      .then(user => {
        req.session['currentUser'] = user;
        res.send(user)
      });
  }
}