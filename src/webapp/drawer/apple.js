const cfg = require('../config');

const config = cfg.getConfig();

/**
 * Apple drawer
 * @param {Object} point - Point with coordinates
 * @param {number} point.x
 * @param {number} point.y
 * */
const generateApple = (point) => {
  const node = document.querySelector('#game');
  const ctx = node.getContext('2d');

  const { x, y } = point;

  cfg.updateData('coordinates', {
    ...config.coordinates,
    apple: { x, y },
  });

  ctx.fillStyle = config.style.appleColor;
  ctx.fillRect(x, y, config.cellSize, config.cellSize);
};

module.exports = {
  generateApple,
};
