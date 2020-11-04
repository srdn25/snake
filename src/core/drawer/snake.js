const cfg = require('../config');
const { generateApple } = require('./apple');

const config = cfg.getConfig();

/** If 'true' => game over */
const RULES_GAME_OVER = [
  // snake cant touch self
  (point) => !!config.coordinates.snake.filter((coord) => coord.x === point.x && coord.y === point.y).length,

  // snake cant move over display
  (point) => point.y > config.playWindowCoordinates.bottom
    || point.y < config.playWindowCoordinates.top
    || point.x > config.playWindowCoordinates.right
    || point.x < config.playWindowCoordinates.left,
];

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
  let gameOver = false;
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

  RULES_GAME_OVER.forEach((rule) => {
    if (rule(point)) {
      console.log('Game over! Your score: ' + config.coordinates.snake.length);

      config.coordinates.snake.forEach(({ x, y }) => {
        ctx.fillStyle = config.style.backgroundColor;
        ctx.fillRect(x, y, config.cellSize, config.cellSize);
      });

      cfg.updateData('coordinates', {
        ...config.coordinates,
        snake: [],
      });

      clearInterval(config.snake.snakeInterval);
      cfg.updateData('snake', {
        ...config.snake,
        snakeInterval: null,
        snakeDirection: null,
      });

      return gameOver = true;
    }
  });

  if (gameOver) {
    return null;
  }

  snakeCoords.unshift(point);

  if (!eat) {
    const oldPoint = snakeCoords.pop();

    ctx.fillStyle = config.style.backgroundColor;
    ctx.fillRect(oldPoint.x, oldPoint.y, config.cellSize, config.cellSize);
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
  cfg.updateData('snake', {
    ...config.snake,
    snakeDirection: direction,
  });

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

