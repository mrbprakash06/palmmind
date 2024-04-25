const express = require("express");

const schema = require("../../schemas/user");
const User = require("../../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  // TODO - Can be improved by using pagination
  const users = await User.find();

  res.json(users);
});

router.post("/", async (req, res) => {
  const body = req.body;

  let newUser;

  try {
    newUser = await schema.validateAsync(body);
  } catch (error) {
    res.status(400);
    res.json({ message: "Bad Request" });
    return;
  }

  // If valid then check to see if the user exists
  const user = await User.findOne({ username: newUser.username });
  if (user) {
    res.status(400);
    res.json({ message: "User already exists" });
    return;
  }

  newUser = new User(newUser);
  const savedUser = await newUser.save();

  res.status(201);
  res.json(savedUser);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  // If exists it will be deleted, if not no problem
  await User.deleteOne({ _id: id });

  // Send No Content status
  res.sendStatus(204);
});

module.exports = router;
