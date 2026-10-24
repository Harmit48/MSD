# Practical 12: Develop a Real-Time Chat Application using Socket.IO, React and Node.js

## Category
Real-Time Systems / WebSockets & Socket.IO

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to build a low-latency, bidirectional, event-driven 
        Real-Time Chat Application using Socket.IO on a Node.js/Express backend 
        and a React.js client. The system implements channel/room partitioning (socket.join), 
        real-time message broadcasting, dynamic typing indicators, and connection lifecycle management.
      
      Core Theoretical Concepts:
      
        WebSockets vs HTTP Request-Response: Traditional HTTP relies on client-initiated half-duplex polling. WebSockets establish a persistent, full-duplex TCP connection, allowing the server to push instantaneous data packets to connected clients with minimal overhead (2-byte framing).
        Socket.IO Architecture: Built on top of Engine.IO, Socket.IO provides automated fallback to HTTP long-polling if WebSockets are blocked by proxies, automatic reconnection handling, and room abstraction.
        Core Socket Events:
          
            io.on('connection', socket => ...): Triggered when a new client connects.
            socket.join(roomName): Partitions clients into isolated communication channels.
            socket.to(room).emit('receive_msg', payload): Broadcasts messages to all clients in a room excluding the sender.
            socket.on('typing', data): Transmits debounced keystroke alerts to peers.

## 2. Commands to Setup & Run
```bash
# 1. Setup Server with Socket.IO
# Installs Express and Socket.IO server engine.
mkdir -p chat-app/server chat-app/client && cd chat-app/server && npm init -y && npm install express http socket.io cors

# 2. Setup React Client
# Installs Socket.IO client SDK in Vite React app.
cd ../client && npm create vite@latest . -- --template react && npm install socket.io-client

# 3. Run Application
# Starts real-time WebSocket server and client frontend.
node server.js (on server) & npm run dev (on client)

```

## 3. Directory Structure
```
practical-12-socketio-chat/
├── server/
│   ├── package.json
│   └── server.js                # HTTP server wrapping Express with Socket.IO instance
└── client/
    ├── package.json
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx              # Socket connection, room selection & message state
    │   ├── index.css            # Chat bubbles, typing indicators and responsive layout
    │   └── components/
    │       ├── JoinRoom.jsx     # Room ID and username selection screen
    │       └── ChatBox.jsx      # Message feed, input box, send button and typing indicator
```

## 4. Source Code Files
See the source files inside this directory.
