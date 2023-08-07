const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user is already register");

  user = new User(_.pick(req.body, ['name','email','password']));
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
