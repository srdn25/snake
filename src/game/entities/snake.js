const { generateApple } = require('./apple');

/** If 'true' => game over */
const RULES_GAME_OVER = [
  // snake cant touch self
  (point) => !!store.coordinates.snake.filter((coord) => coord.x === point.x && coord.y === point.y).length,

  // snake cant move over display
  (point) => point.y > store.playWindowCoordinates.bottom
    || point.y < store.playWindowCoordinates.top
    || point.x > store.playWindowCoordinates.right
    || point.x < store.playWindowCoordinates.left,
];

const moveUpdate = (point) => {
  let eat = false;
  let gameOver = false;
  const snakeCoords = store.coordinates.snake;

  if (store.coordinates.snake.length % store.snake.upriseSpeedStep === 0) {
    const level = store.coordinates.snake.length / store.snake.upriseSpeedStep;
    const calculatedSpeed = store.snake.startSpeed - (level * store.snake.speedStep);

    if (calculatedSpeed !== store.snake.speed && calculatedSpeed > store.snake.maximumSpeed) {
      store.dispatch('snake.speed', calculatedSpeed);
    }
  }

  if (point.x === store.coordinates.apple.x && point.y === store.coordinates.apple.y) {
    eat = true;
    store.dispatch('coordinates.apple', null);

    generateApple();
  }

  RULES_GAME_OVER.forEach((rule) => {
    if (rule(point)) {
      // TODO: write to store this data, then send to client
      // console.log('Game over! Your score: ' + store.coordinates.snake.length);

      store.dispatch('coordinates.snake', []);

      clearInterval(store.snake.snakeInterval);
      cfg.dispatch('snake.snakeInterval', null);
      cfg.dispatch('snake.snakeDirection', null);

      return gameOver = true;
    }
  });

  if (gameOver) {
    return null;
  }

  store.dispatch('coordinates.snake', snakeCoords.slice(1, 0, point));

  if (!eat) {
    store.dispatch('coordinates.snake', snakeCoords.slice(0, snakeCoords.length));
  }
};

const move = (direction) => {
  const currentCoordinates = store.coordinates.snake[0];

  store.dispatch('snake.snakeDirection', direction);

  switch (direction) {
    case 'right':
      moveUpdate({
        x: currentCoordinates.x + store.cellSize,
        y: currentCoordinates.y,
      });
      break;

    case 'left':
      moveUpdate({
        x: currentCoordinates.x - store.cellSize,
        y: currentCoordinates.y,
      });
      break;

    case 'up':
      moveUpdate({
        x: currentCoordinates.x,
        y: currentCoordinates.y - store.cellSize,
      });
      break;

    case 'down':
      moveUpdate({
        x: currentCoordinates.x,
        y: currentCoordinates.y + store.cellSize,
      });
      break;

    default:
      console.error('Unknown direction: ', direction)
  }
};

module.exports = {
  move,
};
