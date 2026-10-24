# Practical 9: Create a file upload module using Multer and store file metadata in MongoDB

## Category
Full-Stack Media Handling / Multer & NoSQL

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to implement a secure, high-throughput file upload service in Express.js 
        using Multer middleware, handling multipart/form-data payloads, enforcing disk storage 
        with timestamp-sanitized filenames, validating MIME types (PDF, PNG, JPEG) and size limits (5 MB), 
        and persisting structured file metadata in MongoDB.
      
      Core Theoretical Concepts:
      
        Multipart Form Data Handling: Standard JSON body parsers (express.json()) cannot decode binary streams. Multer intercepts multipart boundaries, streams incoming binary buffers directly to disk or memory, and populates req.file (single) or req.files (array).
        Disk Storage Engine: Using multer.diskStorage() gives complete control over directory destination (destination callback) and unique file naming (filename callback) to prevent file collisions.
        Security & Validation Filters:
          
            MIME Whitelist: Verifying file.mimetype prevents malicious executable scripts (.exe, .sh, .php) from being uploaded.
            Size Limits: Hard caps (e.g. 5 * 1024 * 1024 bytes) prevent Denial-of-Service (DoS) attacks via memory exhaustion.
          
        
        Metadata Persistence: Storing binary files on disk while persisting searchable metadata (original name, stored name, MIME type, size in bytes, upload timestamp, uploader ID) in MongoDB ensures optimal database performance.

## 2. Commands to Setup & Run
```bash
# 1. Create Project & Install Dependencies
# Installs Multer for multipart form handling and Mongoose for metadata storage.
mkdir practical-09-multer-upload && cd practical-09-multer-upload && npm init -y && npm install express multer mongoose dotenv cors

# 2. Create Uploads Directory
# Creates destination storage folder and public directory for frontend client.
mkdir uploads public

# 3. Run Server
# Starts server on http://localhost:5000.
node server.js

```

## 3. Directory Structure
```
practical-09-multer-upload/
├── package.json
├── server.js                    # Server bootstrap, static file serving and route mounting
├── config/
│   ├── db.js                    # Mongoose MongoDB connection
│   └── multerConfig.js          # Multer diskStorage, fileFilter and size limits
├── models/
│   └── FileMetadata.js          # Schema for storing file attributes in MongoDB
├── routes/
│   └── uploadRoutes.js          # Endpoints for single, multiple uploads & file listings
├── uploads/                     # Physical file destination directory on disk
└── public/
    └── index.html               # Interactive HTML5 upload form with drag-and-drop preview
```

## 4. Source Code Files
See the source files inside this directory.
