const app = require('../../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  })
});

const bookingData = {
  firstName: 'Johnny',
  lastName: 'Doe',
  email: 'example@example.com',
  date: new Date()
};
const notValidBookingData = {
  firstName: '',
  lastName: 1232,
  email: 'example@ws',
  date: ''
};

describe('Booking API endpoints test:', () => {

  describe('Add endpoint tests:', () => {
    it("should book new event successfully", async done => {
      const response = await request.post('/api/booking/add').send(bookingData);
      expect(response.status).toBe(200);
      expect(response.body).toBe("Event booked");
      done();
    });
    // Let's test the express-validator
    it('should get errors from validators when data not valid', async done => {
      const response = await request.post('/api/booking/add').send(notValidBookingData);
  
      const firstNameErrors = response.body.errors.filter((elem) => elem.param === 'firstName');
      const lastNameErrors = response.body.errors.filter((elem) => elem.param === 'lastName');
      const emailErrors = response.body.errors.filter((elem) => elem.param === 'email');
      const dateErrors = response.body.errors.filter((elem) => elem.param === 'date');
  
      expect(response.body.errors[0]).toBeTruthy();
      expect(firstNameErrors[0].msg).toBe("Please provide correct name!");
      expect(lastNameErrors[0].msg).toBe("Please provide correct last name!");
      expect(emailErrors[0].msg).toBe("Please provide correct email address!");
      expect(dateErrors[0].msg).toBe("Please provide correct date!");
      done();
    });
    it('should return error when different method calls on endpoint', async () => {
      const response = await request.put('/api/booking/add').send(bookingData);
      expect(response.status).toBe(404);
      expect(response.error).toBeTruthy();
    })
    it('should return error when booking save method fails', async () => {
      const response = await request.post('/api/booking/add').send({...bookingData, firstName: 'Palalalalalalala'});
      expect(response.status).toBe(422);
      expect(response.body).toEqual(expect.stringContaining('Error: '));
    });
  });

});

afterAll(async () => {
  await mongoose.disconnect();
});