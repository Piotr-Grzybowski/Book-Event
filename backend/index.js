const app = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

// DB connection
const uri = process.env.DB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (err) => {
  if(err) {
    console.log(err);
    process.exit(1);
  }
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});