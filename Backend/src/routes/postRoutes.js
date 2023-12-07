const { viewPosts, postView, createdPost, editPost, deletePost, myPosts } = require('../controllers/postController');

const postRouter = require('express').Router();

postRouter.get('/posts', viewPosts);
postRouter.get('/post/:id', postView)
postRouter.post('/post', createdPost)
postRouter.put('/post', editPost)
postRouter.delete('/post', deletePost)
postRouter.get('/myposts', myPosts)





module.exports = postRouter ;