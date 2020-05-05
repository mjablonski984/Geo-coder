const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkNotAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.get('/', checkNotAuthenticated, (req, res) => res.render('register'));

router.post('/', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  const emailExists = await User.findOne({ email: req.body.email.toLowerCase() });

  if (emailExists) errors.push({ msg: 'Email already exists' });

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) errors.push({ msg: 'Passwords do not match' });

  if (password.length < 6) errors.push({ msg: 'Passwords should be at least 6 characters' });

  // If there are errors on reload render form with filled up fields
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email
    });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        name: name,
        email: email.toLowerCase(),
        password: hashedPassword
      });

      await user.save();

      req.flash('success', 'You are now registered.');
      res.redirect('/login');
    } catch (err) {
      console.error(err);
      res.redirect('/register');
    }
  }
});

module.exports = router;
