const dotenv = require('dotenv');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
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

// Use Routers
app.use('/', routes.post);

// Listen to Port
app.listen(process.env.PORT, () => {
    console.log(`Reddit.js listening on http://localhost:${[process.env.PORT]}`)
});

module.exports = app;