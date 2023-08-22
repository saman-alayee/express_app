const Joi = require("joi");
const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
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
    createdBy: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },  { timestamps: true })
);
function validateCart(cart) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    category: Joi.string().min(5).max(50).required(),
    price: Joi.number().required(),
    description: Joi.string().min(5).max(1024).required(),
    shortDescription: Joi.string().min(5).max(1024).required(),
    thumbnailImage: Joi.string().min(5).max(2048).required(),
    quantity: Joi.number().required(),
  });
  const result = schema.validate(cart);
  return result;
}

exports.Cart = Cart;
exports.validate = validateCart;
