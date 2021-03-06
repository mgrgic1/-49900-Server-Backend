//Model for user expenses

const Sequelize = require('sequelize');
const db = require('../config/database');


const UserExpenses = db.define('user_expenses',{
    expense_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    expense_monthly: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        allowEmpty: false,
    },

    expense_type: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false
    },

    expense_month: {
        type: Sequelize.INTEGER,
        allowNull: false,
        allowEmpty: false
    },

    expense_year: {
        type: Sequelize.INTEGER,
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

module.exports = UserExpenses;