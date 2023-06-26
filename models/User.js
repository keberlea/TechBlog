//require sequelize, connection, and bcrypt
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
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
       beforeCreate:async userdata=>{
            userdata.password = await bcrypt.hash(userdata.password,5)
            return userdata 
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports = User;