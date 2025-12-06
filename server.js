// server.js
const express = require("express");
const app = express();

app.use(express.json());

// Temporary in-memory "database"
let tasks = [];
let currentId = 1;

// Root
app.get("/", (req, res) => {
  res.send("StudyPlanner MVP is running 🎉");
});

// CREATE task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

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
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);

  if (before === tasks.length)
    return res.status(404).json({ error: "Task not found" });

  res.json({ message: "Task deleted" });
});

// EXPORT app for tests (important for CI pipeline)
module.exports = app;

// START server normally
const PORT = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}