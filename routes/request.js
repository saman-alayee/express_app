const { Request, validate } = require("../models/request");
const express = require("express");
const nodemailer = require("nodemailer"); // Don't forget to require nodemailer
const router = express.Router();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Use the SMTP host of the email service (e.g., Gmail)
  port: 465,
  secure: true,
  auth: {
    user: 'saman.alaii10@gmail.com', // Replace with your Gmail email
    pass: '66678141', // Replace with your Gmail password
  }
});

router.get("/", async (req, res) => {
  const requests = await Request.find().sort("name");
  res.send(requests);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create a new Request instance
  let request = new Request({
    // Set properties based on the request body
    // (Assuming your request schema has properties like firstName, lastName, phone, email, etc.)
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    service:req.body.service,
    company:req.body.company
    // ... other properties
  });

  // Save the new request to the database
  request = await request.save();

  // Send the newly created request as the response
  res.send(request);
});

module.exports = router;