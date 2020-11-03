const fs = require('fs');
const path = require('path');

const share = (fileName) => {
  return fs.readFileSync(path.resolve(__dirname, '../public', fileName));
};

module.exports = {
  share,
};
