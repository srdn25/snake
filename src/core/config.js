module.exports = (() => {
  let instance = null;

  const createInstance = () => ({
    width: 640,
    height: 480,
    style: {
      borderBackgroundColor: 'red',
      backgroundColor: 'black',
      snakeColor: 'green',
      appleColor: 'red',
    },
    coordinates: {
      apple: null,
      snake: [],
    },
    snake: {
      snakeDirection: null,
      snakeInterval: null,
      upriseSpeedStep: 3,
      speed: 800,
      speedStep: 50,
    },
    cellSize: 16,
    controlKeys: {
      87: 'up',
      68: 'right',
      65: 'left',
      83: 'down',
    },
    pubSubChannels: {
      snake: {
        move: 'SnakeMove',
      }
    },
    playWindowCoordinates: {},
  });

  return {
    getConfig: () => {
      if (!instance) instance = createInstance();

      return instance;
    },

    updateData: function (key, data) {
      const instance = this.getConfig();
      instance[key] = data;
    },
  };
})();
