const config = require('dotenv/config.js');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express()

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home')
});

app.listen(process.env.PORT, () => {
    console.log(`Reddit.js listening on http://localhost:${[process.env.PORT]}`)
});