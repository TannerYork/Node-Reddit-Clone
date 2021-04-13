const  express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', (req, res) => {
    Post.find({}).lean()
    .then(posts => {
        res.render('post-index', { posts });
    })
    .catch(err => {
        console.log(err);
    });
});

router.get("/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).lean()
    .then(post => {
        res.render("post-show", { post });
    })
    .catch(err => {
        console.log(err.message);
    });
});

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