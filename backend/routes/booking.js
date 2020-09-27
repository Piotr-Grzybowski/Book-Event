const router = require('express').Router();
let Booking = require('../models/booking.model');
const { body, validationResult } = require('express-validator');

router.post('/add', [
  // validation and sanitization
  body('firstName', "Please provide correct name!").isString().not().isEmpty().isLength({min: 3}).trim().escape(),
  body('lastName', "Please provide correct last name!").isString().not().isEmpty().trim().escape(),
  body('email', "Please provide correct email address!").isEmail().not().isEmpty().normalizeEmail(),
  body('date', "Please provide correct date!").isISO8601().not().isEmpty()
], (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const date = new Date(req.body.date);
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors);
  } else {
    const newBooking = new Booking({firstName, lastName, email, date});
    newBooking.save()
      .then(() => res.json('Event booked'))
      .catch((err) => {
        res.status(422).json('Error: ' + err);
      })
  }
});

module.exports = router;