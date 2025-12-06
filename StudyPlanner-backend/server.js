const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Use PORT from environment OR default to 3000
const PORT = process.env.PORT || 3000;

// Temporary in-memory "database"
let tasks = [];
let currentId = 1;

// ROUTES

// Create task
app.post("/tasks", (req, res) => {
  const { title, description, dueDate } = req.body;

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

// Edit task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;

  const task = tasks.find((t) => t.id == id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.title = title;
  task.description = description;
  task.dueDate = dueDate;

  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id != id);
  res.json({ message: "Task deleted" });
});

// Mark task as completed
app.patch("/tasks/:id/complete", (req, res) => {
  const { id } = req.params;

  const task = tasks.find((t) => t.id == id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.completed = !task.completed;
  res.json(task);
});

// Start server
app.listen(PORT, () => {
  console.log(`StudyPlanner backend running on port ${PORT}`);
});