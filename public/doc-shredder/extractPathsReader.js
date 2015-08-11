/**
 * @dgService extractPathsReader
 * @description
 */

var path = require('canonical-path');

module.exports = function extractPathsReader(log) {
  // regex for makeTabs line
  var rx = /\s*\+makeTabs\(\s*["'](.*?)["']\s*,\s*["'](.*?)["'].*?\)/g
  return {
    name: 'extractPathsReader',

    getDocs: function (fileInfo) {
      var content = fileInfo.content;
      var fragPaths = [];
      var r;
      while ((r = rx.exec(content)) !== null) {
        var basePath = r[1];
        var fileNames = r[2].split(',');
        fileNames.forEach(function(fn) {
          fragPaths.push(path.join(basePath, fn.trim()));
        })
      }
      if (fragPaths.length) {
        return [{
          fragPaths: fragPaths
        }];
      } else {
        return [];
      }
    }
  }
}

