const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: require,
      type: String,
      minlength: 5,
      maxlength: 50,
    },
  })
);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// Post
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});
// Put
// router.put("/:id", async (req, res) => {
//   const { error } = validateCustomer(req.body.name);
//   if (error) return res.status(400).send(error);
//   const customer = await Customer.findByAndUpdate(
//     req.params.id,
//     { name: req.body.name },
//     { new: true }
//   );
//   if (!customer) res.status(404).send("wrong route");
//   customer.name = req.body.name;
//   res.send(customer);
// });
// // Delete
// router.delete("/:id", async (req, res) => {
//   const customer = await Customer.findByAndRemove(
//     req.params.id,
//     { name: req.body.name },
//     { new: true }
//   );

//   if (!customer) res.status(404).send("wrong route");
//   res.send(customer);
// });
// // Get
// router.get("/:id", async (req, res) => {
//   const customer = await Customer.findById(req.params.id);
//   if (!customer) res.status(404).send("wrong route");
//   res.send(customer);
// });

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  });
  const result = schema.validate(customer);
  return result;
}

module.exports = router;
