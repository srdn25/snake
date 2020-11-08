const Store = require('./store');

const store = Store.get();

const listener = (socket) => {
  socket.on('change_direction', (direction) => {
    if (store.directions.includes(direction)) {
      if (store.snake.snakeDirection !== store.controlKeys[event.keyCode]) {
        clearInterval(store.snake.snakeInterval);

        if (!store.snake.speed) {
          Store.dispatch('snake.speed', store.snake.startSpeed);
        }

        const interval = setInterval(() => snake.move(store.controlKeys[event.keyCode]), store.snake.speed);
        Store.dispatch('snake.snakeInterval', interval);
      }
    }
  });
};

module.exports = {
  listener,
};
