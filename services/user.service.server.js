module.exports = function (app) {
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);

  var userModel = require('../models/user/user.model.server');

  function profile(req, res) {
      res.send(req.session['currentUser']);
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