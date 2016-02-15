var path = require('canonical-path');
/**
 * dgProcessor
 * @description
 *
 */
module.exports = function renderAsJadeProcessor() {
  return {
    $runAfter: ['readFilesProcessor'],
    $runBefore: ['writing-files'],
    $process: function(docs) {
      return docs.map(function(doc) {
        var fileInfo = doc.fileInfo;
        doc.renderedContent =  doc.content ;
        var regionSuffix =  (doc.regionName && doc.regionName.length) ? "-" + doc.regionName.trim() : "";
        var origName = fileInfo.baseName + "." + fileInfo.extension;

        //var newName = "_." + fileInfo.baseName + regionSuffix +  "." + fileInfo.extension;
        var newName = "./_fragments/" + fileInfo.baseName + regionSuffix +  "." + fileInfo.extension;
        doc.outputPath = fileInfo.filePath.replace(origName, newName);
        return doc;
      })
    }
  };
};