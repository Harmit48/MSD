# Practical 6: Build RESTful APIs for Student Records Management using Express.js and Postman testing

## Category
Backend Development / REST Architecture

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to architect production-ready RESTful APIs 
        for managing university Student Academic Records using Express.js. The API incorporates 
        Query Filtering (by department & semester), Pagination (limit, page), 
        Sorting (by GPA), request validation middleware, and automated test assertion verification in Postman.
      
      Core Theoretical Concepts:
      
        REST (Representational State Transfer): An architectural style enforcing statelessness, uniform interfaces, resource-based URIs, and standard HTTP verbs.
        Query Parameters for Filtering & Pagination: Real-world APIs cannot return thousands of records at once. Query parameters (e.g. ?dept=CSE&page=1&limit=10&sortBy=gpa) empower clients to request sliced and sorted datasets efficiently.
        Input Validation Middleware: Intercepting bad client payloads before controller execution prevents dirty records and potential server crashes.
        Postman Automated Testing: Writing JavaScript test scripts inside Postman's "Tests" tab:
          pm.test("Status code is 200", () => pm.response.to.have.status(200));
pm.test("Response contains pagination metadata", () => {
  const json = pm.response.json();
  pm.expect(json).to.have.property('page');
  pm.expect(json.data).to.be.an('array');
});

## 2. Commands to Setup & Run
```bash
# 1. Initialize Project & Install Packages
# Sets up Express and development hot-reloader nodemon.
mkdir practical-06-student-api && cd practical-06-student-api && npm init -y && npm install express dotenv nodemon

# 2. Launch Development Server
# Starts server with automatic restart on code modifications.
npx nodemon server.js

# 3. Import Postman Collection
# Import the JSON collection into Postman and execute the automated test runner.
postman/Student_Management_API.postman_collection.json

```

## 3. Directory Structure
```
practical-06-student-api/
├── package.json
├── server.js                    # Server entry point with error handling middleware
├── middleware/
│   └── studentValidator.js      # Validates rollNo format, email syntax and GPA bounds
├── controllers/
│   └── studentController.js     # Logic for filtering, pagination, sorting and CRUD
├── routes/
│   └── studentRoutes.js         # REST route mappings
└── postman/
    └── Student_API_Collection.json # Postman automated test collection
```

## 4. Source Code Files
See the source files inside this directory.
