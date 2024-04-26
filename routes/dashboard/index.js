const express = require("express");
const router = express.Router();

const authenticated = require("../../middlewares/authenticated");

router.get("/", authenticated, (req, res) => {
  res.render("dashboard",{user:  req.session.user});
});

module.exports = router;
