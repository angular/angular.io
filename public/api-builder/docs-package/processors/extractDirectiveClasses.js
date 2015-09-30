var _ = require('lodash');
var vm = require('vm');

module.exports = function extractDirectiveClassesProcessor() {
  return {
    $runAfter: ['processing-docs'],
    $runBefore: ['docs-processed'],
    decoratorTypes: ['Directive', 'Component', 'View'],
    $process: function(docs) {
      var decoratorTypes = this.decoratorTypes;

      _.forEach(docs, function(doc) {

        _.forEach(doc.decorators, function(decorator) {

          if (decoratorTypes.indexOf(decorator.name) !== -1) {

            // We use this sneaky vm trick to extract the object literal
            // argument from the decorator's constructor call
            var args = decorator.arguments ?
              vm.runInNewContext('dummy = ' + decorator.arguments[0]) : {};

            doc[decorator.name.toLowerCase() + 'Options'] = args;
            doc.docType = 'directive';
          }
        });
      });

      return docs;
    }
  };
};
