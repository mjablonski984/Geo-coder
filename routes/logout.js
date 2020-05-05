const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.logout(); //passport method
  res.redirect('/login');
});

module.exports = router;
