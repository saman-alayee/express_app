const express = require("express");
const app = express();
const genres = require('./routes/genres')
const mongoose = require("mongoose");

app.use(express.json());
app.use('/api/genres',genres)

// connect to database
mongoose
  .connect("mongodb://127.0.0.1:27017/genres")
  .then(() => console.log("connect to mongodb"))
  .catch((err) => console.log("could not connect to mongodb" + err));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("port:" + port));
