/**
 * @dgService htmlFileShredder
 * @description
 */

var path = require('canonical-path');

module.exports = function extractPathsReader(log) {
  var rx = /\s*\+makeTabs\(\s*["'](.*?)["']\s*,\s*["'](.*?)["'].*?\)/g
  return {
    name: 'extractPathsReader',

    getDocs: function (fileInfo) {
      var content = fileInfo.content;
      var refPaths = [];
      var r;
      while ((r = rx.exec(content)) !== null) {
        var basePath = r[1];
        var fileNames = r[2].split(',');
        fileNames.forEach(function(fn) {
          refPaths.push(path.join(basePath, fn));
        })
      }
      if (refPaths.length) {
        return [{
          refPaths: refPaths
        }];
      } else {
        return [];
      }
    }
  }
}

