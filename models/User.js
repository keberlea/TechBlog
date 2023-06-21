//require sequelize, connection, and bcrypt
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

//define User model
class User extends Model {}
User.init({
    //id
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    //username
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    //password
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    }
    },
    {
    //hooks
    hooks: {
        //set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
            //encrypt password
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports = User;