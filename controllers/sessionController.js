const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');

router.get('/new', (req, res) => {
    res.render('../views/session/new.ejs');
});


router.post('/', async (req, res) => {
    //Find user
    const user = await User.findOne({ username: req.body.username });

    //password compare
    const isValid = await bcrypt.compare(req.body.password, user.password);

    //redirect user to the room
    if (isValid) {
        req.session.user = user;
        console.log(req.session);
        res.redirect('/room');
    } else {
        res.redirect('sessions/new');
    }
});

//delete session
router.delete('/', async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/sessions/new");
    });
});

module.exports = router;