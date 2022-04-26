const { access, rm } = require('fs');

function rimraf(path, callback) {
  access(path, callback);
  rm(path, { recursive: true }, callback);
}

module.exports = rimraf;
