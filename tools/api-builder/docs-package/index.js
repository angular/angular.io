var Package = require('dgeni').Package;
var jsdocPackage = require('dgeni-packages/jsdoc');
var nunjucksPackage = require('dgeni-packages/nunjucks');
var typescriptPackage = require('dgeni-packages/typescript');
var linksPackage = require('../links-package');
var gitPackage = require('dgeni-packages/git');
var path = require('canonical-path');

// Define the dgeni package for generating the docs
module.exports = new Package('angular-v2-docs', [jsdocPackage, nunjucksPackage, typescriptPackage, linksPackage, gitPackage])

// Register the processors
.processor(require('./processors/convertPrivateClassesToInterfaces'))
.processor(require('./processors/generateNavigationDoc'))
.processor(require('./processors/extractTitleFromGuides'))
.processor(require('./processors/createOverviewDump'))
.processor(require('./processors/checkUnbalancedBackTicks'))
.processor(require('./processors/convertBackticksToCodeBlocks'))
.processor(require('./processors/addNotYetDocumentedProperty'))
.processor(require('./processors/mergeDecoratorDocsEmpty'))
.processor(require('./processors/extractDecoratedClasses'))

.config(function(parseTagsProcessor) {
  parseTagsProcessor.tagDefinitions.push({ name: 'internal', transforms: function() { return true; } });
  parseTagsProcessor.tagDefinitions.push({ name: 'syntax' });
  parseTagsProcessor.tagDefinitions.push({ name: 'noDescription', transforms: function() { return true; } });
})

.config(function(renderDocsProcessor, versionInfo) {
  renderDocsProcessor.extraData.versionInfo = versionInfo;
})


.config(function(parseTagsProcessor, getInjectables) {
  // We actually don't want to parse param docs in this package as we are getting the data out using TS
  // TODO: rewire the param docs to the params extracted from TS
  parseTagsProcessor.tagDefinitions.forEach(function(tagDef) {
    if (tagDef.name === 'param') {
      tagDef.docProperty = 'paramData';
      tagDef.transforms = [];
    }
  });

})


// Configure links
.config(function(getLinkInfo) {
  getLinkInfo.useFirstAmbiguousLink = true;
})


// Configure file writing
.config(function(writeFilesProcessor) {
  writeFilesProcessor.outputFolder  = 'dist/docs';
})


// Configure rendering
.config(function(templateFinder, templateEngine) {

  // Nunjucks and Angular conflict in their template bindings so change Nunjucks
  templateEngine.config.tags = {
    variableStart: '{$',
    variableEnd: '$}'
  };

  templateFinder.templatePatterns = [
    '${ doc.template }',
    '${ doc.id }.${ doc.docType }.template.html',
    '${ doc.id }.template.html',
    '${ doc.docType }.template.html',
    'common.template.html'
  ];
});