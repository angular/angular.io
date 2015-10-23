var regionExtractor = require('./regionExtractor');
var buildRegionDocs = regionExtractor.buildRegionDocs;

/**
 * @dgService htmlFileShredder
 * @description
 */
module.exports = function fileShredder(log ) {
  return {
    name: 'fileShredder',

    getDocs: function (fileInfo) {
      // log.info("fileShredder processing: " + fileInfo.relativePath);
      var docs = buildRegionDocs(fileInfo.content, fileInfo.extension);
      var wasShredded = docs.some(function(doc) {
        return doc.regionName != null;
      });
      if (wasShredded) {
        log.info("shredded file: " + fileInfo.relativePath);
      }
      return docs;
    }
  }
}

