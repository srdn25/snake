const server = require('./services/server');
const cfg = require('./config');

const config = cfg.getConfig();

require('./drawer/background');
require('./drawer/apple');
const snake = require('./drawer/snake');

/**
 * @param {Object[]} point - New Point and old point
 * @param {number} point[].x
 * @param {number} point[].y
 * */
server.on('snake_move', (data) => snake.moveUpdate(...data));

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
