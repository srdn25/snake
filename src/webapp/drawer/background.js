const config = require('../config').getConfig();

document.addEventListener('DOMContentLoaded', (event) => {
  const node = document.querySelector('#game');
  document.body.style.margin = 0;

  Object.assign(node.style, {
    // width: `${config.width}px`,
    // height: `${config.height}px`,
    // position: 'absolute',
    // left: '50%',
    // top: '50%',
    // transform: 'translate(-50%, -50%)',
    // border: `3px solid ${config.style.borderBackgroundColor}`,
    background: config.style.backgroundColor,
  });
});

