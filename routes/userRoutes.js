const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Users = require('../models/Users');

//getting user info
router.get('/', (req,res,next) => {
    Users.findAll()
    .then(usersRes => res.send(usersRes))
    .catch(next)
})


router.post("/add", async(req, res, next) => {
    const {username, email } = req.body;

    const userObj = {
        username: username,
        email: email,
    };
    try {
        //create a new user
        const newUser = await Users.create(userObj);
        res.status(201).send(newUser);
    } catch (err) {
        next(err)
    }
});



module.exports = router;