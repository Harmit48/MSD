const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const FileMetadata = require('../models/FileMetadata');

// POST: Single file upload
router.post('/single', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file was attached to the request." });
    }

    const { uploader, tags } = req.body;

    // Save metadata into MongoDB
    const metadata = await FileMetadata.create({
      originalName: req.file.originalname,
      systemFileName: req.file.filename,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      storagePath: req.file.path,
      downloadUrl: `/uploads/${req.file.filename}`,
      uploader: uploader || "Student",
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    });

    res.status(201).json({
      success: true,
      message: "File uploaded and metadata recorded in MongoDB successfully",
      file: metadata
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Retrieve all uploaded files metadata
router.get('/files', async (req, res) => {
  try {
    const files = await FileMetadata.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: files.length, files });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;