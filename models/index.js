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

Post.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(Post);





//export models
module.exports = {
    User,
    Post,
    Comment
};

