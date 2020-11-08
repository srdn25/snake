const cfg = require('../config');

const config = cfg.getConfig();

document.addEventListener('DOMContentLoaded', (event) => {
  document.addEventListener('click', (clickEvt) => {
    const node = document.querySelector('#game');

    const ctx = node.getContext('2d');

    if (!config.playWindowCoordinates) {
      console.error('Didnt load canvas coordinates');
    } else {
      let x = clickEvt.clientX - (config.cellSize/2);
      let y = clickEvt.clientY - (config.cellSize/2);

      // point should be in cell
      x = x - Math.floor(x % config.cellSize);
      y = y - Math.floor(y % config.cellSize);

      if (x < config.width && y < config.width && !config.coordinates.snake.length) {
        ctx.fillStyle = config.style.snakeColor;
        ctx.fillRect(x, y, config.cellSize, config.cellSize);
        // TODO: send point to server
        config.coordinates.snake.push({ x, y });
      }
    }
  });
});

/**
 * Game over drawer
 * @param {Object[]} snakeCoordinates - array with objects with coordinates. For delete snake on board
 * @param {number} snakeCoordinates[].x
 * @param {number} snakeCoordinates[].y
 * */
const gameOver = (snakeCoordinates) => {
  const node = document.querySelector('#game');
  const ctx = node.getContext('2d');

  snakeCoordinates.forEach(({ x, y }) => {
    ctx.fillStyle = config.style.backgroundColor;
    ctx.fillRect(x, y, config.cellSize, config.cellSize);
  });
};

/**
 * Snake moves drawer
 * @param {Object} point - Object with new cell { x, y } coordinates
 * @param {number} point.x
 * @param {number} point.y
 * @param {Object} lastPoint - Optional parameter. Pass only if
 * snake didn't eat apple. This coordinates need for delete on board.
 * @param {number} lastPoint.x
 * @param {number} lastPoint.y
 * */
const moveUpdate = (point, lastPoint = null) => {
  const node = document.querySelector('#game');
  const ctx = node.getContext('2d');

  if (lastPoint) {
    ctx.fillStyle = config.style.backgroundColor;
    ctx.fillRect(lastPoint.x, lastPoint.y, config.cellSize, config.cellSize);
  }

  ctx.fillStyle = config.style.snakeColor;
  ctx.fillRect(point.x, point.y, config.cellSize, config.cellSize);
};

module.exports = {
  moveUpdate,
  gameOver,
};

