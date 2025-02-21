// server/models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  trip_data: Object, // Store the entire JSON object
});

module.exports = mongoose.model('Trip', tripSchema);