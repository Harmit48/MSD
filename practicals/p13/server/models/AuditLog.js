const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["UPLOAD", "DOWNLOAD", "VIEW", "UPDATE", "DELETE"]
    },
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
    documentTitle: { type: String, required: true },
    performedBy: { type: String, required: true },
    userRole: { type: String, required: true },
    ipAddress: { type: String, default: "127.0.0.1" },
    status: { type: String, enum: ["SUCCESS", "FAILED"], default: "SUCCESS" },
    details: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);