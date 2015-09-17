var _ = require('lodash');
var path = require('canonical-path');

/*
* Remove angular2 prefix from all doc output paths
*/

module.exports = function fixOutputPathProcessor() {
  return {
    $runAfter: ['paths-computed'],
    $runBefore: ['writing-files'],
    $process: function(docs) {
      docs.forEach(function(doc) {
        try {
          doc.outputPath = doc.outputPath && path.relative("/angular2", doc.outputPath);
        } catch(e) {
          var x = e;
        }
      });
      return docs;
    }
  };
};
