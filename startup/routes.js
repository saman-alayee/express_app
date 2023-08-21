var express = require("express");
const customers = require("../routes/customers");
const users = require("../routes/users");
const auth = require("../routes/auth");
const products = require("../routes/products")

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/customers", customers);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/products", products);
 
};
