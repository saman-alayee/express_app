const { validate } = require("@hapi/joi/lib/types/alternatives");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Post
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body.name);
  if (error) return res.status(400).send(error);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});
// Put
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body.name);
  if (error) return res.status(400).send(error);
  const genre = await Genre.findByAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) res.status(404).send("wrong route");
  genre.name = req.body.name;
  res.send(genre);
});
// Delete
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByAndRemove(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) res.status(404).send("wrong route");
  res.send(genre);
});
// Get
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) res.status(404).send("wrong route");
  res.send(genre)
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate({ name: genre });
  console.log(result);
  return result;
}

module.exports = router;
