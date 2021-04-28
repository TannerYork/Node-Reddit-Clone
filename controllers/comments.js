const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');

module.exports = function(app) {
    // CREATE Comment
    app.post("/posts/:postId/comments", function(req, res) {
      // INSTANTIATE INSTANCE OF MODEL
      if (req.user) {
        const comment = new Comment(req.body);
        comment.author = req.user._id;

        // SAVE INSTANCE OF Comment MODEL TO DB
        comment
          .save()
          .then(comment => {
              return Post.findById(req.params.postId);
          })
          .then(post => {
              post.comments.unshift(comment);
              return post.save();
          })
          .then(post => {
              res.redirect(`/`);
          })
          .catch(err => {
              console.log(err);
          });
      } else {
        return res.status(401); // UNAUTHORIZED
      }
    });
}