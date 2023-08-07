const express = require("express");
const app = express();
const mongoose = require("mongoose");
const customers = require('./routes/customers')
const users = require('./routes/users')

app.use(express.json());
app.use('/api/customers',customers)
app.use('/api/users',users)

// connect to database
mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("connect to mongodb"))
  .catch((err) => console.log("could not connect to mongodb" + err));


const port = process.env.PORT || 5000;
app.listen(port, () => 
console.log(`Server is running on http://localhost:${port}`));
 