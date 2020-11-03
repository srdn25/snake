const config = require('./config').getConfig();

require('./drawer/background');
require('./drawer/apple');
const snake = require('./drawer/snake');

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#game');

  config.playWindowCoordinates = node.getBoundingClientRect();

  document.addEventListener('keydown', (event) => {
    if (Object.keys(config.controlKeys).includes(`${event.keyCode}`)) {
      snake.move(config.controlKeys[event.keyCode]);
    }
  });
});

console.log('Script connected');
