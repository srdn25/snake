const config = require('../config');

document.addEventListener('DOMContentLoaded', (event) => {
  document.addEventListener('click', (clickEvt) => {
    const node = document.querySelector('#game');

    const ctx = node.getContext('2d');
    const x = clickEvt.clientX;
    const y = clickEvt.clientY;

    if (x < config.width && y < config.width) {
      ctx.fillStyle = 'green';
      ctx.fillRect(x, y, 15, 15);
    }
  });
});

