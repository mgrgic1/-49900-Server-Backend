const { response } = require('express');
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




module.exports = router;