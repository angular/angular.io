var fs = require('fs');
var path = require('canonical-path');
var Package = require('dgeni').Package;
var basePackage = require('../api-builder/docs-package');
var targetPackage = require('../api-builder/target-package');
var cheatsheetPackage = require('../api-builder/cheatsheet-package');

var PROJECT_PATH = path.resolve(__dirname, "../..");
var PUBLIC_PATH = path.resolve(PROJECT_PATH, 'public');
var DOCS_PATH = path.resolve(PUBLIC_PATH, 'docs');
var ANGULAR_REPO_PATH = path.resolve(__dirname, '../../../angular-dart');
var ANGULAR2_DOCS_PATH = path.resolve(ANGULAR_REPO_PATH, 'docs');
var NG_IO_PKG_PATH = path.resolve(__dirname, "../api-builder/angular.io-package");

function requireNgIoPkg(_path) { return require(path.resolve(NG_IO_PKG_PATH, _path)); }

module.exports = new Package('dart-api-and-cheatsheet-builder', [basePackage, targetPackage, cheatsheetPackage])

  // overrides base packageInfo and returns the one for the Angular repo.
  .factory(require('./services/packageInfo'))

  // Configure rendering
  .config(function (templateFinder, renderDocsProcessor) {

    templateFinder.templateFolders
      .unshift(path.resolve(NG_IO_PKG_PATH, 'templates'));

    // helpers are made available to the nunjucks templates
    renderDocsProcessor.helpers.relativePath = function (from, to) {
      return path.relative(from, to);
    };
  })

  .config(function (parseTagsProcessor, getInjectables) {
    const tagDefs = requireNgIoPkg('./tag-defs');
    parseTagsProcessor.tagDefinitions =
      parseTagsProcessor.tagDefinitions.concat(getInjectables(tagDefs));
  })

  .config(function (readFilesProcessor) {
    // confirm that the angular repo is actually there.
    if (!fs.existsSync(ANGULAR_REPO_PATH)) {
      throw new Error('dart-api-and-cheatsheet-builder task requires the angular2 repo to be at ' + ANGULAR_REPO_PATH);
    }
    readFilesProcessor.basePath = DOCS_PATH;
    readFilesProcessor.sourceFiles = [{
      basePath: ANGULAR2_DOCS_PATH,
      include: path.resolve(ANGULAR2_DOCS_PATH, 'cheatsheet/*.md')
    }];
  })

  .config(function (convertPrivateClassesToInterfacesProcessor,
    createOverviewDump,
    extractDirectiveClassesProcessor,
    extractJSDocCommentsProcessor,
    extractTitleFromGuides,
    generateNavigationDoc,
    mergeDecoratorDocs,
    readTypeScriptModules
  ) {
    // Clear out unwanted processors
    createOverviewDump.$enabled = false;
    convertPrivateClassesToInterfacesProcessor.$enabled = false;
    extractDirectiveClassesProcessor.$enabled = false;
    extractJSDocCommentsProcessor.$enabled = false;
    extractTitleFromGuides.$enabled = false;
    generateNavigationDoc.$enabled = false;
    mergeDecoratorDocs.$enabled = false;
    readTypeScriptModules.$enabled = false;
  })

  .config(function (computePathsProcessor) {
    computePathsProcessor.pathTemplates.push({
      docTypes: ['cheatsheet-data'],
      pathTemplate: '../guide/cheatsheet.json',
      outputPathTemplate: '${path}'
    });
  })

  .config(function (getLinkInfo) {
    getLinkInfo.relativeLinks = true;
  })

  .config(function (templateEngine, getInjectables) {
    templateEngine.filters = templateEngine.filters.concat(getInjectables([
      requireNgIoPkg('./rendering/trimBlankLines'),
      requireNgIoPkg('./rendering/toId'),
      requireNgIoPkg('./rendering/indentForMarkdown')
    ]));
  })

  ;
