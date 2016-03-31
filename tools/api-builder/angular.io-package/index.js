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
.processor(require('./processors/filterMemberDocs'))

// overrides base packageInfo and returns the one for the 'angular/angular' repo.
.factory(require('./services/packageInfo'))

// Configure rendering
.config(function(templateFinder, templateEngine, renderDocsProcessor) {

  templateFinder.templateFolders
      .unshift(path.resolve(__dirname, 'templates'));

  // helpers are made available to the nunjucks templates
  renderDocsProcessor.helpers.relativePath = function(from, to) {
    return path.relative(from, to);
  };
})

.config(function(parseTagsProcessor, getInjectables) {
  parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat(getInjectables(require('./tag-defs')));
})

.config(function(readTypeScriptModules, writeFilesProcessor, readFilesProcessor) {

  readTypeScriptModules.sourceFiles = [
    'angular2/animate.ts',
    'angular2/common.ts',
    'angular2/compiler.ts',
    'angular2/core.ts',
    'angular2/http.ts',
    'angular2/http/testing.ts',
    'angular2/instrumentation.ts',
    'angular2/platform/browser.ts',
    'angular2/router.ts',
    'angular2/router/testing.ts',
    'angular2/upgrade.ts',
    'angular2/testing.ts'
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
})


.config(function(computeIdsProcessor, computePathsProcessor, EXPORT_DOC_TYPES) {

  computePathsProcessor.pathTemplates.push({
    docTypes: ['module'],
    getPath: function computeModulePath(doc) {
      doc.moduleFolder = doc.id.replace(/^angular2\//, '');
      return doc.moduleFolder + '/index.html';
    },
    getOutputPath: function computeModulePath(doc) {
      return doc.moduleFolder + '/index.jade';
    }
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: EXPORT_DOC_TYPES,
    pathTemplate: '${moduleDoc.moduleFolder}/${name}-${docType}.html',
    outputPathTemplate:'${moduleDoc.moduleFolder}/${name}-${docType}.jade',
  });


  computePathsProcessor.pathTemplates.push({
    docTypes: ['decorator'],
    pathTemplate: '${moduleDoc.moduleFolder}/${name}-${docType}.html',
    outputPathTemplate:'${moduleDoc.moduleFolder}/${name}-${docType}.jade',
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['jade-data'],
    pathTemplate: '${originalDoc.moduleFolder}/_data',
    outputPathTemplate: '${path}.json'
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['api-list-data'],
    pathTemplate: 'api-list.json',
    outputPathTemplate: '${path}'
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['cheatsheet-data'],
    pathTemplate: '../guide/cheatsheet.json',
    outputPathTemplate: '${path}'
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
});
