const post = require('../models/postModel')


const addComment = async (newComment,postID) => {

    const postComment = await post.findById(postID);
    postComment.comments.push(newComment._id);
    await postComment.save();
}

module.exports = {
    addComment
}