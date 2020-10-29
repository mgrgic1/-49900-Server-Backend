const Users = require('./Users');
const UserGoals = require('./UserGoals');
const UserExpenses = require('./UserExpenses');
const UserIncome = require('./UserIncome');

UserGoals.belongsTo(Users);
UserExpenses.belongsTo(Users);
UserIncome.belongsTo(Users);

Users.hasMany(UserExpenses);
Users.hasMany(UserGoals);
Users.hasMany(UserIncome);



module.exports = {
    Users,
    UserGoals,
    UserExpenses,
    UserIncome,
};