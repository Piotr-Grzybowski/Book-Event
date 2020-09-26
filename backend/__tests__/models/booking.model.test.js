const mongoose = require('mongoose');
const BookingModel = require('../../models/booking.model');

describe('Booking model test', () => {
  const bookingData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@example',
    date: new Date()
  };
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    })
  });
  it('should create & save new booking successfully', async () => {
    const booking = new BookingModel(bookingData);
    const savedBooking = await booking.save();
    // ObjectId should be defined when successfully saved to MongoDb
    expect(savedBooking._id).toBeDefined();
    expect(savedBooking.firstName).toBe(bookingData.firstName);
    expect(savedBooking.lastName).toBe(bookingData.lastName);
    expect(savedBooking.email).toBe(bookingData.email);
    expect(savedBooking.date).toBe(bookingData.date);
  });
  // Schema is working so we shouldn't be able to add extra fields
  it('insert booking successfully, but the field does not defined in schema should be undefined', async () => {
      const bookingWithInvalidField = new BookingModel({...bookingData, note: 'There is no place for notes yet'});
      const savedBookingWithInvalidField = await bookingWithInvalidField.save();
      expect(savedBookingWithInvalidField._id).toBeDefined();
      expect(savedBookingWithInvalidField.note).toBeUndefined();
  });
  // validation in schema works so we should have error on every required field when model is empty
  it('create booking without required field should failed', async () => {
      const bookingWithoutRequiredField = new BookingModel();
      let err;
      try {
          await bookingWithoutRequiredField.save();
      } catch (error) {
          err = error
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.errors.firstName).toBeDefined();
      expect(err.errors.lastName).toBeDefined();
      expect(err.errors.email).toBeDefined();
      expect(err.errors.date).toBeDefined();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
});