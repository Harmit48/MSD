const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5013;

app.use(cors({ origin: '*' }));
app.use(express.json());

// In-memory initial documents
let documents = [
  {
    _id: "doc_101",
    title: "FY2026-Financial-Audit-Report.pdf",
    category: "Finance",
    accessLevel: "Restricted",
    size: "4.8 MB",
    uploadedBy: "Chief Financial Officer",
    updatedAt: "2026-10-23",
    version: 2
  },
  {
    _id: "doc_102",
    title: "Enterprise-Architecture-Guidelines.docx",
    category: "Engineering",
    accessLevel: "Internal",
    size: "1.2 MB",
    uploadedBy: "Lead Cloud Architect",
    updatedAt: "2026-10-22",
    version: 1
  },
  {
    _id: "doc_103",
    title: "Employee-NDA-Agreement-Template.pdf",
    category: "Legal & Compliance",
    accessLevel: "Internal",
    size: "820 KB",
    uploadedBy: "Legal Counsel",
    updatedAt: "2026-10-20",
    version: 3
  }
];

let auditLogs = [
  {
    action: "UPLOAD",
    documentTitle: "FY2026-Financial-Audit-Report.pdf",
    performedBy: "Chief Financial Officer",
    role: "SuperAdmin",
    time: "2026-10-23 11:20:00",
    ip: "192.168.1.10"
  },
  {
    action: "DOWNLOAD",
    documentTitle: "Enterprise-Architecture-Guidelines.docx",
    performedBy: "Lead Cloud Architect",
    role: "DepartmentManager",
    time: "2026-10-23 11:28:15",
    ip: "192.168.1.42"
  },
  {
    action: "VIEW",
    documentTitle: "Employee-NDA-Agreement-Template.pdf",
    performedBy: "HR Manager",
    role: "Staff",
    time: "2026-10-23 11:35:40",
    ip: "192.168.1.15"
  }
];

// GET: Retrieve documents with filter & search
app.get('/api/documents', (req, res) => {
  const { category, search } = req.query;
  let results = [...documents];

  if (category && category !== 'All') {
    results = results.filter(d => d.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(d => d.title.toLowerCase().includes(q));
  }

  res.json({ success: true, count: results.length, data: results });
});

// POST: Add / Upload Document
app.post('/api/documents', (req, res) => {
  const { title, category, accessLevel, uploadedBy } = req.body;
  if (!title) return res.status(400).json({ success: false, message: "Title is required" });

  const newDoc = {
    _id: "doc_" + Date.now(),
    title,
    category: category || "Engineering",
    accessLevel: accessLevel || "Internal",
    size: "1.5 MB",
    uploadedBy: uploadedBy || "Harmit Suthar",
    updatedAt: new Date().toISOString().split('T')[0],
    version: 1
  };

  documents.unshift(newDoc);

  // Add audit log
  auditLogs.unshift({
    action: "UPLOAD",
    documentTitle: newDoc.title,
    performedBy: newDoc.uploadedBy,
    role: "SuperAdmin",
    time: new Date().toISOString().replace('T', ' ').substring(0, 19),
    ip: req.ip || "127.0.0.1"
  });

  res.status(201).json({ success: true, document: newDoc });
});

// DELETE: Remove document
app.delete('/api/documents/:id', (req, res) => {
  const doc = documents.find(d => d._id === req.params.id);
  if (!doc) return res.status(404).json({ success: false, message: "Document not found" });

  documents = documents.filter(d => d._id !== req.params.id);

  auditLogs.unshift({
    action: "DELETE",
    documentTitle: doc.title,
    performedBy: "SuperAdmin",
    role: "SuperAdmin",
    time: new Date().toISOString().replace('T', ' ').substring(0, 19),
    ip: req.ip || "127.0.0.1"
  });

  res.json({ success: true, message: "Document deleted", deleted: doc });
});

// GET: Audit Logs
app.get('/api/audit-logs', (req, res) => {
  res.json({ success: true, count: auditLogs.length, data: auditLogs });
});

app.listen(PORT, () => {
  console.log("=================================================");
  console.log(`🛡️ DocuVault DMS Backend running on http://localhost:${PORT}`);
  console.log(`📂 API Endpoints:`);
  console.log(`   - GET/POST  /api/documents`);
  console.log(`   - DELETE    /api/documents/:id`);
  console.log(`   - GET       /api/audit-logs`);
  console.log("=================================================");
});
