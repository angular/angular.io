var regionExtractor = require('../regionExtractor');
var buildRegionDocs = regionExtractor.buildRegionDocs;

/**
 * @dgService
 * @description
 */
module.exports = function regionFileReader(log ) {
  return {
    name: 'regionFileReader',

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

