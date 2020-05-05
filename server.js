if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const path = require('path');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

connectDB();

// Passport Config middleware
require('./config/passport')(passport);

// Ejs and static files
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable cors
app.use(cors());

// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// Initialize passport and persistent login sessions middlewares
app.use(passport.initialize());
app.use(passport.session());

// Init. express-flash
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/home'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));
app.use('/places', require('./routes/places'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
