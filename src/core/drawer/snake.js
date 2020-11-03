const config = require('../config').getConfig();

document.addEventListener('DOMContentLoaded', (event) => {
  document.addEventListener('click', (clickEvt) => {
    const node = document.querySelector('#game');

    const ctx = node.getContext('2d');

    if (!config.playWindowCoordinates) {
      console.error('Didnt load canvas coordinates');
    } else {
      const x = clickEvt.clientX - (15/2);
      const y = clickEvt.clientY - (15/2);

      if (x < config.width && y < config.width) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x, y, 15, 15);
      }
    }
  });
});

