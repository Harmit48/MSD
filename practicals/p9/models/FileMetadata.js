const mongoose = require('mongoose');

const fileMetadataSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    systemFileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    storagePath: { type: String, required: true },
    downloadUrl: { type: String, required: true },
    uploader: { type: String, default: "Anonymous Student" },
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('FileMetadata', fileMetadataSchema);