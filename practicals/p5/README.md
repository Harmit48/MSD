# Practical 5: Create a backend server using Express.js implementing routing and CRUD operation

## Category
Backend Development / Express.js

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to build an asynchronous backend server using Express.js, 
        implementing modular RESTful Routing, processing incoming JSON request payloads via 
        express.json(), and executing full CRUD (Create, Read, Update, Delete) operations 
        with standard HTTP status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Internal Error).
      
      Core Theoretical Concepts:
      
        Express.js Framework: A minimalist, fast, unopinionated web framework for Node.js that simplifies handling HTTP requests, routing, middleware pipelines, and view rendering.
        RESTful Routing Conventions:
          
            GET /api/items: Read all resources (Returns 200 OK).
            GET /api/items/:id: Read single resource by unique identifier (200 OK or 404 Not Found).
            POST /api/items: Create a new resource from request body (Returns 201 Created).
            PUT /api/items/:id: Update existing resource completely or idempotently (200 OK or 404).
            DELETE /api/items/:id: Remove resource permanently (200 OK or 204 No Content).
          
        
        Request & Response Architecture: The req object encapsulates query params (req.query), route parameters (req.params), and parsed body (req.body). The res object dispatches status codes and JSON payloads (res.status(200).json(...)).

## 2. Commands to Setup & Run
```bash
# 1. Create Directory & Initialize Node.js
# Creates project directory and generates default package.json.
mkdir practical-05-express-crud && cd practical-05-express-crud && npm init -y

# 2. Install Core Dependencies
# Installs Express framework, CORS headers enabler, and logging middleware.
npm install express cors body-parser morgan

# 3. Run Server with Node
# Launches Express server listening on http://localhost:5000.
node server.js

# 4. Test with cURL or Postman
# Sends an HTTP GET request to verify server routing.
curl -X GET http://localhost:5000/api/items

```

## 3. Directory Structure
```
practical-05-express-crud/
├── package.json                 # Node dependencies and execution scripts
├── server.js                    # Main server initialization, middleware stack and port listener
├── routes/
│   └── itemRoutes.js            # Modular Express Router mapping endpoints to controllers
├── controllers/
│   └── itemController.js        # Controller business logic for CRUD operations
└── data/
    └── items.json               # In-memory/JSON persistent datastore
```

## 4. Source Code Files
See the source files inside this directory.
