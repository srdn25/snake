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
      upriseSpeedStep: 1,
      startSpeed: 400,
      maximumSpeed: 100,
      speed: null,
      speedStep: 50,
    },
    cellSize: 16,
    controlKeys: {
      87: 'up',
      68: 'right',
      65: 'left',
      83: 'down',
      40: 'down',
      37: 'left',
      39: 'right',
      38: 'up',
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
