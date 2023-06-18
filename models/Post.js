// require sequelize and connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//define Post model

const Post = sequelize.define(
    'Post', {
        //id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //title
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //post content
        post_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //user id
        user_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id'
            },
        },
    },
);

module.exports = Post;