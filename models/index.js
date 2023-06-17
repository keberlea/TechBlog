//require sequilize connection
const sequelize = require('../config/connection');
//import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//load models
const models = {
    User,
    Post,
    Comment
};

//create associations
User.hasMany(Post);

Post.belongsTo(User);

Comment.belongsTo(User);

Comment.belongsTo(Post);

User.hasMany(Comment);

Post.hasMany(Comment);

//export models
module.exports = {
    User,
    Post,
    Comment
};

