const cfg = require('../config');
const { generateApple } = require('./apple');

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
      console.log({x,y});

      // point should be in cell
      x = x - Math.floor(x % config.cellSize);
      y = y - Math.floor(y % config.cellSize);

      if (x < config.width && y < config.width && !config.coordinates.snake.length) {
        ctx.fillStyle = config.style.snakeColor;
        ctx.fillRect(x, y, config.cellSize, config.cellSize);
        config.coordinates.snake.push({ x, y });
      }
    }
  });
});

const moveUpdate = (point) => {
  let eat = false;
  const snakeCoords = config.coordinates.snake;
  const node = document.querySelector('#game');
  const ctx = node.getContext('2d');

  if (point.x === config.coordinates.apple.x && point.y === config.coordinates.apple.y) {
    eat = true;
    cfg.updateData('coordinates', {
      ...config.coordinates,
      apple: null,
    });

    generateApple();
  }

  console.log({
    x: point.x === config.coordinates.apple.x,
    y: point.y === config.coordinates.apple.y,
    px: point.x,
    py: point.y,
    ax: config.coordinates.apple.x,
    ay: config.coordinates.apple.y,
    eat,
  });
  // TODO: check this point
  // if (point in snakeCoords) = game over

  snakeCoords.unshift(point);

  if (!eat) {
    const oldPoint = snakeCoords.pop();

    ctx.fillStyle = config.style.backgroundColor;
    ctx.fillRect(oldPoint.x, oldPoint.y, config.cellSize + 1, config.cellSize + 1);
  }

  ctx.fillStyle = config.style.snakeColor;
  ctx.fillRect(point.x, point.y, config.cellSize, config.cellSize);

  cfg.updateData('coordinates', {
    ...config.coordinates,
    snake: snakeCoords,
  });
};

const move = (direction) => {
  const currentCoordinates = config.coordinates.snake[0];

  switch (direction) {
    case 'right':
      moveUpdate({
        x: currentCoordinates.x + config.cellSize,
        y: currentCoordinates.y,
      });
      break;

    case 'left':
      moveUpdate({
        x: currentCoordinates.x - config.cellSize,
        y: currentCoordinates.y,
      });
      break;

    case 'up':
      moveUpdate({
        x: currentCoordinates.x,
        y: currentCoordinates.y - config.cellSize,
      });
      break;

    case 'down':
      moveUpdate({
        x: currentCoordinates.x,
        y: currentCoordinates.y + config.cellSize,
      });
      break;

    default:
      console.error('Unknown direction: ', direction)
  }
};

module.exports = {
  move,
};

