# Practical 10: Develop a complete MERN application integrating React Frontend, Express Backend and MongoDB Database

## Category
Full-Stack Web Development / MERN Architecture

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to construct an end-to-end Full-Stack MERN (MongoDB, Express.js, 
        React, Node.js) application: implementing a unified Task & Project Management platform where the 
        React frontend communicates with Express REST endpoints via Axios, Express interacts with MongoDB via Mongoose ODM, 
        CORS cross-origin policies are managed, and real-time UI synchronization occurs on state changes.
      
      Core Theoretical Concepts:
      
        Full-Stack MERN Architecture:
          
            React Client (Presentation Tier): Renders responsive UI, captures user inputs, manages local component state, and triggers asynchronous HTTP requests.
            Express & Node.js (Application Tier): Provides business logic, processes REST requests, applies middleware, and communicates with the database layer.
            MongoDB (Data Tier): Scalable document database storing JSON-like records with Mongoose schemas.
          
        
        Cross-Origin Resource Sharing (CORS): When frontend (http://localhost:5173) requests data from backend (http://localhost:5000), browser enforces CORS. The Express server configures cors() to explicitly authorize cross-origin communication.
        Optimistic UI Updates: Updating the React client UI immediately when a user acts, rolling back only if the server returns an HTTP error code.

## 2. Commands to Setup & Run
```bash
# 1. Setup Backend
# Initializes backend Express server.
mkdir -p mern-app/backend && cd mern-app/backend && npm init -y && npm install express mongoose cors dotenv

# 2. Setup Frontend with Vite
# Initializes React client with Axios HTTP client.
cd ../ && npm create vite@latest frontend -- --template react && cd frontend && npm install axios lucide-react

# 3. Run Full-Stack System
# Runs backend on port 5000 and frontend on port 5173.
npm run dev

```

## 3. Directory Structure
```
practical-10-fullstack-mern/
├── backend/
│   ├── package.json
│   ├── server.js                # Express app with CORS & MongoDB connection
│   ├── models/Task.js           # Mongoose Task Schema (title, status, priority, dueDate)
│   ├── controllers/taskCtrl.js  # CRUD controllers querying MongoDB
│   └── routes/taskRoutes.js     # RESTful endpoints (/api/tasks)
└── frontend/
    ├── package.json
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx              # React state synced with backend API
    │   ├── api/taskApi.js       # Axios base instance & API service methods
    │   ├── index.css            # Full-stack task management styling
    │   └── components/
    │       ├── TaskForm.jsx     # Task creation modal with controlled inputs
    │       └── TaskList.jsx     # Interactive cards with status toggle & delete
```

## 4. Source Code Files
See the source files inside this directory.
