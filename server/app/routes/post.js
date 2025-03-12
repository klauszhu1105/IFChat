var express = require('express');
const router = express.Router();

const { CreatePost, GetPosts, LikePost, UnlikePost } = require('../../container/post/index');


module.exports = function () {
   // Route to create a new post
router.post('/create-post', CreatePost)

// Route to retrieve all posts
router.get('/get-posts', GetPosts)

// Route to like a post
router.post('/like-post', LikePost)

// Route to unlike a post
router.post('/unlike-post', UnlikePost)

module.exports = router

return router
}
