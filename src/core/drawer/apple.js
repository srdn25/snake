const { getRandom } = require('../utility/index');
const config = require('../config').getConfig();

document.addEventListener('DOMContentLoaded', () => {
  generateApple();
});

const generateApple = () => {
  const node = document.querySelector('#game');

  const ctx = node.getContext('2d');
  let x = getRandom(5, config.width - config.cellSize);
  let y = getRandom(5, config.height - config.cellSize);

  // TODO: apple should not on snake

  // point should be in cell
  x = x - Math.floor(x % config.cellSize);
  y = y - Math.floor(y % config.cellSize);

  config.coordinates.apple = {x, y };
  ctx.fillStyle = config.style.appleColor;
  ctx.fillRect(x, y, config.cellSize, config.cellSize);
};

module.exports = {
  generateApple,
};
