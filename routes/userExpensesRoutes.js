const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserExpenses = require('../models/UserExpenses');


//GET a specific expense (based on EXPENSE ID)
router.get('/expenseById/:expenseId', async (req,res,next) => {
    const {expenseId} = req.params;

    try {
        //if user expense exists
        const userExpense = await UserExpenses.findByPk(expenseId);

        //send back the user expense back as a response
        res.status(200).json(userExpense);
    }
    catch(err) {
        next(err);
    }
})

//GET all expenses for a particular user
router.get('/:userId', async (req,res,next) => {
    const {userId} = req.params;
    
    UserExpenses.findAll({
        where: {
            user_id: [userId]
        },
        //highest MONTHLY expenses go first
        order: [
            ['expense_monthly','DESC'],
        ]
    })
    .then(
        expenseRes => res.send(expenseRes)
    )
    .catch(next)  
})

//POST to create a new user expense (based on USER_ID)
router.post('/add', (req,res) => {

    let {user_id, expense_monthly, description, real_amount, real_frequency} = req.body;


    //insert into table
    UserExpenses.create({
        user_id, expense_monthly, description, real_amount, real_frequency
    }) 
    .then(userExpense => res.send(userExpense))
    .catch(err => console.log(err));
})

//PUT to edit expense information (must have expense id)
router.put("/edit/:expenseId",async(req,res,next) => {
    const {expenseId} = req.params;

    let {user_id, expense_monthly, description, real_amount, real_frequency} = req.body;

    const updatedObj = {
        user_id: user_id,
        expense_monthly: expense_monthly,
        description:description,
        real_amount: real_amount,
        real_frequency: real_frequency
    };

    try 
    {
        //finds a user expense with matching ((EXPENSE ID)) from the database
        const userExpense = await UserExpenses.findByPk(expenseId);

        console.log(updatedObj);

        //modify the goal object with new form data
        await userExpense.set(updatedObj);

        //save the new goal object to the db
        const updatedUserExpense = await userExpense.save();
        console.log(updatedUserExpense);
        res.status(201).send(updatedUserExpense);
    } catch(err) {
        next(err);
    }
})

//DELETE request to remove an expense (must have the expense id)
router.delete('/remove/:expenseId', (req,res,next) => {
    UserExpenses.destroy({
        where: {
            expense_id: req.params.expenseId
        }
    })
    .then(res.sendStatus(200))
    .catch(next)
})





module.exports = router;