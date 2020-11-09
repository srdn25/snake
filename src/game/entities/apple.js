const Store = require('../store');
const { getRandom } = require('../utility/index');

const store = Store.get();

const generateApple = () => {
  let x = getRandom(5, store.width - store.cellSize);
  let y = getRandom(5, store.height - store.cellSize);

  const onSnake = !!store.coordinates.snake.filter((coord) => coord.x === x && coord.y === y).length;

  if (onSnake) {
    generateApple();
    return;
  }

  // point should be in cell
  x = x - Math.floor(x % store.cellSize);
  y = y - Math.floor(y % store.cellSize);

  Store.dispatch('coordinates.apple', { x, y })
};

module.exports = {
  generateApple,
};
