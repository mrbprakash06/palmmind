function admin(req, res, next) {
  const user = req.session.user;

  // User is not admin
  if (!user || !user.admin) {
    res.status(403);
    res.json({ message: "Unauthorized" });
    return;
  }

  next();
}

module.exports = admin;
