// server.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("StudyPlanner MVP is running 🎉");
});

// Export ONLY the Express app for tests
module.exports = app;