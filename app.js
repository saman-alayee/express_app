var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var nodemailer = require("nodemailer");
var cors = require('cors')

var app = express();
app.use(cors());

// Define a custom middleware function to log requests
function logRequest(req, res, next) {
  // Log the IP address
  const ipAddress = req.ip || req.connection.remoteAddress;

  console.log(`Request Method: ${req.method}${req.url}` + `---Request from IP: ${ipAddress}`);

  // Continue processing the request
  next();
}

// Add the custom middleware
app.use(logRequest);

// Your existing code follows...

require('./startup/routes')(app);
require('./startup/db')();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
