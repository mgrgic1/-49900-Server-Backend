const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserGoals = require('../models/UserGoals');

//GET all goals for a specific user (based on USER ID)
//ORDERED BY PRIORITY
router.get('/:userId', async (req,res,next) => {
    const {userId} = req.params;
    
    UserGoals.findAll({
        where: {
            user_id: [userId]
        },
        order: [
            ['priority','ASC'],
        ]
    })
    .then(
        goalRes => res.send(goalRes)
    )
    .catch(next)  
})

//GET a specific goal (based on GOAL ID)
router.get('/goal/:goalId', async (req,res,next) => {
    const {goalId} = req.params;

    try {
        //if user exists
        const userGoal = await UserGoals.findByPk(goalId);

        //send back the user as a response
        res.status(200).json(userGoal);
    }
    catch(err) {
        next(err);
    }
})

//POST to create a new user goal (based on USER_ID)
router.post('/addGoal', (req,res) => {

    let {user_id, amount_needed, description, reach_by_date, progress, priority} = req.body;


    //insert into table
    UserGoals.create({
        user_id, amount_needed, description, reach_by_date, progress, priority
    }) 
    .then(userGoal => res.send(userGoal))
    .catch(err => console.log(err));
})

//PUT to update a user's goal
router.put("/edit/:goalId",async(req,res,next) => {
    const {goalId} = req.params;

    let {amount_needed, description, reach_by_date, progress, priority} = req.body;

    const updatedObj = {
        amount_needed: amount_needed,
        description: description,
        reach_by_date: reach_by_date,
        progress: progress,
        priority: priority
    };

    try 
    {
        //finds a user goal with matching ((GOAL ID)) from the database
        const userGoal = await UserGoals.findByPk(goalId);

        //will either show a valid user object or an error
        console.log(updatedObj);

        //modify the user object with new form data
        await userGoal.set(updatedObj);

        //save the new user object to the db
        //database would return a new student object
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