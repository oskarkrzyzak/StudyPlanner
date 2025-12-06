// server.js

const express = require("express");
const app = express();

app.use(express.json());

// Temporary in-memory "database"
let tasks = [];
let currentId = 1;

// Root – dla testów i sprawdzenia, czy backend działa
app.get("/", (req, res) => {
  res.send("StudyPlanner MVP is running 🎉");
});

// Opcjonalny endpoint healthcheck – przydatny dla Cloud Run
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "StudyPlanner backend healthy" });
});

// CREATE task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: currentId++,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// READ all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const before = tasks.length;

  tasks = tasks.filter((t) => t.id !== id);

  if (before === tasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted" });
});

// EXPORT app for Jest tests
module.exports = app;

// Start server ONLY when running directly (node server.js / w Dockerze / na Cloud Run)
const PORT = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}