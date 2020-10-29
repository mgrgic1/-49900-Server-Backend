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

//GET all income for a particular user
router.get('/:userId', async (req,res,next) => {
    const {userId} = req.params;
    
    UserIncome.findAll({
        where: {
            user_id: [userId]
        },
        //highest MONTHLY income go first
        order: [
            ['income_monthly','DESC'],
        ]
    })
    .then(
        incomeRes => res.send(incomeRes)
    )
    .catch(next)  
})

//POST to create a new user income (based on USER_ID)
router.post('/add', (req,res) => {

    let {user_id, income_monthly, income_type, description, real_amount, real_frequency} = req.body;


    //insert into table
    UserIncome.create({
        user_id, income_monthly, income_type, description, real_amount, real_frequency
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