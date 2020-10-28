const Users = require('./Users');
const UserGoals = require('./UserGoals');
const UserExpenses = require('./UserExpenses');

UserGoals.belongsTo(Users);
UserExpenses.belongsTo(Users);
Users.hasMany(UserExpenses);
Users.hasMany(UserGoals);



module.exports = {
    Users,
    UserGoals,
    UserExpenses,
};