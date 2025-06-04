const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Enable CORS for HTTP
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve static files (index.html, CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, '/')));

// Fallback route for '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on('customEvent', (data) => {
    console.log('Received customEvent:', data);
    // Handle the custom event logic
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});

// Use PORT from environment or fallback to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
