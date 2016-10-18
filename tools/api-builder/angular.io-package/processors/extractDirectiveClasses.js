var _ = require('lodash');

module.exports = function extractDirectiveClassesProcessor(EXPORT_DOC_TYPES) {

  // Add the "directive" docType into those that can be exported from a module
  EXPORT_DOC_TYPES.push('directive');

  return {
    $runAfter: ['processing-docs'],
    $runBefore: ['docs-processed'],
    decoratorTypes: ['Directive', 'Component', 'View'],
    $process: function(docs) {
      var decoratorTypes = this.decoratorTypes;

      _.forEach(docs, function(doc) {

        _.forEach(doc.decorators, function(decorator) {

          if (decoratorTypes.indexOf(decorator.name) !== -1) {
            doc.docType = 'directive';

            doc[decorator.name.toLowerCase() + 'Options'] = decorator.argumentInfo[0];
          }
        });
      });

      return docs;
    }
  };
};