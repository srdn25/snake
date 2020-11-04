const cfg = require('./config');

const config = cfg.getConfig();

require('./drawer/background');
require('./drawer/apple');
const snake = require('./drawer/snake');

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#game');

  cfg.updateData('playWindowCoordinates', node.getBoundingClientRect());

  document.addEventListener('keydown', (event) => {
    if (Object.keys(config.controlKeys).includes(`${event.keyCode}`)) {
      snake.move(config.controlKeys[event.keyCode]);
    }
  });
});

console.log('Script connected');
