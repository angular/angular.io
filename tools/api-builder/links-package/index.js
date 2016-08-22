var Package = require('dgeni').Package;

module.exports = new Package('links', [])

.factory(require('./inline-tag-defs/link'))
.factory(require('./inline-tag-defs/linkDocs'))
.factory(require('./inline-tag-defs/example'))
.factory(require('./inline-tag-defs/exampleTabs'))
.factory(require('dgeni-packages/links/services/getAliases'))
.factory(require('dgeni-packages/links/services/getDocFromAlias'))
.factory(require('./services/getLinkInfo'))
.factory(require('./services/parseArgString'))
.factory(require('./services/moduleScopeLinkDisambiguator'))
.factory(require('./services/deprecatedDocsLinkDisambiguator'))
.factory(require('./services/getApiFragmentFileName'))

.config(function(inlineTagProcessor, linkInlineTagDef, linkDocsInlineTagDef, exampleInlineTagDef, exampleTabsInlineTagDef) {
  inlineTagProcessor.inlineTagDefinitions.push(linkInlineTagDef);
  inlineTagProcessor.inlineTagDefinitions.push(linkDocsInlineTagDef);
  inlineTagProcessor.inlineTagDefinitions.push(exampleInlineTagDef);
  inlineTagProcessor.inlineTagDefinitions.push(exampleTabsInlineTagDef);
})

.config(function(getLinkInfo, moduleScopeLinkDisambiguator, deprecatedDocsLinkDisambiguator) {
  getLinkInfo.disambiguators.push(moduleScopeLinkDisambiguator);
  getLinkInfo.disambiguators.push(deprecatedDocsLinkDisambiguator);
});
