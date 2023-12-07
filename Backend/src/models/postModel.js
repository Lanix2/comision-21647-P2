const { Schema, model } = require('mongoose')

const postModel = new Schema(
    {
        titulo: String,
        desc: String,
        linkImg: String,
        autor: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        comments:[{
            type: Schema.Types.ObjectId,
            ref: 'comment',
        }] ,
    },
    {
        timestamps: true, 
    }
);

const post = model('post', postModel)

module.exports = post;