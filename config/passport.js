const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function (passport) {
  // Authenticate user using a username and password (local strategy)
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email: email.toLowerCase() });

    try {
      if (!user) {
        //done(err,user,msg)
        return done(null, false, { message: 'Invalid email or password' });
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid email or password' });
      }
    } catch (e) {
      return done(e);
    }
  };

  // Passport - local strategy - authenticate user
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  // Serialize and deserialize user
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
