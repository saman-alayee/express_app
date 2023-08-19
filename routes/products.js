const { Product, validate } = require("../models/product");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// read products
router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

// create product
router.post("/",auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    thumbnailImage:req.body.thumbnailImage,
    images:req.body.images
    
  });
  product = await product.save();

  res.send(product);
});

// update single product
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); //validate inputs

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

// delete single product
router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

// read single product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

module.exports = router;
