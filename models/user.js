const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    thumbnailImage: {
      type: String,
      default:null,
      required: false,
      maxlength: 2048,
    },
    bio:{
      type:String,
      required:false,
      maxlength:100,

    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
      unique: true,
    },
    isAdmin: Boolean,
   
  },
  { timestamps: true }
);
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    thumbnailImage: Joi.string().min(5).max(2048), 
    bio: Joi.string().max(100),

  });
  const result = schema.validate(user);
  console.log(result);
  return result;
}

exports.User = User;
exports.validate = validateUser;
