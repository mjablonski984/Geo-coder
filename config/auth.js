module.exports = {
  checkAuthenticated: (req, res, next) => {
    // Protected route - allow access only if user is logged-in
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },
  checkNotAuthenticated: (req, res, next) => {
    // If user isn't logged-in continue to selected route; if logged-in -redirect to dashboard
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
};
