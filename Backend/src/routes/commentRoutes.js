const { viewComments, createdComment, commentView, editComment, deleteComment } = require('../controllers/commentController');

const commentRouter = require('express').Router();

commentRouter.get('/comments', viewComments);
commentRouter.get('/comment/:id', commentView);
commentRouter.post('/comment', createdComment);
commentRouter.put('/comment', editComment);
commentRouter.delete('/comment', deleteComment);




module.exports = commentRouter;