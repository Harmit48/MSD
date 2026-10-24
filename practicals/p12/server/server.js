const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
  console.log("⚡ User Connected: " + socket.id);

  socket.on('join_room', (data) => {
    socket.join(data.room);
    console.log(`👤 ${data.username || socket.id} joined room: ${data.room}`);
    socket.to(data.room).emit('system_message', {
      text: `${data.username || 'A peer'} joined the channel`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on('send_message', (data) => {
    console.log(`💬 [Room ${data.room}] ${data.author}: ${data.message}`);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('typing', (data) => {
    socket.to(data.room).emit('user_typing', data);
  });

  socket.on('disconnect', () => {
    console.log("❌ User Disconnected: " + socket.id);
  });
});

const PORT = 5012;
server.listen(PORT, () => console.log("Practical 12 Socket Server running on http://localhost:" + PORT));
