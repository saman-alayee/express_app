const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://127.0.0.1:27017/SP')
    .then(() => winston.info('Connected to MongoDB...'))
    .catch((err) =>
    winston.info('db has error...'))
}