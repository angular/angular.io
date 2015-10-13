/**
 * @dgService htmlFileShredder
 * @description
 */
module.exports = function fileShredder(log, regionExtractor) {
  return {
    name: 'fileShredder',

    getDocs: function (fileInfo) {
      var commentMarkers;
      switch (fileInfo.extension) {
        case 'ts':
        case 'js':
        case 'dart':
          commentMarkers = ['//'];
          break;
        case 'html':
          commentMarkers = ['<!--'];
          break;
        case 'css':
          commentMarkers = ['/*'];
          break;
        case 'json':
          break;
        case 'yaml':
          commentMarkers = ['#'];
          break;
        default:
          return [];
      }
      var docs;
      // log.info("fileShredder processing: " + fileInfo.relativePath);
      if (commentMarkers) {
        docs = regionExtractor(fileInfo.content, commentMarkers);
      } else {
        docs = [ { content: fileInfo.content } ];
      }
      if (docs.length) {
        log.info("shredded file: " + fileInfo.relativePath);
      }
      return docs;
    }
  }
}

