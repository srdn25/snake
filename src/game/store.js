const EventEmitter = require('events');

class PubSub extends EventEmitter {}

const FORBIDDEN_UPDATE = [
  'listener',
];

module.exports = (() => {
  let instance = null;

  const createInstance = () => ({
    listener: new PubSub(),
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
      snakeOldPoint: null,
      snakeNewPoint: null,
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
    directions: [
      'up',
      'right',
      'left',
      'down',
    ],
    playWindowCoordinates: {},
  });

  return {
    get: () => {
      if (!instance) instance = createInstance();

      return instance;
    },

    dispatch: function (key, data, inst = null, fullKey = null) {
      if (FORBIDDEN_UPDATE.includes(key)) return;
      if (typeof key !== 'string' && !Array.isArray(key)) {
        throw Error('Key should be string or array');
      }

      const Store = this.get();

      const path = Array.isArray(key) ? key : key.split('.');
      const instance = inst || Store;
      const rawKey = instance.cellSize ? key : fullKey;

      if (path.length === 1) {
        instance[path] = data;
        Store.listener.emit(`storeUpdated_${rawKey}`, data);
        return;
      }
      return this.dispatch(path.slice(1), data, instance[path[0]], rawKey);
    },
  };
})();
