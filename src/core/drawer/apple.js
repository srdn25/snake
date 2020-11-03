const { getRandom } = require('../utility/index');
const config = require('../config').getConfig();

document.addEventListener('DOMContentLoaded', (event) => {
  const node = document.querySelector('#game');

  const ctx = node.getContext('2d');
  const x = getRandom(5, config.width - 15);
  const y = getRandom(5, config.height - 15);
  ctx.fillStyle = 'red';
  console.log('apple', {x, y})
  ctx.fillRect(x, y, 15, 15);
});

