const config = require('./config').getConfig();
const { pubSub } = require('./utility');

require('./drawer/background');
require('./drawer/apple');
const snake = require('./drawer/snake');

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#game');

  config.playWindowCoordinates = node.getBoundingClientRect();

  // pubSub.subscribe(config.pubSubChannels.snake.move, , 'coreListener');

  document.addEventListener('keydown', (event) => {
    if (Object.keys(config.controlKeys).includes(`${event.keyCode}`)) {
      snake.move(config.controlKeys[event.keyCode]);
    }
  });
});

console.log('Script connected');
