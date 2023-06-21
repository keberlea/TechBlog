const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
        return;
    } else {
        next()
    }
}

module.exports = withAuth