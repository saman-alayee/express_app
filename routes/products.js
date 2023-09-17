const { Product, validate, upload } = require("../models/product");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const path = require("path");

// read products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.send(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
});


// create product
// create product
router.post("/", upload.single("thumbnailImage"), async (req, res) => {
  // Multer should have processed the file upload before reaching this point
  // The uploaded file data is available as req.file
console.log(req.file)
  // Check if an image was uploaded
  if (!req.file) {
    return res.status(400).send("Please upload an image.");
  }

  // Construct the image URL based on your server's configuration
  const thumbnailImage = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  // Create productData object with other form fields and the thumbnailImage URL
  const productData = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    thumbnailImage: thumbnailImage,
  };

  // Validate the product data
  const validationResult = validate(productData);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  // Create a new product with the validated data
  const product = new Product(productData);

  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
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
      images: req.body.images,
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
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).sort(this.name);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

module.exports = router;
