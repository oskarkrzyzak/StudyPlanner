module.exports = function loginRoute(app) {
  app.post("/login", (req, res) => {
    res.json({ message: "User login (placeholder)" });
  });
};
