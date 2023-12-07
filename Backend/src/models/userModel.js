const { Schema, model } = require('mongoose')

const userModel= new Schema({
    usuario: String,
    pass: String,
    email: String,
    linkAvatar: String

});

const user = model('user', userModel)

module.exports = user ;