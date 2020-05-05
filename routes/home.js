const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../config/auth');

router.get('/', checkAuthenticated, (req, res) => res.render('index', { user: req.user }));

module.exports = router;
