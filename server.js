const express = require("express");
const app = express();
app.use(express.json());

app.post("/register", (req, res) => {
  res.json({ message: "User registered (placeholder)" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
