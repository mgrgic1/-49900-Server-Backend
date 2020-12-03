const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserGoals = require('../models/UserGoals');
const UserExpenses = require('../models/UserExpenses');
const UserIncome = require('../models/UserIncome');

//GET all goals for a specific user (based on USER ID)
//ORDERED BY PRIORITY
router.get('/:userId', async (req,res,next) => {
    
    const {userId} = req.params;

    const allIncomeJSON = await UserIncome.findAll({
        where: {
            user_id: [userId]
        },
        attributes: ['income_monthly'],
        raw:true,
    })

    const allExpensesJSON = await UserExpenses.findAll({
        where: {
            user_id: [userId]
        },
        attributes: ['expense_monthly'],
        raw:true,
    })

    const allP1Goals = await UserGoals.findAll({
        where: {
            user_id: [userId],
            priority: 1
        },
        attributes:['priority'],
        raw:true
    })
    const allP2Goals = await UserGoals.findAll({
        where: {
            user_id: [userId],
            priority: 2
        },
        attributes:['priority'],
        raw:true
    })
    const allP3Goals = await UserGoals.findAll({
        where: {
            user_id: [userId],
            priority: 3
        },
        attributes:['priority'],
        raw:true
    })



    let allExpenses = 0;
    let allIncome = 0;
    let netSavings = 0;

    let moneyForP1 = 0;
    let moneyForP2 = 0;
    let moneyForP3 = 0;

    //add all user income
    for(let i =0; i<Object.keys(allIncomeJSON).length;i++) {
        allIncome += allIncomeJSON[i].income_monthly;
    }

    //add all user expenses
    for(let i =0; i<Object.keys(allExpensesJSON).length;i++) {
        allExpenses += allExpensesJSON[i].expense_monthly;
    }

    //rounds decimals to 2 places
    allExpenses = allExpenses.toFixed(2);
    allIncome = allIncome.toFixed(2);


    if(allIncome - allExpenses > 0) {
        netSavings = (allIncome - allExpenses).toFixed(2);

        if(Object.keys(allP1Goals).length > 0) 
        {
            moneyForP1 = netSavings * (0.6/Object.keys(allP1Goals).length);
        }
        if(Object.keys(allP2Goals).length > 0) 
        {
            moneyForP2 = netSavings * (0.3/Object.keys(allP2Goals).length);
        }
        if(Object.keys(allP3Goals).length > 0)
        {
            moneyForP3 = netSavings * (0.1/Object.keys(allP3Goals).length);
        }
    }
    else {
        netSavings = 0;
    }
 
    UserGoals.findAll({
        where: {
            user_id: [userId]
        },
        order: [
            ['priority','ASC'],
        ]
    })
    .then(
        goalRes => {
            for(let i = 0; i<Object.keys(goalRes).length;i++)
            {
                if(goalRes[i].priority == 1) 
                {
                    goalRes[i].savingsTowardsGoal = moneyForP1.toFixed(2);
                }
                if(goalRes[i].priority == 2) 
                {
                    goalRes[i].savingsTowardsGoal = moneyForP2.toFixed(2);
                }
                if(goalRes[i].priority == 3) 
                {
                    goalRes[i].savingsTowardsGoal = moneyForP3.toFixed(2);
                }
            }

            res.send(goalRes)
        }
    )
    .catch(next)  
})

//GET a specific goal (based on GOAL ID)
router.get('/goalById/:goalId', async (req,res,next) => {
    const {goalId} = req.params;

    try {
        //if user goal exists
        const userGoal = await UserGoals.findByPk(goalId);

        //send back the user goal as a response
        res.status(200).json(userGoal);
    }
    catch(err) {
        next(err);
    }
})

//POST to create a new user goal (based on USER_ID)
router.post('/add', (req,res) => {

    let {user_id, amount_needed, description, reach_by_date, priority} = req.body;


    //insert into table
    UserGoals.create({
        user_id, amount_needed, description, reach_by_date, priority
    }) 
    .then(userGoal => res.send(userGoal))
    .catch(err => console.log(err));
})

//PUT to update a user's goal
router.put("/edit/:goalId",async(req,res,next) => {
    const {goalId} = req.params;

    let {amount_needed, description, reach_by_date, priority} = req.body;

    const updatedObj = {
        amount_needed: amount_needed,
        description: description,
        reach_by_date: reach_by_date,
        priority: priority
    };

    try 
    {
        //finds a user goal with matching ((GOAL ID)) from the database
        const userGoal = await UserGoals.findByPk(goalId);

        //will either show a valid goal object or an error
        console.log(updatedObj);

        //modify the goal object with new form data
        await userGoal.set(updatedObj);

        //save the new goal object to the db
        const updatedUserGoal = await userGoal.save();
        console.log(updatedUserGoal);
        res.status(201).send(updatedUserGoal);
    } catch(err) {
        next(err);
    }
})

//DELETE to remove a user's goal (BASED ON GOAL ID)
router.delete('/remove/:goalId', (req,res,next) => {
    UserGoals.destroy({
        where: {
            goal_id: req.params.goalId
        }
    })
    .then(res.sendStatus(200))
    .catch(next)
})



module.exports = router;