const express = require("express");
const SHA256 = require("crypto-js/sha256");

const credentialsSchema = require("../../schemas/credentails");
const userSchema = require("../../schemas/user");

const User = require("../../models/User");

const guest = require("../../middlewares/guest");
const authenticated = require("../../middlewares/authenticated");
const { generateTokenWithTime, verifyToken } = require("../../lib/crypto");
const { sendEmail } = require("../../email");
const changePasswordSchema = require("../../schemas/changePassword");

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

router.get("/forgot-password", guest, (req, res) => {
  const flash = req.session.flash;

  delete req.session.flash;

  const modal = {};
  if (flash) modal.flash = flash;

  res.render("forgot-password", modal);
});

router.post("/forgot-password", guest, async (req, res) => {
  const body = req.body;
  const email = body.email;

  if (!email) {
    req.session.flash = {
      type: "error",
      message: "Bad Request",
    };

    return res.redirect("/auth/forgot-password");
  }

  const user = await User.findOne({ email }, { password: 0 });

  if (!user) {
    req.session.flash = {
      type: "error",
      message: "User doesnot exist",
    };

    return res.redirect("/auth/forgot-password");
  }

  try {
    const token = await generateTokenWithTime({ id: user._id }, "5m");

    const url = process.env.BASE_URL + "/auth/change-password/" + token;
    await sendEmail("Reset Password", url, user.email);
  } catch (error) {
    req.session.flash = {
      type: "error",
      message: "Something went wrong.",
    };

    return res.redirect("/auth/forgot-password");
  }

  req.session.flash = {
    type: "info",
    message: "Password reset email sent.",
  };

  return res.redirect("/auth/login");
});

router.get("/change-password/:token", guest, (req, res) => {
  const flash = req.session.flash;

  delete req.session.flash;

  const token = req.params.token;
  const modal = { token };
  if (flash) modal.flash = flash;

  res.render("change-password", modal);
});

router.post("/change-password/:token", guest, async (req, res) => {
  const body = req.body;
  const token = req.params.token;

  let credentials;

  try {
    credentials = await changePasswordSchema.validateAsync(body);
  } catch (error) {
    req.session.flash = {
      type: "error",
      message: "Bad Request! Please check your inputs.",
    };

    return res.redirect("/auth/change-password/" + token);
  }

  try {
    const payload = await verifyToken(token);
    const hashedPassword = SHA256(credentials.password);

    await User.updateOne(
      { _id: payload.id },
      { $set: { password: hashedPassword.toString() } }
    );
  } catch (error) {
    req.session.flash = {
      type: "error",
      message: "Something went wrong.",
    };

    return res.redirect("/auth/change-password/" + token);
  }

  req.session.flash = {
    type: "info",
    message: "Password changed successfully. Please login",
  };

  return res.redirect("/auth/login");
});

module.exports = router;
