const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Allow CORS for your frontend
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // React runs here via Vite
    methods: ["GET", "POST"]
  }
});

let messageHistory = [];

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.emit('message history', messageHistory);

  socket.on('chat message', (msg) => {
    messageHistory.push(msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
