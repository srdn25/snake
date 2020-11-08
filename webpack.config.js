const path = require('path');

module.exports = {
  entry: './src/webapp/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'src/public'),
  }
};
