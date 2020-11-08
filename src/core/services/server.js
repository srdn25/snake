const io = require('socket.io-client');

const server = io();

server.on('connect', () => console.log(`Socket connection connected: ${server.connected}`));
server.on('disconnect', () => console.log(`Socket connection disconnected: ${server.connected}`));

module.exports = {
  socket: server,
};
