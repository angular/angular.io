/**
 * @dgService extractPathsReader
 * @description
 */

var path = require('canonical-path');

module.exports = function extractPathsReader(log) {
  // regex for makeTabs line
  var rx = /\s*\+make(?:=Tabs|Example|Json)\(\s*["'](.*?)["']\s*,\s*["'](.*?)["'].*?\)/g
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

