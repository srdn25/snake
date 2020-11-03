module.exports = (() => {
  let instance = null;

  const createInstance = () => ({
    width: 640,
    height: 480,
    style: {
      borderBackgroundColor: 'red',
      backgroundColor: 'black',
    }
  });

  return {
    getConfig: () => {
      if (!instance) instance = createInstance();

      return instance;
    },
  };
})();
