// const { getRandom } = require('../utility/index');
const config = require('../config').getConfig();

document.addEventListener('DOMContentLoaded', () => {
  generateApple();
});

/**
 * Apple drawer
 * @param {Object} point - Point with coordinates
 * @param {number} point.x
 * @param {number} point.y
 * */
const generateApple = (point) => {
  const node = document.querySelector('#game');

  const ctx = node.getContext('2d');
  // Get from server
  // let x = getRandom(5, config.width - config.cellSize);
  // let y = getRandom(5, config.height - config.cellSize);
  //
  // const onSnake = !!config.coordinates.snake.filter((coord) => coord.x === x && coord.y === y).length;
  //
  // if (onSnake) {
  //   generateApple();
  //   return;
  // }
  //
  //   // point should be in cell
  // x = x - Math.floor(x % config.cellSize);
  // y = y - Math.floor(y % config.cellSize);

  config.coordinates.apple = { x, y };
  ctx.fillStyle = config.style.appleColor;
  ctx.fillRect(x, y, config.cellSize, config.cellSize);
};

module.exports = {
  generateApple,
};
