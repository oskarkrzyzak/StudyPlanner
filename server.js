const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("StudyPlanner MVP is running 🎉");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;