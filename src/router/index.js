const fs = require('fs');
const path = require('path');

const { share } = require('../handler/static');

const ping = (req, res) => {
  const { method, url } = req;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const body = {
    message: 'Welcome to Snake game',
  };

  res.write(JSON.stringify(body));
  return res.end();
};

const static = async (req, res) => {
  const { method, url } = req;
  const [, route, file] = url.split('/');

  if (method === 'GET' && route && file && route === 'static') {
    let dataFile = null;

    try {
      dataFile = await share(file);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(err));
      return res.end();
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'multipart/form-data');

    res.write(dataFile);
    return res.end();
  }
};

const htmlRender = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write(fs.readFileSync(path.resolve(__dirname, '../html/index.html')));
  res.end();
};

const notFound = (req, res) => {
  const { method, url } = req;
  console.error('Route not found', method, url);
  res.statusCode = 400;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ message: 'Route not found', method, url }));
  res.end();
};

module.exports = {
  ping,
  static,
  htmlRender,
  notFound,
};
