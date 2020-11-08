const server = require('./services/server');
const cfg = require('./config');

const config = cfg.getConfig();

require('./drawer/background');
require('./drawer/apple');
const snake = require('./drawer/snake');

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#game');

  cfg.updateData('playWindowCoordinates', node.getBoundingClientRect());

  document.addEventListener('keydown', (event) => {
    if (config.coordinates.snake.length) {
      if (Object.keys(config.controlKeys).includes(`${event.keyCode}`)) {
        // TODO: Send direction to server
        // config.controlKeys[event.keyCode]
      }
    } else {
      console.log('Put point for start game');
    }
  });
});

console.log('Script connected');
