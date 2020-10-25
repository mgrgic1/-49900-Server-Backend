const Users = require('./Users');
const UserGoals = require('./UserGoals');

UserGoals.belongsTo(Users);



module.exports = {
    Users,
    UserGoals
};