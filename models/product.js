const Joi = require("joi");
const mongoose = require("mongoose");

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
      minlength: 5,
      maxlength: 50,
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
  })
);
function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    category: Joi.string().min(5).max(50).required(),
    price: Joi.number().min(5).max(50).required(),
    description: Joi.string().min(5).max(1024).required(),
    shortDescription: Joi.string().min(5).max(1024).required(),

  });
  const result = schema.validate(product);
  return result;
}

exports.Product = Product;
exports.validate = validateProduct;
