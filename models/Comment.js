//require sequilize and connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


//define Comment model
const Comment = sequelize.define(
    'Comment', {
        //id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //comment text
        comment_text: {
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
        //post id
        post_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'post',
                key: 'id'
            },
        },
    },
);

module.exports = Comment;