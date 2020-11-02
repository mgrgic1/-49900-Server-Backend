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

//GET all the current user's expenses
router.get('/currentUser', async (req,res) => {
    const expenses = await UserExpenses.findAll(
        { where: {userId: req.user.dataValues.id}, 
          order: [
            ['incomeId','DESC'],
          ] 
        }
    )
    res.send(expenses);
});

//GET all expenses for the current month
router.get('/currentUser/currentMonth', async (req,res, next) => {
    let d = new Date();
    let currentMonth = d.getMonth() + 1;
    let userId = req.user.dataValues.id;
    
    UserExpenses.findAll({
        where: {
            user_id: userId,
            expense_month: [currentMonth]
        },
        order: [
            ['expense_monthly','DESC'],
        ]
    })
    .then(
        monthExpenses => res.send(monthExpenses)
    )
    .catch(next)
});


//GET ALL expenses by month and year
//ex: /currentUser/getExpenseByMY/10/2020 would return all expenses for october 2020
router.get('/currentUser/getExpenseByMY/:month/:year', async (req,res, next) => {
    let month = req.params.month;
    let year = req.params.year;
    let userId = req.user.dataValues.id;

    UserExpenses.findAll({
        where: {
            user_id: userId,
            expense_month: [month],
            expense_year: [year]
        },
        order: [
            ['expense_monthly','DESC'],
        ]
    })
    .then(
        MYExpenses => res.send(MYExpenses)
    )
    .catch(next)
});


//POST to create a new user expense (based on USER_ID)
router.post('/add', (req,res) => {

    let {user_id, expense_monthly, expense_type, description, expense_month, expense_year, real_amount, real_frequency} = req.body;


    //insert into table
    UserExpenses.create({
        user_id, expense_monthly, expense_type, description, expense_month, expense_year, real_amount, real_frequency
    }) 
    .then(userExpense => res.send(userExpense))
    .catch(err => console.log(err));
})

//PUT to edit expense information (must have expense id)
router.put("/edit/:expenseId",async(req,res,next) => {
    const {expenseId} = req.params;

    let {user_id, expense_monthly, expense_type, description, real_amount, real_frequency} = req.body;

    const updatedObj = {
        user_id: user_id,
        expense_monthly: expense_monthly,
        expense_type: expense_type,
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