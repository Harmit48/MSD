const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5008;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware: Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log("[" + new Date().toISOString() + "] " + req.method + " " + req.originalUrl + " - " + res.statusCode + " (" + (Date.now() - start) + "ms)");
  });
  next();
});

// Route: Public Status
app.get('/api/public/status', (req, res) => {
  res.json({ success: true, message: "Public Endpoint Accessible", timestamp: new Date() });
});

// Route: Protected with API Key
app.get('/api/secure/profile', (req, res) => {
  const key = req.headers['x-api-key'];
  if (key !== 'MSD_SECURE_TOKEN_2026') {
    return res.status(401).json({ success: false, error: "401 Unauthorized", message: "Missing or invalid 'x-api-key' header. Use 'MSD_SECURE_TOKEN_2026'" });
  }
  res.json({ success: true, message: "Access Granted!", client: "Authorized Student Harmit Suthar", role: "SuperAdmin" });
});

// Route: Error Interceptor
app.get('/api/simulate-error', (req, res, next) => {
  const err = new Error("Simulated Database Connection Crash");
  err.statusCode = 503;
  next(err);
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ success: false, error: err.name || "Error", message: err.message });
});

app.listen(PORT, () => console.log("Practical 08 running on http://localhost:" + PORT));
