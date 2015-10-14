/**
 * @dgService htmlFileShredder
 * @description
 */
module.exports = function fileShredder(log, regionExtractor) {
  return {
    name: 'fileShredder',

    getDocs: function (fileInfo) {
      var commentInfo;
      switch (fileInfo.extension) {
        case 'ts':
        case 'js':
        case 'dart':
          commentInfo = {
            prefix: '//',
            blockPattern: '/* {tag} */'
          };
          //commentMarkers = ['//'];
          break;
        case 'html':
          commentInfo = {
            prefix: '<!--',
            blockPattern: '<!-- {tag} -->'
          };
          // commentMarkers = ['<!--'];
          break;
        case 'css':
          commentInfo = {
            prefix: '/*',
            blockPattern: '/* {tag} */'
          };
          // commentMarkers = ['/*'];
          break;
        case 'json':
          break;
        case 'yaml':
          commentInfo = {
            prefix: '#',
            blockPattern: '# {tag} '
          };
          // commentMarkers = ['#'];
          break;
        default:
          return {};
      }
      var docs;
      // log.info("fileShredder processing: " + fileInfo.relativePath);
      if (commentInfo) {
        docs = regionExtractor(fileInfo.content, commentInfo);
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

