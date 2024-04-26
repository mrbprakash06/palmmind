function guest(req, res, next) {
  const user = req.session.user;

  // User is logged in
  if (user) return res.redirect("/dashboard");

  next();
}

module.exports = guest;
