# Practical 11: Create a Blog Management System implementing CRUD Operations, Authentication and Role-Based Access Control

## Category
Security & Enterprise Systems / Auth & RBAC

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to architect a secure enterprise Blog Management System 
        featuring Password Hashing with bcryptjs, JSON Web Token (JWT) sessionless authentication, 
        and strict Role-Based Access Control (RBAC) distinguishing permissions across Admin, 
        Author, and Reader user roles.
      
      Core Theoretical Concepts:
      
        Password Hashing (bcrypt): Passwords must never be stored in plaintext. Using bcrypt with a salt work factor (e.g. 10 rounds) generates one-way cryptographic hashes resistant to dictionary and rainbow table attacks.
        JWT (JSON Web Token) Authentication: A digitally signed, compact, URL-safe token comprising Header, Payload (userId, role), and Signature. On successful login, the server signs a token using a private secret. The client transmits it in subsequent requests via the Authorization: Bearer &lt;token&gt; header.
        Role-Based Access Control (RBAC) Matrix:
          
            Reader: Read-only access to published blog articles (GET /api/posts).
            Author: Can create new articles and edit/delete only their own authored articles.
            Admin: Superuser privilege. Can publish, edit, or delete any article on the platform and manage user roles.

## 2. Commands to Setup & Run
```bash
# 1. Create Directory & Install Security Packages
# Installs cryptographic hashing (bcryptjs) and token signer (jsonwebtoken).
mkdir practical-11-blog-rbac && cd practical-11-blog-rbac && npm init -y && npm install express mongoose bcryptjs jsonwebtoken dotenv cors

# 2. Set Environment Variables
# Configures JWT secret for signing and verifying tokens.
echo JWT_SECRET=msd_super_secret_jwt_key_2026 > .env

# 3. Start Server
# Starts authentication and RBAC-guarded blog API.
node server.js

```

## 3. Directory Structure
```
practical-11-blog-rbac/
├── package.json
├── server.js                    # Express server with auth and post route registration
├── config/db.js                 # MongoDB connection
├── models/
│   ├── User.js                  # User schema with pre-save bcrypt hook & roles enum
│   └── Post.js                  # Blog schema with author ObjectId reference
├── middleware/
│   ├── auth.js                  # Verifies JWT token and attaches req.user
│   └── rbac.js                  # Checks required role permissions (Admin vs Author)
└── routes/
    ├── authRoutes.js            # /register and /login endpoints
    └── postRoutes.js            # Role-guarded CRUD routes for blog posts
```

## 4. Source Code Files
See the source files inside this directory.
