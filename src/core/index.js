const config = require('./config').getConfig();

require('./drawer/background');
require('./drawer/apple');
require('./drawer/snake');

document.addEventListener('DOMContentLoaded', (event) => {
  const node = document.querySelector('#game');

  config.playWindowCoordinates = node.getBoundingClientRect();
});

console.log('Script connected');
