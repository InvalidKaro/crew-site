const socket = io();

// Handle form submission
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const messageInput = document.querySelector('#message');
  const message = messageInput.value;

  // Emit the 'chat message' event with the message
  socket.emit('chat message', message);

  // Clear the input field
  messageInput.value = '';
});

// Handle received chat messages
socket.on('chat message', (message) => {
  // Add the message to the chat display
  const messageElement = document.createElement('li');
  messageElement.textContent = message;
  document.querySelector('#chat').appendChild(messageElement);
});