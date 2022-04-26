const fs = require('fs');

function rename(from, to, callback) {
  fs.rename(from, to, callback);
}

module.exports = rename;
