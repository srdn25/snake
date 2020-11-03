const { getRandom } = require('../utility/index');
const config = require('../config');

document.addEventListener('DOMContentLoaded', (event) => {
  const node = document.querySelector('#game');

  const ctx = node.getContext('2d');
  const x = getRandom(5, config.width - 5);
  const y = getRandom(5, config.height - 5);
  ctx.fillStyle = 'red';
  ctx.fillRect(x, y, 15, 15);
});

