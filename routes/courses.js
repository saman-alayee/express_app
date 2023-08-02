const express = require("express");
const router = express.Router();

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
  ];

router.get("", (req, res) => {
  res.send(courses);
});

app.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("wrong  route");
  res.send(course);
});

router.post("/:id", (req, res) => {
  const { error } = validateCourse(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("wrong  route");
  const { error } = validateCourse(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const { error } = validateCourse(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  const index = course.indexOf(course);
  course.splice(index, 1);
  ses.push(course);
  res.send(course);
});
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate({ name: course });
  console.log(result);
}

module.exports = router;
