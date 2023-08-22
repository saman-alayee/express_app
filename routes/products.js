const { Product, validate } = require("../models/product");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// read products
router.get("/", auth, async (req, res) => {
  const products = await Product.find({ createdBy: req.userId }).sort("name");
  res.send(products);
});

// create product
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.userId);
  let product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    thumbnailImage: req.body.thumbnailImage,
    images: req.body.images,
    createdBy: req.userId,
  });
  product = await product.save();

  res.send(product);
});

// update single product
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); //validate inputs

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.userId }, // Only allow updates if createdBy matches req.userId
    {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      thumbnailImage: req.body.thumbnailImage,

    },
    { new: true }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");
  res.send(product);
});

// delete single product
router.delete("/:id", auth, async (req, res) => {
  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.userId, // Only allow deletion if createdBy matches req.userId
  });

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

// read single product
router.get("/:id", auth, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

module.exports = router;
