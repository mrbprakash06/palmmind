const express = require("express");
const SHA256 = require("crypto-js/sha256");

const credentialsSchema = require("../../schemas/credentails");
const userSchema = require("../../schemas/user");

const User = require("../../models/User");

const guest = require("../../middlewares/guest");
const authenticated = require("../../middlewares/authenticated");

const router = express.Router();

router.get("/login", guest, (req, res) => {
  const flash = req.session.flash;

  delete req.session.flash;

  const modal = {};
  if (flash) modal.flash = flash;

  res.render("login", modal);
});

router.post("/login", guest, async (req, res) => {
  const body = req.body;
  let credentials;

  try {
    credentials = await credentialsSchema.validateAsync(body);
  } catch (error) {
    req.session.flash = {
      type: "error",
      message: "Bad credentails",
    };

    return res.redirect("/auth/login");
  }

  // Check if user exists
  credentials.password = SHA256(credentials.password);

  const user = await User.findOne(credentials, { password: 0 });
  if (!user) {
    req.session.flash = {
      type: "error",
      message: "Bad credentials",
    };

    return res.redirect("/auth/login");
  }

  req.session.user = user;

  res.redirect("/dashboard");
});

router.get("/register", guest, (req, res) => {
  const flash = req.session.flash;

  delete req.session.flash;

  const modal = {};
  if (flash) modal.flash = flash;

  res.render("register", modal);
});

router.post("/register", guest, async (req, res) => {
  const body = req.body;

  let newUser;

  try {
    newUser = await userSchema.validateAsync(body);
  } catch (error) {
    req.session.flash = {
      type: "error",
      message: "Bad Request! Please check your inputs.",
    };

    return res.redirect("/auth/register");
  }

  // If valid then check to see if the user exists
  const user = await User.findOne({ username: newUser.username });
  if (user) {
    req.session.flash = {
      type: "error",
      message: "User already exists. Please login",
    };

    return res.redirect("/auth/login");
  }

  // Encrypt the password
  newUser.password = SHA256(newUser.password).toString();

  newUser = new User(newUser);
  const savedUser = await newUser.save();

  req.session.user = savedUser;

  res.redirect("/dashboard");
});

router.post("/logout", authenticated, (req, res) => {
  delete req.session.user;
  res.redirect("/auth/login");
});

module.exports = router;
