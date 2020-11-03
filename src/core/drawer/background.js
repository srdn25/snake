document.addEventListener('DOMContentLoaded', (event) => {
  const node = document.querySelector('#game');

  Object.assign(node.style, {
    width: '640px',
    height: '480px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    border: '3px solid red',
    background: 'black',
  });

  // const ctx = node.getContext('2d');
  // ctx.fillStyle = 'black';
  // ctx.fillRect(0, 0, 640, 480);
});

