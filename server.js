const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("StudyPlanner MVP is running 🎉");
});

// Cloud Run PORT fix:
const PORT = process.env.PORT || 8080;

if (require.main === module) {
  // If server.js is run directly, start listening (production/local run)
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for testing (so supertest can import it)
module.exports = app;
