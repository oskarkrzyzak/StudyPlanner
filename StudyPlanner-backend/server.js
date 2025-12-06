const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory DB
let tasks = [];
let currentId = 1;

// Root endpoint
app.get("/", (req, res) => {
  res.send("StudyPlanner MVP is running 🎉");
});

// --- CRUD ENDPOINTY ---

// Create task
app.post("/tasks", (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = {
    id: currentId++,
    title,
    description,
    dueDate,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, description, dueDate, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === before) return res.status(404).json({ error: "Task not found" });
  res.json({ message: "Task deleted" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

module.exports = app;