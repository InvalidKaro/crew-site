const fs = require('fs');
const path = require('path');

const server = require('server');
const { get, socket } = server.router;
const { render } = server.reply;

// Update everyone with the current user count
const updateCounter = ctx => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

// Send the new message to everyone
const sendMessage = ctx => {
  ctx.io.emit('message', ctx.data);
};

server([
  get('/', ctx => {
    // Get the directory path where the files are located
    const directoryPath = path.join(__dirname, '');

    // Read all files in the directory
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        // Handle the error
        console.error('Error reading directory:', err);
        return;
      }

      // Render all files in the directory
      files.forEach(file => {
        if (file.endsWith('.html')) {
          render(path.join(directoryPath, file))(ctx.req, ctx.res, ctx.next);
        }
      });
    });
  }),
  socket('connect', updateCounter),
  socket('disconnect', updateCounter),
  socket('message', sendMessage)
]);