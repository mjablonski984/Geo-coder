const mongoose = require('mongoose');
const geocoder = require('../config/geocoder');

// user's input (address) will get converted to coords with middleware
// only user, location (coords), formated address and placeId will be saved in the db

const PlaceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  placeId: {
    type: String,
    required: [true, 'Please add a place ID'],
    unique: true,
    trim: true,
    maxlength: [30, 'Place ID must be less than 30 chars']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'] // the only values allowed -'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere' //2dsphere supports supports queries that calculate geomethrics on earth-like sphere
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode & create location  before saving in db
PlaceSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  // console.log(loc);

  function trim(str) {
    str = str.replace(' , ', ' ');
    return str.charAt(0) === ',' ? str.slice(1) : str;
  }

  // format location as a point
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: trim(loc[0].formattedAddress)
  };
  // Do not save unformatted address in db
  this.address = undefined;

  next();
});

module.exports = mongoose.model('Place', PlaceSchema);
