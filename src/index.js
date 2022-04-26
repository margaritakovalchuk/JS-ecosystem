const rimraf = require('./rimraf');
const rename = require('./rename');
const analyze = require('./analyze');
const { log } = require('util');

const modules = {
  rimraf: {
    fileName: rimraf,
    args: ['--path'],
  },
  rename: {
    fileName: rename,
    args: ['--from', '--to'],
  },
  analyze: {
    fileName: analyze,
    args: ['--path'],
  },
};

const moduleName = process.argv[2];
const script = modules[moduleName];

const getArgs = (flags) => {
  const checkArgs = script.args.every((a) => process.argv.includes(a) > 0);

  const mapArgs = (flags) =>
    process.argv
      .map((a, i, arr) => {
        if (flags.includes(a)) {
          return arr[i + 1];
        }
      })
      .filter((a) => a);

  if (checkArgs) {
    return mapArgs(flags);
  } else {
    throw new Error('The CLI is not implemented!');
  }
};

const onDone = (error, result) => {
  if (error) {
    throw error;
  } else {
    log(result);
  }
};

script.fileName(...getArgs(script.args), onDone);
