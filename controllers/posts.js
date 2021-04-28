const Post = require('../models/Post.js');
const User = require('../models/User.js');

module.exports = function(app) {
  app.get('/', (req, res) => {
    Post.find({}).lean().populate('author')
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
      post.author = req.user._id;
      post
        .save()
        .then(post => {
          return User.findById(req.user._id);
        })
        .then(user => {
          user.posts.unshift(post);
          user.save();
          res.redirect(`/posts/${post._id}`);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });
  
  app.get("/posts/:id", (req, res) => {
    // LOOK UP THE POST
    Post.findById(req.params.id).lean()
      .populate('author')
      .populate({ 
        path: 'comments',
          populate: {
            path: 'author'
          } 
      })
      .then((post) => {
        res.render('posts-show', { post })
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", (req, res) => {
    Post.find({ subreddit: req.params.subreddit }).lean().populate('author')
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err);
      });
  });
};