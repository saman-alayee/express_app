const { Cart, validate } = require("../models/cart");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// read carts
router.get("/", auth, async (req, res) => {
  const carts = await Cart.find({ createdBy: req.userId }).sort("name");
  res.send(carts);
});

// create cart
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.userId);
  let cart = new Cart({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    thumbnailImage: req.body.thumbnailImage,
    createdBy: req.userId,
  });
  cart = await cart.save();

  res.send(cart);
});

// update single cart
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); //validate inputs

  const cart = await Cart.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.userId }, // Only allow updates if createdBy matches req.userId
    {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      thumbnailImage: req.body.thumbnailImage,
      images: req.body.images,

    },
    { new: true }
  );

  if (!cart)
    return res.status(404).send("The cart with the given ID was not found.");
  res.send(cart);
});

// delete single cart
router.delete("/:id", auth, async (req, res) => {
  const cart = await Cart.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.userId, // Only allow deletion if createdBy matches req.userId
  });

  if (!cart)
    return res.status(404).send("The cart with the given ID was not found.");

  res.send(cart);
});

// read single cart
router.get("/:id", auth, async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if (!cart)
    return res.status(404).send("The cart with the given ID was not found.");

  res.send(cart);
});

module.exports = router;
