const  express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.get('/new', (reg, res) => {
    return res.render('new-post');
});

router.post('/new', (req, res) => {
    const post  = new Post(req.body);
    post.save((err, post) => {
        return res.redirect('/');
    });
});

module.exports = router;