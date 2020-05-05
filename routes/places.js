const router = require('express').Router();
const Place = require('../models/Place');

router.get('/', async (req, res, next) => {
  try {
    const place = await Place.find({ 'user': req.user._id });

    return res.status(200).json({ data: place });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const place = await Place.create(req.body); // save data in the db

    return res.status(201).json({ data: place });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This place already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
