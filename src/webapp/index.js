const server = require('./services/server');
const cfg = require('./config');

const config = cfg.getConfig();

require('./drawer/background');
const apple = require('./drawer/apple');
const snake = require('./drawer/snake');

server.on('snakeNewPoint', (point) => snake.moveUpdate(point));
server.on('snakeOldPoint', (point) => snake.clearAfterMove(point));
server.on('coordinates.apple', (point) => apple.generateApple(point));
server.on('snakeSpeed', (speed) => cfg.updateData('snake', {
  ...config.snake,
  speed,
}));
server.on('snakeInterval', (snakeInterval) => cfg.updateData('snake', {
  ...config.snake,
  snakeInterval,
}));

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#game');
  const playWindowCoordinates = node.getBoundingClientRect();

  // TODO: Send window size to server
  server.emit('set_play_window_coordinates', playWindowCoordinates);
  cfg.updateData('playWindowCoordinates', playWindowCoordinates);

  document.addEventListener('keydown', (event) => {
    if (config.coordinates.snake.length) {
      if (Object.keys(config.controlKeys).includes(`${event.keyCode}`)) {
        server.emit('change_direction', config.controlKeys[event.keyCode])
      }
    } else {
      console.log('Put point for start game');
    }
  });
});

console.log('Script connected');
