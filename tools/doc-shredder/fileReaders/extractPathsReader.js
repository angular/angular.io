/**
 * @dgService extractPathsReader
 * @description
 */

var path = require('canonical-path');

module.exports = function extractPathsReader(log) {
  // regexs for makeTabs. makeExample and makeJson lines
  var rx = /\s*\+make(?:=Tabs|Example)\(\s*["'](.*?)["']\s*,\s*["'](.*?)["'].*?\)/g
  var rxJson = /\s*\+makeJson\(\s*["'](.*?)["']\s*,.*?\)/g
  return {
    name: 'extractPathsReader',

    // returns the fragment filePath without the _fragments dir on the front or the '.md'
    getDocs: function (fileInfo) {
      var content = fileInfo.content;
      var fragItems = [];
      var r;
      while ((r = rx.exec(content)) !== null) {
        var filePaths = r[1].split(',');
        var regions = (r.length > 2) ? r[2].split(",") : null;
        filePaths.forEach(function(filePath, ix) {
          var region = regions && regions[ix];
          fragItems.push( { mixinPath: filePath, region: region } );
        });
      }
      while ((r = rxJson.exec(content)) !== null) {
        var filePaths = r[1].split(',');
        filePaths.forEach(function(filePath) {
          fragItems.push( { mixinPath: filePath, region: null } );
        });
      }
      if (fragItems.length) {
        return [{
          fragItems: fragItems
        }];
      } else {
        return [];
      }
    }
  }
}

