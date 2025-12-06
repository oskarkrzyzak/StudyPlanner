const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary tasks memory DB
let tasks = [];
let currentId = 1;

// Root endpoint
app.get("/", (req, res) => {
  res.send("StudyPlanner MVP is running 🎉");
});

// HEALTH CHECK ENDPOINT — Cloud Run needs this!
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// CREATE task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = { id: currentId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// READ tasks
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
  const beforeLen = tasks.length;

  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length === beforeLen)
    return res.status(404).json({ error: "Task not found" });

  res.json({ message: "Task deleted" });
});

// Start server ONLY when not in tests
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`StudyPlanner backend running on port ${PORT}`);
  });
}

module.exports = app;