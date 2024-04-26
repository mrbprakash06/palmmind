function authenticated(req, res, next) {
  const user = req.session.user;

  // User is not logged in
  if (!user) return res.redirect("/auth/login");

  next();
}

module.exports = authenticated;
