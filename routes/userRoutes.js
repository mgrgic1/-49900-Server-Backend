const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Users = require('../models/Users');

//GET user info
router.get('/', (req,res,next) => {
    Users.findAll()
    .then(usersRes => res.send(usersRes))
    .catch(next)
})

//POST user info to database
router.post('/add', (req,res) => {
    let { username, email } = req.body;

    //insert into table
    Users.create({
        username,email
    })
    .then(users = res.redirect('/users'))
    .catch(err => console.log(err));
})

//PUT (edit) user info
router.put("/edit/:id",async(req,res,next) => {
    const {id} = req.params;

    let {username, email} = req.body;

    const updatedObj = {
        username: username,
        email: email
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