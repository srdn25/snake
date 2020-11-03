const { getRandom } = require('../utility/index');
const config = require('../config').getConfig();

document.addEventListener('DOMContentLoaded', (event) => {
  const node = document.querySelector('#game');

  const ctx = node.getContext('2d');
  const x = getRandom(5, config.width - config.cellSize);
  const y = getRandom(5, config.height - config.cellSize);
  config.coordinates.apple = { x, y };
  ctx.fillStyle = config.style.appleColor;
  ctx.fillRect(x, y, config.cellSize, config.cellSize);
});

