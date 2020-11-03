module.exports = (() => {
  let instance = null;

  const createInstance = () => ({
    width: 640,
    height: 480,
    style: {
      borderBackgroundColor: 'red',
      backgroundColor: 'black',
    },
    coordinates: {
      apple: null,
      snake: [],
    },
    cellSize: 15,
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
  });

  return {
    getConfig: () => {
      if (!instance) instance = createInstance();

      return instance;
    },
  };
})();
