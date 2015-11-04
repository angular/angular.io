var _ = require('lodash');

/**
 * @dgService
 * @description
 * Process inline `target` block tags
 * (of the form `{@target environment1 environment2}...{@endtarget}`),
 * filtering out the blocks that do not match the containing document's
 * `targetEnvironments`.
 */
module.exports = function targetInlineTagDef() {
  return {
    name: 'target',
    end: 'endtarget',
    handler: function(doc, tagName, tagDescription) {
      var targets = tagDescription && tagDescription.tag.split(' ');
      if (!targets || !doc.targetEnvironments ||
          _.intersection(targets, doc.targetEnvironments).length) {
        return tagDescription.content;
      }
      return '';
    }
  };
};