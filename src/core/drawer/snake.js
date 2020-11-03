const config = require('../config').getConfig();
const { pubSub } = require('../utility');

document.addEventListener('DOMContentLoaded', (event) => {
  document.addEventListener('click', (clickEvt) => {
    const node = document.querySelector('#game');

    const ctx = node.getContext('2d');

    if (!config.playWindowCoordinates) {
      console.error('Didnt load canvas coordinates');
    } else {
      const x = clickEvt.clientX - (config.cellSize/2);
      const y = clickEvt.clientY - (config.cellSize/2);

      if (x < config.width && y < config.width) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x, y, config.cellSize, config.cellSize);
        config.coordinates.snake.push({ x, y });
      }
    }
  });
});

const moveUpdate = (point) => {
  const snakeCoords = config.coordinates.snake;

  // TODO: check this point
  // if (snakeCoords)
  snakeCoords.push(point);
  const oldPoint = snakeCoords.pop();

  pubSub.publish(config.pubSubChannels.snake.move, {
    point,
    oldPoint,
  });
};

const move = (direction) => {
  const currentCoordinates = config.coordinates.snake[0];
  console.log(direction);

  switch (direction) {
    case 'right':
      moveUpdate({
        x: currentCoordinates.x + config.cellSize + (config.cellSize / 2),
        y: currentCoordinates.y,
      });
      break;

    case 'left':
      moveUpdate({
        x: currentCoordinates.x - config.cellSize + (config.cellSize / 2),
        y: currentCoordinates.y,
      });
      break;

    case 'up':
      moveUpdate({
        x: currentCoordinates.x,
        y: currentCoordinates.y - config.cellSize + (config.cellSize / 2),
      });
      break;

    case 'down':
      moveUpdate({
        x: currentCoordinates.x,
        y: currentCoordinates.y + config.cellSize + (config.cellSize / 2),
      });
      break;

    default:
      console.error('Unknown direction: ', direction)
  }
};

module.exports = {
  move,
};

