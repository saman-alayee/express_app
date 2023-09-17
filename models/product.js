const Joi = require("joi");
const mongoose = require("mongoose");
const multer = require("multer"); // Add Multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename for each uploaded file
  },
});
const upload = multer({ storage: storage });

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    shortDescription: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    thumbnailImage: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 2048,
    },
    images: {
      type: Array,
      required: true,
    },
   
  },  { timestamps: true })
);
function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    category: Joi.string().min(5).max(50).required(),
    price: Joi.number().required(),
    description: Joi.string().min(5).max(1024).required(),
    shortDescription: Joi.string().min(5).max(1024).required(),
    thumbnailImage: Joi.string().min(5).max(2048).required(), 

  });
  const result = schema.validate(product);
  return result;
}

exports.Product = Product;
exports.validate = validateProduct;
exports.upload = upload; // Export the Multer uploazd middleware