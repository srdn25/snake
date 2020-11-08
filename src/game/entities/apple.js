const { getRandom } = require('../utility/index');

const generateApple = () => {
  let x = getRandom(5, config.width - config.cellSize);
  let y = getRandom(5, config.height - config.cellSize);

  const onSnake = !!config.coordinates.snake.filter((coord) => coord.x === x && coord.y === y).length;

  if (onSnake) {
    generateApple();
    return;
  }

// point should be in cell
  x = x - Math.floor(x % config.cellSize);
  y = y - Math.floor(y % config.cellSize);

  store.dispatch('coordinates.apple', { x, y })
};

module.exports = {
  generateApple,
};
