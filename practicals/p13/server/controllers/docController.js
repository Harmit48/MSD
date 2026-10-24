const Document = require('../models/Document');
const AuditLog = require('../models/AuditLog');

// 1. Upload & Register Document
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No document attached." });
    }

    const { title, description, category, tags, accessLevel, uploadedBy, userRole } = req.body;

    const newDoc = await Document.create({
      title,
      description,
      category,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      fileUrl: `/uploads/${req.file.filename}`,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      accessLevel: accessLevel || "Internal",
      uploadedBy: uploadedBy || "Admin"
    });

    // Create Audit Log Entry
    await AuditLog.create({
      action: "UPLOAD",
      documentId: newDoc._id,
      documentTitle: newDoc.title,
      performedBy: uploadedBy || "Admin",
      userRole: userRole || "SuperAdmin",
      ipAddress: req.ip,
      details: `Uploaded version 1 (${(req.file.size / 1024).toFixed(1)} KB)`
    });

    res.status(201).json({
      success: true,
      message: "Document uploaded and audit record registered successfully",
      document: newDoc
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Search & Filter Documents
exports.getDocuments = async (req, res) => {
  try {
    const { category, search, access } = req.query;
    const filter = {};

    if (category && category !== 'All') filter.category = category;
    if (access && access !== 'All') filter.accessLevel = access;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const docs = await Document.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: docs.length, documents: docs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};