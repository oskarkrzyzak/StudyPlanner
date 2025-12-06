const express = require("express");
const app = express();

app.use(express.json());

// In-memory DB
let tasks = [];
let currentId = 1;

// Root route
app.get("/", (req, res) => {
  res.send("StudyPlanner MVP is running 🎉");
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "StudyPlanner backend is healthy" });
});

// CREATE task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = { id: currentId++, title, completed: false };
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
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== id);

  if (tasks.length === before)
    return res.status(404).json({ error: "Task not found" });

  res.json({ message: "Task deleted" });
});

// Start server only when not testing
const PORT = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;