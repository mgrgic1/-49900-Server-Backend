//Model for user income

const Sequelize = require('sequelize');
const db = require('../config/database');


const UserIncome = db.define('user_income',{
    income_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    income_monthly: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        allowEmpty: false,
    },

    income_type: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: true,
    },

    real_amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        allowEmpty: false,
    },

    real_frequency: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
    }
}, 
//since sequelize adds an S to the end of the table name, freezeTableName takes the name of the table literally
{freezeTableName: true})

module.exports = UserIncome;