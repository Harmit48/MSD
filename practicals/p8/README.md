# Practical 8: Create a backend server using Express.js implementing routing, middleware and request handling

## Category
Backend Architecture / Middleware Systems

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to master the Middleware Architecture of Express.js: 
        implementing custom Application-level Middleware (logger, execution timer), 
        Authentication Guard Middleware (checking API keys or Bearer headers), 
        Rate-Limiting / Request Sanitization, and Global Centralized Error Handling Middleware.
      
      Core Theoretical Concepts:
      
        Middleware Function Signature: Middleware functions have access to the request object (req), response object (res), and the next middleware function in the application's request-response cycle (next).
        Sequential Chaining: Middleware executes in the precise order declared with app.use(). Invoking next() passes control to the subsequent middleware; omitting it terminates the cycle or hangs the connection.
        Categories of Express Middleware:
          
            Application-Level: Bound to the app instance; executes on every incoming HTTP call (e.g. Logging, CORS).
            Router-Level: Bound to a specific instance of express.Router().
            Built-In: express.json(), express.urlencoded(), express.static().
            Error-Handling Middleware: Distinctly declared with four arguments: (err, req, res, next). Intercepts all runtime exceptions without crashing the Node process.

## 2. Commands to Setup & Run
```bash
# 1. Create Directory & Initialize
# Initializes project.
mkdir practical-08-middleware && cd practical-08-middleware && npm init -y

# 2. Install Middleware Packages
# Installs security headers (helmet) and CORS.
npm install express morgan helmet cors

# 3. Run Server
# Starts Express server with active middleware chain.
node server.js

```

## 3. Directory Structure
```
practical-08-middleware/
├── package.json
├── server.js                    # Mounts middleware in sequential pipeline
├── middleware/
│   ├── requestLogger.js         # Application-level timestamp & execution latency logger
│   ├── apiKeyAuth.js            # Auth guard checking x-api-key header
│   └── errorHandler.js          # Centralized error handler interceptor (err, req, res, next)
└── routes/
    ├── publicRoutes.js          # Open routes (no authentication required)
    └── protectedRoutes.js       # Secured routes guarded by apiKeyAuth middleware
```

## 4. Source Code Files
See the source files inside this directory.
