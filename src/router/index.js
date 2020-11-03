const ping = (req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/ping') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    const body = {
      message: 'Welcome to Snake game',
    };

    res.write(JSON.stringify(body));
    res.end();
  }
};

module.exports = {
  ping,
};
