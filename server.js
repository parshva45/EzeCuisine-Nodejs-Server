var express = require('express')
var bodyParser = require('body-parser');
var app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_sw319lv0:l8s8dg9268nt01dmpsb8lnofb4@ds263710.mlab.com:63710/heroku_sw319lv0');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    var allowedOrigins = [
        "http://localhost:4200",
        "https://eze-cuisine-angular-client.herokuapp.com"
    ];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World')
})

var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

require('./services/recipe.service.server')(app);
require('./services/user.service.server')(app);

app.listen(process.env.PORT || 4000);