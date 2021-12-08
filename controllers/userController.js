const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');

//to get to users/new
router.get('/new', (req, res) => {
    res.render('../views/users/new.ejs');
});

//Routes to create user
router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    const messages = req.body.messages;

    const newUser = await User.create({
        username: username,
        password: password,
        messages: [messages]
    })
    //create user in mongo  
    //redirect user to home page
    res.redirect('/');
});

//Export
module.exports = router;