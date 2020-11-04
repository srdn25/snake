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
        if (config.snakeDirection !== config.controlKeys[event.keyCode]) {
          clearInterval(config.snake.snakeInterval);

          const interval = setInterval(() => snake.move(config.controlKeys[event.keyCode]), config.snake.speed);
          cfg.updateData('snake', {
            ...config.snake,
            snakeInterval: interval
          });
        }
      }
    } else {
      console.log('Put point for start game');
    }
  });
});

console.log('Script connected');
