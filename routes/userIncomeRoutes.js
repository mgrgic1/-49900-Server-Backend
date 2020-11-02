const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserIncome = require('../models/UserIncome');


//GET a specific income (based on income ID)
router.get('/incomeById/:incomeId', async (req,res,next) => {
    const {incomeId} = req.params;

    try {
        //if user income exists
        const userIncome = await UserIncome.findByPk(incomeId);

        //send back the user income back as a response
        res.status(200).json(userIncome);
    }
    catch(err) {
        next(err);
    }
})

//GET all the current user's income
router.get('/currentUser', async (req,res) => {
    const income = await UserIncome.findAll(
        { where: {userId: req.user.dataValues.id}, 
          order: [
            ['incomeId','DESC'],
          ] 
        }
    )
    res.send(income);
});


//GET all income for the current month
router.get('/currentUser/currentMonth', async (req,res, next) => {
    let d = new Date();
    let currentMonth = d.getMonth() + 1;
    let userId = req.user.dataValues.id;
    
    UserIncome.findAll({
        where: {
            user_id: userId,
            income_month: [currentMonth]
        },
        order: [
            ['income_monthly','DESC'],
        ]
    })
    .then(
        monthIncome => res.send(monthIncome)
    )
    .catch(next)
});


//GET ALL income by month and year
//ex: /currentUser/getIncomeByMY/10/2020 would return all income for october 2020
router.get('/currentUser/getIncomeByMY/:month/:year', async (req,res, next) => {
    let month = req.params.month;
    let year = req.params.year;
    let userId = req.user.dataValues.id;

    UserIncome.findAll({
        where: {
            user_id: userId,
            income_month: [month],
            income_year: [year]
        },
        order: [
            ['income_monthly','DESC'],
        ]
    })
    .then(
        MYIncome => res.send(MYIncome)
    )
    .catch(next)
});


//POST to create a new user income (based on USER_ID)
router.post('/add', (req,res) => {

    let {user_id, income_monthly, income_type, description, income_month, income_year, real_amount, real_frequency} = req.body;


    //insert into table
    UserIncome.create({
        user_id, income_monthly, income_type, description, income_month, income_year, real_amount, real_frequency
    }) 
    .then(userIncome => res.send(userIncome))
    .catch(err => console.log(err));
})

//PUT to edit income information (must have income id)
router.put("/edit/:incomeId",async(req,res,next) => {
    const {incomeId} = req.params;

    let {user_id, income_monthly, income_type, description, real_amount, real_frequency} = req.body;

    const updatedObj = {
        user_id: user_id,
        income_monthly: income_monthly,
        income_type: income_type,
        description:description,
        real_amount: real_amount,
        real_frequency: real_frequency
    };

    try 
    {
        //finds a user income with matching ((income ID)) from the database
        const userIncome = await UserIncome.findByPk(incomeId);

        console.log(updatedObj);

        //modify the goal object with new form data
        await userIncome.set(updatedObj);

        //save the new goal object to the db
        const updatedUserIncome = await userIncome.save();
        console.log(updatedUserIncome);
        res.status(201).send(updatedUserIncome);
    } catch(err) {
        next(err);
    }
})

//DELETE request to remove an income (must have the income id)
router.delete('/remove/:incomeId', (req,res,next) => {
    UserIncome.destroy({
        where: {
            income_id: req.params.incomeId
        }
    })
    .then(res.sendStatus(200))
    .catch(next)
})





module.exports = router;