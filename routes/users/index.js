const express = require("express");
const SHA256 = require("crypto-js/sha256");

const User = require("../../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  // TODO - Can be improved by using pagination
  const users = await User.find({}, { password: 0 });

  res.json(users);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  // Check to see if user is admin
  // Admin cannot be deleted
  const user = await User.findOne({ _id: id });
  if (user.admin) {
    res.status(400);
    return res.json({ message: "Admin cannot be deleted" });
  }

  // If exists it will be deleted, if not no problem
  await User.deleteOne({ _id: id });

  // Send No Content status
  res.sendStatus(204);
});

module.exports = router;
