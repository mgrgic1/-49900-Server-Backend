//Model for users

const Sequelize = require('sequelize');
const db = require('../config/database');


const UserGoals = db.define('user_goals',{
    goal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    amount_needed: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        allowEmpty: false,
    },

    description: {
        type: Sequelize.STRING,
        allowNull: true,
        allowEmpty: true,
    },
    
    reach_by_date: {
        type: Sequelize.DATE,
        allowNull: false,
        allowEmpty: false,
    },

    progress: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        allowEmpty: false,
    },
    
    priority: {
        type: Sequelize.INTEGER,
        allowNull: true,
        allowEmpty: false,
    }

}, 
//since sequelize adds an S to the end of the table name, freezeTableName takes the name of the table literally
{freezeTableName: true})

module.exports = UserGoals;