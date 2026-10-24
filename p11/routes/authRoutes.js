const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { username, role } = req.body;
  const token = jwt.sign({ username: username || "Harmit Suthar", role: role || "admin" }, "msd_secret", { expiresIn: "1h" });
  res.json({ success: true, token, role: role || "admin" });
});

module.exports = router;