var path = require('canonical-path');
var Package = require('dgeni').Package;
var basePackage = require('../docs-package');
var targetPackage = require('../target-package');
var cheatsheetPackage = require('../cheatsheet-package');

var PROJECT_PATH = path.resolve(__dirname, "../../..");
var PUBLIC_PATH = path.resolve(PROJECT_PATH, 'public');
var DOCS_PATH = path.resolve(PUBLIC_PATH, 'docs');
var ANGULAR2_DOCS_PATH = path.resolve(__dirname, '../../../../angular/modules/angular2/docs');


module.exports = new Package('angular.io', [basePackage, targetPackage, cheatsheetPackage])

.factory(require('./services/renderMarkdown'))
.processor(require('./processors/addJadeDataDocsProcessor'))
.processor(require('./processors/filterUnwantedDecorators'))
.processor(require('./processors/extractDirectiveClasses'))
.processor(require('./processors/matchUpDirectiveDecorators'))

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

  readFilesProcessor.basePath = DOCS_PATH;
  readFilesProcessor.sourceFiles = [{
    basePath: ANGULAR2_DOCS_PATH,
    include: path.resolve(ANGULAR2_DOCS_PATH, 'cheatsheet/*.md')
  }];
})

.config(function(getLinkInfo) {
  getLinkInfo.useFirstAmbiguousLink = false;
})


.config(function(readFilesProcessor, generateNavigationDoc, createOverviewDump) {
  // Clear out unwanted processors
  generateNavigationDoc.$enabled = false;
  //createOverviewDump.$enabled = false;
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

  computePathsProcessor.pathTemplates.push({
    docTypes: ['json-data'],
    pathTemplate: path.resolve(PUBLIC_PATH, 'resources/js/${id}'),
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

.config(function(filterUnwantedDecorators, log) {
  log.level = 'info';
  filterUnwantedDecorators.decoratorsToIgnore = [
    'CONST',
    'IMPLEMENTS',
    'ABSTRACT'
  ];
})

