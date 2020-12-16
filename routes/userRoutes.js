const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Users = require('../models/Users');
const UserExpenses = require('../models/UserExpenses');
const UserIncome = require('../models/UserIncome');


//GET a single user's info (by their ID)
router.get('/:id', async (req,res,next) => {

    const {id} = req.params;

    const allRealIncomeJSON = await UserIncome.findAll({
        where: {
            user_id: [id]
        },
        attributes: ['real_amount'],
        raw:true,
    })

    const allRealExpensesJSON = await UserExpenses.findAll({
        where: {
            user_id: [id]
        },
        attributes: ['real_amount'],
        raw:true,
    })

    let allExpenses = 0;
    let allIncome = 0;
    let netSavings = 0;

    //add all user income
    for(let i =0; i<Object.keys(allRealIncomeJSON).length;i++) {
        allIncome += allRealIncomeJSON[i].real_amount;
    }

    //add all user expenses
    for(let i =0; i<Object.keys(allRealExpensesJSON).length;i++) {
        allExpenses += allRealExpensesJSON[i].real_amount;
    }

    //rounds decimals to 2 places
    allExpenses = allExpenses.toFixed(2);
    allIncome = allIncome.toFixed(2);
    netSavings = (allIncome-allExpenses).toFixed(2);

    try {
        //if user exists
        const user = await Users.findByPk(id);

        //if their net savings are above 0, return the net savings
        //otherwise, return 0
        user.totalBalance = netSavings > 0 ? netSavings : 0;
        
        //send back the user as a response
        res.status(200).json(user);
    }
    //error handling
    catch(err) {
        next(err);
    }
})

//POST user info to database
router.post('/add', (req,res) => {
    let { username, email, googleId, totalBalance} = req.body;
    
    //insert into table
    Users.create({
        username,email, totalBalance, googleId
    })
    .then(users = res.redirect('/users'))
    .catch(err => console.log(err));
})

//PUT (edit) user info
router.put("/edit/:id",async(req,res,next) => {
    const {id} = req.params;

    let {username, email,totalBalance, googleId} = req.body;

    const updatedObj = {
        username: username,
        email: email,
        totalBalance: totalBalance,
        googleId: googleId
    };

    try 
    {
        //finds a user with matching ID from the database
        const user = await Users.findByPk(id);

        //will either show a valid user object or an error
        console.log(updatedObj);

        //modify the user object with new form data
        await user.set(updatedObj);

        //save the new user object to the db
        //database would return a new user object
        const updatedUser = await user.save();
        console.log(updatedUser);
        res.status(201).send(updatedUser);
    } catch(err) {
        next(err);
    }
})

//DELETE a user from the database
router.delete('/remove/:id', (req,res,next) => {
    Users.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(res.sendStatus(200))
    .catch(next)
})

module.exports = router;