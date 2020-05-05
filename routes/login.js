const router = require('express').Router();
const passport = require('passport');
const { checkNotAuthenticated } = require('../config/auth');

router.get('/', checkNotAuthenticated, (req, res) => res.render('login'));

router.post('/', (req, res, next) => {
  // authenticate local strategy
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
