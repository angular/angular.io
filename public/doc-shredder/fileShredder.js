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
        default:
          return [];
      }
      log.info("fileShredder processing: " + fileInfo.projectRelativePath);
      if (commentMarkers) {
        return regionExtractor(fileInfo.content, commentMarkers);
      } else {
        return [ { content: fileInfo.content } ];
      }
    }
  }
}

