//Model for users

const Sequelize = require('sequelize');
const db = require('../config/database');


const Users = db.define('users',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    username: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
    }
}, 
//since sequelize adds an S to the end of the table name, freezeTableName takes the name of the table literally
{freezeTableName: true})

module.exports = Users;