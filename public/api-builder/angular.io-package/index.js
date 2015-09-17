var path = require('canonical-path');
var Package = require('dgeni').Package;
var basePackage = require('../public-docs-package');

// MIGRATION: removed these vars
// var PARTIAL_PATH = 'partials';
// var MODULES_DOCS_PATH = PARTIAL_PATH + '/api';

module.exports = new Package('angular.io', [basePackage])

.factory(require('./services/renderMarkdown'))
.processor(require('./processors/addJadeDataDocsProcessor'))
// MIGRATION: added this processor
.processor(require('./processors/fixOutputPathProcessor'))
// MIGRATION: added packageInfo to point to angular/angular repo
// overrides base packageInfo and returns the one for the 'angular/angular' repo.
.factory(require('./services/packageInfo'))

// Configure rendering
.config(function(templateFinder, templateEngine) {

  templateFinder.templateFolders
      .unshift(path.resolve(__dirname, 'templates'));
})

.config(function(writeFilesProcessor, readFilesProcessor) {
  // MIGRATION: HACK - readFileProcessor.basePath set to point to a local repo location
  // because the docs-package-processor will
  // have previously set it to point to angular/angular repo.
  // needed because the writeFilesProcessor uses the readFilesProcessor's basePath.
  readFilesProcessor.basePath = path.resolve(__dirname, "../../docs");
  writeFilesProcessor.outputFolder  = 'js/latest/api';
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
    pathTemplate: '${id}/',
    // MIGRATION:
    // outputPathTemplate: MODULES_DOCS_PATH + '/${id}/index.jade'
    outputPathTemplate: '/${id}/index.jade'
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: EXPORT_DOC_TYPES,
    pathTemplate: '${moduleDoc.id}/${name}-${docType}.html',
    // MIGRATION:
    // outputPathTemplate: MODULES_DOCS_PATH + '/${moduleDoc.id}/${name}-${docType}.jade',
    outputPathTemplate:'/${moduleDoc.id}/${name}-${docType}.jade',
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['jade-data'],
    pathTemplate: '${originalDoc.id}/_data',
    // MIGRATION:
    // outputPathTemplate: MODULES_DOCS_PATH + '/${path}.json'
    outputPathTemplate: '/${path}.json'
  });
})

.config(function(getLinkInfo) {
  getLinkInfo.relativeLinks = true;
})


.config(function(templateEngine, getInjectables) {
  templateEngine.filters = templateEngine.filters.concat(getInjectables([require('./rendering/trimBlankLines')]));
});


