const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5011;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let posts = [
  { id: 1, title: "Microservices Design Patterns in Node.js", content: "Comprehensive architecture guide...", author: "Harmit Suthar", role: "admin" },
  { id: 2, title: "React 18 Performance Optimization Hooks", content: "useMemo, useCallback & transitions...", author: "Priya Nair", role: "author" }
];

app.get('/api/posts', (req, res) => res.json({ success: true, posts }));

app.post('/api/posts', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: "Missing JWT Token" });
  try {
    const decoded = jwt.verify(token, "msd_secret");
    if (decoded.role === 'reader') {
      return res.status(403).json({ success: false, message: "403 Forbidden: Readers cannot publish articles. Only Authors & Admins allowed." });
    }
    const newPost = { id: posts.length + 1, title: req.body.title, content: req.body.content, author: decoded.username, role: decoded.role };
    posts.unshift(newPost);
    res.status(201).json({ success: true, post: newPost });
  } catch(e) {
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
});

app.post('/api/login', (req, res) => {
  const { username, role } = req.body;
  const token = jwt.sign({ username: username || "Harmit Suthar", role: role || "admin" }, "msd_secret", { expiresIn: "2h" });
  res.json({ success: true, token, role, user: username });
});

app.listen(PORT, () => console.log("Practical 11 running on http://localhost:" + PORT));
