const  express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', (req, res) => {
    Post.find({}).lean()
    .then(posts => {
        res.render('posts-index', { posts });
    })
    .catch(err => {
        console.log(err);
    });
});

router.get('/posts/new', (reg, res) => {
    return res.render('new-post');
});

router.post('/posts/new', (req, res) => {
    const post  = new Post(req.body);
    post.save((err, post) => {
        return res.redirect('/');
    });
});

router.get("/posts/:id", (req, res) => {
    // LOOK UP THE POST
    Post.findById(req.params.id).lean()
    .then(post => {
        res.render("posts-show", { post });
    })
    .catch(err => {
        console.log(err.message);
    });
});

// SUBREDDIT
router.get("/n/:subreddit", (req, res) => {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err);
      });
});

module.exports = router;