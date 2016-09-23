var _ = require('lodash');

module.exports = function mergeDecoratorDocs() {
  return {
    $runAfter: ['processing-docs'],
    $runBefore: ['docs-processed'],
    $process: function(docs) {
    }
  };
};