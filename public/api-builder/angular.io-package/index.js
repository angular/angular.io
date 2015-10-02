var path = require('canonical-path');
var Package = require('dgeni').Package;
var basePackage = require('../docs-package');

module.exports = new Package('angular.io', [basePackage])

.factory(require('./services/renderMarkdown'))
.processor(require('./processors/addJadeDataDocsProcessor'))
// overrides base packageInfo and returns the one for the 'angular/angular' repo.
.factory(require('./services/packageInfo'))

// Configure rendering
.config(function(templateFinder, templateEngine) {

  templateFinder.templateFolders
      .unshift(path.resolve(__dirname, 'templates'));
})

.config(function(parseTagsProcessor) {
  parseTagsProcessor.tagDefinitions.push({ name: 'internal', transforms: function() { return true; } });
})

.config(function(readTypeScriptModules, writeFilesProcessor, readFilesProcessor) {

  readTypeScriptModules.sourceFiles = [
    'angular2/lifecycle_hooks.ts',
    'angular2/core.ts',
    'angular2/http.ts',
    'angular2/router.ts',
    'angular2/test.ts'
  ];
  readTypeScriptModules.hidePrivateMembers = true;

  // HACK - readFileProcessor.basePath set to point to a local repo location
  // because the docs-package-processor will
  // have previously set it to point to angular/angular repo.
  // needed because the writeFilesProcessor uses the readFilesProcessor's basePath.
  readFilesProcessor.basePath = path.resolve(__dirname, "../../docs");
  writeFilesProcessor.outputFolder  = 'js/latest/api';
})

.config(function(getLinkInfo) {
  getLinkInfo.useFirstAmbiguousLink = false;
})


.config(function(readFilesProcessor, generateNavigationDoc, createOverviewDump) {
  // Clear out unwanted processors
  readFilesProcessor.$enabled = false;
  generateNavigationDoc.$enabled = false;
  createOverviewDump.$enabled = false;
})


.config(function(computeIdsProcessor, computePathsProcessor, EXPORT_DOC_TYPES) {

  computePathsProcessor.pathTemplates.push({
    docTypes: ['module'],
    getPath: function computeModulePath(doc) {
      return doc.id.replace(/^angular2\//, '');
    },
    outputPathTemplate: '${path}/index.jade'
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: EXPORT_DOC_TYPES,
    pathTemplate: '${moduleDoc.path}/${name}-${docType}.html',
    outputPathTemplate:'${moduleDoc.path}/${name}-${docType}.jade',
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['jade-data'],
    pathTemplate: '${originalDoc.path}/_data',
    outputPathTemplate: '${path}.json'
  });
})

.config(function(getLinkInfo) {
  getLinkInfo.relativeLinks = true;
})


.config(function(templateEngine, getInjectables) {
  templateEngine.filters = templateEngine.filters.concat(getInjectables([
    require('./rendering/trimBlankLines'),
    require('./rendering/toId'),
    require('./rendering/indentForMarkdown')
  ]));
})


