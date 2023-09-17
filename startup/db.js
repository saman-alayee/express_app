const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  mongoose.connect("mongodb://127.0.0.1:27017/SP-express")
    .then(() => winston.info('Connected to MongoDB...'))
    .catch((err)=> winston.info(err))
}