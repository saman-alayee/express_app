const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require('config')
const jwt = require('jsonwebtoken');


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user is already register");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  // this line hashed password and repair error for duplicate key on password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token',token).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
 