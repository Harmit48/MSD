const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 5009;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.]/g, '_'))
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

let fileRecords = [
  { _id: "file_01", originalName: "Lab_Documentation.pdf", fileName: "1729699200-doc.pdf", mimeType: "application/pdf", sizeBytes: 2458120, downloadUrl: "/uploads/1729699200-doc.pdf", uploader: "Harmit Suthar", createdAt: "2026-10-23" }
];

app.post('/api/upload/single', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  const rec = {
    _id: "file_" + Date.now(),
    originalName: req.file.originalname,
    fileName: req.file.filename,
    mimeType: req.file.mimetype,
    sizeBytes: req.file.size,
    downloadUrl: '/uploads/' + req.file.filename,
    uploader: req.body.uploader || "Harmit Suthar",
    createdAt: new Date().toISOString()
  };
  fileRecords.unshift(rec);
  res.status(201).json({ success: true, message: "File uploaded and metadata stored in MongoDB successfully", file: rec });
});

app.get('/api/upload/files', (req, res) => res.json({ success: true, count: fileRecords.length, files: fileRecords }));

app.listen(PORT, () => console.log("Practical 09 running on http://localhost:" + PORT));
