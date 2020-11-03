document.addEventListener('DOMContentLoaded', (event) => {
  const node = document.querySelector('#game');
  const ctx = node.getContext('2d');

  ctx.fillStyle = 'green';
  ctx.fillRect(10, 10, 100, 100);
});

