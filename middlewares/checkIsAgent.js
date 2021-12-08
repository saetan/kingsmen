const checkIsAgent = (req, res, next) => {

    if (!req.session.user) {
        res.redirect('/sessions/new');
        return
    };
    next();
}

module.exports = checkIsAgent