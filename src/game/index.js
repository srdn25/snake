const Store = require('./store');
const apple = require('./entities/apple');

const store = Store.get();

const listener = (socket) => {
  socket.on('set_play_window_coordinates', (playWindowCoordinates) => Store.dispatch('playWindowCoordinates', playWindowCoordinates));

  socket.on('set_first_snake_point', (point) => {
    Store.dispatch('coordinates.snake', [point]);

    apple.generateApple();
  });

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

  // Handle store update
  // unused
  store.listener.on('storeUpdated_coordinates.snake', (data) => {
    socket.emit('coordinates.snake', data);
  });

  store.listener.on('storeUpdated_coordinates.snakeNewPoint', (point) => {
    socket.emit('snakeNewPoint', point)
  });

  store.listener.on('storeUpdated_coordinates.snakeOldPoint', (point) => {
    socket.emit('snakeOldPoint', point)
  });

  store.listener.on('storeUpdated_coordinates.apple', (point) => {
    console.error('apple', point);
    socket.emit('apple', point)
  });

  // unused
  store.listener.on('storeUpdated_snake.snakeDirection', (direction) => {
    socket.emit('snakeDirection', direction)
  });

  store.listener.on('storeUpdated_snake.snakeInterval', (interval) => {
    socket.emit('snakeInterval', interval)
  });

  store.listener.on('storeUpdated_snake.speed', (speed) => {
    socket.emit('snakeSpeed', speed)
  });
};

module.exports = {
  listener,
};
