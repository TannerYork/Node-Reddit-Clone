const dotenv = require('dotenv');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
dotenv.config()


// Set Database
require('./data/reddit-db');

// Create app
const app = express()

// Set hadlebars as the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Use Body Parser and Express Validator
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Cookie Parser
app.use(cookieParser());

// Auth Checker
var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  res.locals.currentUser = req.user;
  next();
};
app.use(checkAuth);

// Setup Controllers
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

// Listen to Port
app.listen(process.env.PORT, () => {
    console.log(`Reddit.js listening on http://localhost:${[process.env.PORT]}`)
});

module.exports = app;