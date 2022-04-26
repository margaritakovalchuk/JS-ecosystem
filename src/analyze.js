const fs = require('fs');
const path = require('path');
const { log } = require('util');
/**
 * @param folderPath: {String}
 * @param callback: {Function}
 */

function analyze(folderPath, callback) {
  const result = {
    totalFiles: [],
    totalSubFolders: [],
    fileTypesInformation: [],
  };

  const getInfo = function (dirPath, resultInfo) {
    fs.readdir(dirPath, (e, files) => {
      if (e) {
        throw e;
      } else {
        files.forEach(function (file) {
          const next = path.join(dirPath, file);

          fs.stat(next, (error, stats) => {
            if (error) {
              throw error;
            } else if (stats.isDirectory()) {
              resultInfo.totalFiles = getInfo(next, {
                totalFiles: resultInfo.totalFiles,
                totalSubFolders: resultInfo.totalSubFolders,
                fileTypesInformation: resultInfo.fileTypesInformation,
              })?.totalFiles;
              resultInfo.totalSubFolders.push(file);
            } else {
              resultInfo.totalFiles.push(file);
              resultInfo.fileTypesInformation?.push({
                fileExtension: path.extname(file),
                fileCount: file,
              });
            }
          });
        });
      }
    });
    log(result);
    return resultInfo;
  };

  const info = getInfo(folderPath, result);
  const { totalFiles, totalSubFolders, fileTypesInformation } = info;

  const totals = {
    totalFiles: totalFiles.length,
    totalSubFolders: totalSubFolders.length,
    fileTypesInformation,
  };

  return callback(totals ? null : new Error('Task not implemented'), totals);
}

module.exports = analyze;
