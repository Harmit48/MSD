const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5010;

app.use(cors());
app.use(express.json());

let tasks = [
  { _id: "1", title: "Build Functional Components in React 18", priority: "High", status: "Completed" },
  { _id: "2", title: "Setup Express.js Routing & Middleware", priority: "Medium", status: "Completed" },
  { _id: "3", title: "Deploy Mini Project DMS on Cloud", priority: "High", status: "Pending" }
];

app.get('/api/tasks', (req, res) => res.json({ success: true, tasks }));
app.post('/api/tasks', (req, res) => {
  const newTask = { _id: String(Date.now()), title: req.body.title, priority: req.body.priority || "Medium", status: "Pending" };
  tasks.unshift(newTask);
  res.status(201).json({ success: true, task: newTask });
});
app.put('/api/tasks/:id', (req, res) => {
  tasks = tasks.map(t => t._id === req.params.id ? { ...t, ...req.body } : t);
  res.json({ success: true, task: tasks.find(t => t._id === req.params.id) });
});
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t._id !== req.params.id);
  res.json({ success: true, message: "Task deleted" });
});

app.listen(PORT, () => console.log("Practical 10 Backend running on port " + PORT));
