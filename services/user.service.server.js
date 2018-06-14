module.exports = function (app) {
  app.post('/api/user', createUser);

  var userModel = require('../models/user/user.model.server');

  function createUser(req,res) {
    var user = req.body;
    userModel.createUser(user)
      .then(user => res.send(user));
  }

}