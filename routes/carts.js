const { Cart, validate } = require("../models/cart");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");


// functions 
// Calculate total cost of a cart
function calculateTotalCost(cartItems) {
  let totalCost = 0;
  for (const cartItem of cartItems) {
    totalCost += cartItem.quantity * cartItem.price;
  }
  return totalCost;
}

// read all carts
router.get("/all", auth, async (req, res) => {
  const carts = await Cart.find({ createdBy: req.userId }).sort("name");
  const totalCost = calculateTotalCost(carts);

  res.send({ carts, totalCost });
});
// read just user cart
router.get("/", auth, async (req, res) => {
  try {
    const carts = await Cart.find({ createdBy: req.userId }).sort("name");
    const totalCost = calculateTotalCost(carts);

    res.send({ carts, totalCost });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// create cart
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let cart = new Cart({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    thumbnailImage: req.body.thumbnailImage,
    createdBy: req.userId,
    quantity:req.body.quantity
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
      quantity:req.body.quantity

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
