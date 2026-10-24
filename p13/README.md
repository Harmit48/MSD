# Practical 13: Mini Project: Design and develop a full-stack industry-oriented MERN application (Document Management System)

## Category
Capstone Mini Project / Enterprise Full-Stack MERN

## 1. Objective & Aim
1. Aim & Project Specification
      
        The objective of this industry-grade Capstone Mini Project is to design, architect, and develop a production-ready 
        Enterprise Document Management System (DocuVault DMS) leveraging the complete MERN stack.
      
      Core Functional Modules & Enterprise Architecture:
      
        Role-Based Access Control (RBAC): Three user tiers: SuperAdmin (full system access, audit viewer), DepartmentManager (upload, approve, categorize), and Staff (view and download department docs).
        Secure Multi-Format File Management (Multer): High-throughput uploads for PDF, DOCX, XLSX, and PNG files with unique hashing, file size limits (25MB), and sanitization.
        Document Metadata & Version Control: Stores document title, department category (Finance, Legal, HR, Engineering), access level, active version number, and file storage path in MongoDB.
        Full-Text Search & Multi-Faceted Filtering: Instant search by keywords, category dropdown, date range, and tags.
        Tamper-Evident Audit Logging: Every interaction (UPLOAD, DOWNLOAD, PREVIEW, DELETE) automatically generates an immutable audit record capturing user identity, IP address, and timestamp.
        Modern Responsive React Dashboard: Glassmorphism dashboard featuring KPI statistics cards, upload modal, document table with status badges, and interactive audit log viewer.

## 2. Commands to Setup & Run
```bash
# 1. Clone / Create Project Workspace
# Initializes root workspace for the Document Management System.
mkdir docuvault-dms && cd docuvault-dms

# 2. Install Server Dependencies
# Installs backend engine with security, database, and file streaming.
mkdir server && cd server && npm init -y && npm install express mongoose multer bcryptjs jsonwebtoken cors dotenv

# 3. Install Client Dependencies
# Installs frontend client with modern Lucide icons and Axios.
cd ../ && npm create vite@latest client -- --template react && cd client && npm install axios lucide-react

# 4. Run System Concurrently
# Launches full-stack platform: Express Backend (port 5013) and React UI (port 5173).
npm run dev

```

## 3. Directory Structure
```
docuvault-dms/
├── server/
│   ├── package.json
│   ├── server.js                # Server entry, static assets, error handlers
│   ├── .env.example             # Configuration template (MONGO_URI, JWT_SECRET, PORT)
│   ├── config/
│   │   ├── db.js                # MongoDB Atlas cluster connection
│   │   └── multer.js            # Multi-format enterprise storage configuration
│   ├── models/
│   │   ├── User.js              # User authentication schema with roles
│   │   ├── Document.js          # Document metadata, versioning & category schema
│   │   └── AuditLog.js          # Security audit trail logging schema
│   ├── middleware/
│   │   ├── auth.js              # JWT token verification
│   │   └── auditLogger.js       # Auto-intercepts operations to create audit logs
│   ├── controllers/
│   │   ├── authController.js    # Register & Login
│   │   ├── docController.js     # Upload, Search, Download & Delete controllers
│   │   └── auditController.js   # Audit logs retrieval for Admins
│   └── routes/
│       ├── authRoutes.js
│       ├── docRoutes.js
│       └── auditRoutes.js
└── client/
    ├── package.json
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx              # Main Dashboard view with RBAC state
    │   ├── index.css            # Enterprise glassmorphism styling
    │   ├── components/
    │   │   ├── Navbar.jsx       # Header with user profile & role badge
    │   │   ├── StatsCards.jsx   # KPI summary cards (Total Docs, Storage, Depts)
    │   │   ├── UploadModal.jsx  # Drag-and-drop file upload dialog
    │   │   ├── DocumentTable.jsx# Searchable, filterable documents records table
    │   │   └── AuditLogModal.jsx# Security audit trail viewer modal
```

## 4. Source Code Files
See the source files inside this directory.
