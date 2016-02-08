var Package = require('dgeni').Package;

module.exports = new Package('cheatsheet', [require('../content-package'), require('../target-package')])

.factory(require('./services/cheatsheetItemParser'))
.processor(require('./processors/createCheatsheetDoc'))

.config(function(parseTagsProcessor, getInjectables) {
  parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat(getInjectables(require('./tag-defs')));
});
