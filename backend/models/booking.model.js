const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 3 },
  lastName: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true },
  date: { type: Date, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;