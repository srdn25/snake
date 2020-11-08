const http = require('http');

const {
  ping,
  static: staticFiles,
  htmlRender,
  notFound,
} = require('./router');

const PORT = 5135;
const HOST = '127.0.0.1';

const server = http.createServer();

server.on('request', (request, response) => {
  const { method, url } = request;
  const [, route, ...urlParams] = url.split('/');

  switch (method) {
    case 'GET':
      switch (route) {
        case 'ping':
          return ping(request, response);
        case 'static':
          return staticFiles(request, response);

        default: return htmlRender(request, response);
      }

    default: return notFound(request, response);
  }

});

/** Add sockets for event model connection */
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('disconnected', () => {
    console.log(`Client disconnected connection by socket. Socket: ${socket}`)
  });
});

server.listen(PORT, HOST, (err) => {
  if (err) {
    console.error('Error in start server');
    return console.error(err);
  }

  console.log(`Server listening on http://${HOST}:${PORT}`);
});
