const Post = require('../models/Post.js');

module.exports = function(app) {
    app.get('/', (req, res) => {
        Post.find({}).lean()
        .then(posts => {
            res.render('posts-index', { posts });
        })
        .catch(err => {
            console.log(err.message);
        });
    });
    
    app.get('/posts/new', (reg, res) => {
        return res.render('new-post');
    });
    
    app.post('/posts/new', (req, res) => {
        if (req.user) {
            const post  = new Post(req.body);
            post.save((err, post) => {
                return res.redirect('/');
            });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });
    
    app.get("/posts/:id", (req, res) => {
        // LOOK UP THE POST
        Post.findById(req.params.id).lean().populate('comments').then((post) => {
            res.render('posts-show', { post })
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    // SUBREDDIT
    app.get("/n/:subreddit", (req, res) => {
        Post.find({ subreddit: req.params.subreddit }).lean()
          .then(posts => {
            res.render("posts-index", { posts });
          })
          .catch(err => {
            console.log(err);
          });
    });
};