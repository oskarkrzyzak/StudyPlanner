module.exports = function logoutRoute(app) {
  app.post("/logout", (req, res) => {
    res.json({ message: "User logout (placeholder)" });
  });
};
