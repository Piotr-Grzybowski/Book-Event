const express = require('express');
const cors = require('cors');
const bookingRouter = require('./routes/booking');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Router
app.use('/api/booking/', bookingRouter);

module.exports = app;