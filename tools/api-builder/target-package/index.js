var Package = require('dgeni').Package;

module.exports = new Package('target', [])

.factory(require('./inline-tag-defs/target'))

.config(function(inlineTagProcessor, targetInlineTagDef) {
  inlineTagProcessor.inlineTagDefinitions.push(targetInlineTagDef);
});
