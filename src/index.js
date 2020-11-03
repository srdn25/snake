const http = require('http');

const {
  ping,
} = require('./router');

const PORT = 5135;
const HOST = '127.0.0.1';

const server = http.createServer();

server.on('request', (request, response) => {
  ping(request, response);
});

server.listen(PORT, HOST, (err) => {
  if (err) {
    console.error('Error in start server');
    return console.error(err);
  }

  console.log(`Server listening on http://${HOST}:${PORT}`);
});
