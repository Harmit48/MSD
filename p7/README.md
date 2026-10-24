# Practical 7: Develop an Employee Management API integrating Express.js with MongoDB Atlas

## Category
Full-Stack Data Persistence / MongoDB

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to connect an Express.js backend with MongoDB Atlas 
        (cloud document database) using the Mongoose ODM (Object Document Mapper), establish 
        secure connection string handling via environment variables (dotenv), define strict Mongoose schemas 
        with automatic timestamps, and perform asynchronous CRUD operations.
      
      Core Theoretical Concepts:
      
        MongoDB Atlas: A fully-managed cloud NoSQL database service providing scalable, distributed document storage in flexible BSON (Binary JSON) format.
        Mongoose ODM: A modeling library providing schema validation, type casting, middleware hooks, and an expressive query API (e.g. Employee.find(), Employee.findByIdAndUpdate()).
        Connection Resilience: Implementing connection pooling, retry logic, and error event listeners on mongoose.connection.
        Mongoose Schema Validation: Enforcing required constraints, email regex validation, default values (e.g. isActive: true), and index uniqueness (unique: true on empId and email).

## 2. Commands to Setup & Run
```bash
# 1. Create Directory & Initialize
# Initializes Node project directory.
mkdir practical-07-mongodb-atlas && cd practical-07-mongodb-atlas && npm init -y

# 2. Install Mongoose & Dependencies
# Installs Mongoose ODM and dotenv for environment variable isolation.
npm install express mongoose dotenv cors

# 3. Configure Environment Variables (.env)
# Creates .env file with MongoDB Atlas connection string.
echo MONGO_URI=mongodb+srv://user:pass@cluster0.mongodb.net/msd_db > .env

# 4. Run Server
# Connects to Atlas cluster and opens HTTP listener.
node server.js

```

## 3. Directory Structure
```
practical-07-mongodb-atlas/
├── .env                         # Secret environment variables (MONGO_URI, PORT)
├── .env.example                 # Template for repository documentation
├── package.json
├── server.js                    # Server bootstrap and DB connection hook
├── config/
│   └── db.js                    # Mongoose connection logic with async try/catch
├── models/
│   └── Employee.js              # Mongoose schema with data types, indexes and validators
├── controllers/
│   └── employeeController.js    # Async database handlers with Mongoose queries
└── routes/
    └── employeeRoutes.js        # REST endpoint routes
```

## 4. Source Code Files
See the source files inside this directory.
