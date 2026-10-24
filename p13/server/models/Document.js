const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      required: true,
      enum: ["Engineering", "Legal & Compliance", "Finance", "Human Resources", "Executive"]
    },
    tags: [String],
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    version: { type: Number, default: 1 },
    accessLevel: {
      type: String,
      enum: ["Public", "Internal", "Restricted"],
      default: "Internal"
    },
    uploadedBy: {
      type: String,
      default: "System User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);