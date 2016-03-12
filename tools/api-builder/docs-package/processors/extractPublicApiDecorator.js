var _ = require('lodash');
var vm = require('vm');

module.exports = function extractPublicApiDecorator() {
  return {
    $runAfter: ['processing-docs'],
    $runBefore: ['docs-processed'],
    $process: function(docs) {
      _.forEach(docs, function(doc) {
        _.forEach(doc.decorators, function(decorator) {
          if (decorator.name === 'PublicApi') {
            doc.publicApi = {
              stability: decorator.argumentInfo[0].replace(/.*Stability\.(.+)/, '$1'),
              notes: decorator.argumentInfo[1]
            };
          }
        });
      });
    }
  };
};
