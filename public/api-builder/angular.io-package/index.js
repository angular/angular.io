var path = require('canonical-path');
var Package = require('dgeni').Package;
var basePackage = require('../public-docs-package');

var PARTIAL_PATH = 'partials';
var MODULES_DOCS_PATH = PARTIAL_PATH + '/api';

// OLD paths
// var DOCS_DIST = 'dist/angular.io/partials/api/angular2/';
// var DOCS_IO_DIST = '../angular.io/public/docs/js/latest/api/';

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

.config(function(writeFilesProcessor) {
  writeFilesProcessor.outputFolder  = 'dist/angular.io';
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
    outputPathTemplate: MODULES_DOCS_PATH + '/${id}/index.jade'
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: EXPORT_DOC_TYPES,
    pathTemplate: '${moduleDoc.id}/${name}-${docType}.html',
    outputPathTemplate: MODULES_DOCS_PATH + '/${moduleDoc.id}/${name}-${docType}.jade',
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['jade-data'],
    pathTemplate: '${originalDoc.id}/_data',
    outputPathTemplate: MODULES_DOCS_PATH + '/${path}.json'
  });
})

.config(function(getLinkInfo) {
  getLinkInfo.relativeLinks = true;
})


.config(function(templateEngine, getInjectables) {
  templateEngine.filters = templateEngine.filters.concat(getInjectables([require('./rendering/trimBlankLines')]));
});


