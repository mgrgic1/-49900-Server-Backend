const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Users = require('../models/Users');

//GET a single user's info (by their ID)
router.get('/:id', async (req,res,next) => {
    const {id} = req.params;
    try {
        //if user exists
        const user = await Users.findByPk(id);

        //send back the user as a response
        res.status(200).json(user);
    }
    catch(err) {
        next(err);
    }
})

//POST user info to database
router.post('/add', (req,res) => {
    let { username, email, totalBalance} = req.body;
    
    //insert into table
    Users.create({
        username,email, totalBalance
    })
    .then(users = res.redirect('/users'))
    .catch(err => console.log(err));
})

//PUT (edit) user info
router.put("/edit/:id",async(req,res,next) => {
    const {id} = req.params;

    let {username, email,totalBalance} = req.body;

    const updatedObj = {
        username: username,
        email: email,
        totalBalance: totalBalance
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
        //database would return a new student object
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