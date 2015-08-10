/**
 * dgProcessor shredMapProcessor
 * @description
 *
 */
module.exports = function shredMapProcessor(log) {
  return {
    $runAfter: ['readFilesProcessor'],
    $runBefore: ['rendering-docs'],
    $process: function(docs) {
      var docMaps = []
      docs.forEach(function(doc) {
        var docMap = {
          jadePath: doc.fileInfo.filePath,
          jadeRelativePath: doc.fileInfo.projectRelativePath,
          refPaths: doc.refPaths
        }
        docMaps.push(docMap);
      });
      var newDocs = [{
        docType: 'xref-doc.html',
        docMaps: docMaps,
        outputPath: 'xref-doc.html'
      }, {
        docType: 'xref-doc.js',
        json: JSON.stringify(docMaps),
        outputPath: 'xref-doc.js'
      }]
      return newDocs;
    }
  };
};