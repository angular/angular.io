// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');
var Q = require('q');
var del = require('del');
// delPromise is a 'promise' version of del
var delPromise =  Q.denodeify(del);
var Dgeni = require('dgeni');
var _ = require('lodash');



var shred = function(shredOptions) {
  try {
    var pkg = createShredPackage(shredOptions);
    var dgeni = new Dgeni([ pkg]);
    return dgeni.generate();
  } catch(x) {
    console.log(x.stack);
    throw x;
  }
}

var shredSingleDir = function(shredOptions, filePath) {
  shredOptions = resolveShredOptions(shredOptions);
  var root = path.resolve(shredOptions.basePath, shredOptions.examplesDir);
  var fileDir = path.dirname(filePath);
  var relativePath = path.relative(root, fileDir);
  var examplesDir = path.join(shredOptions.examplesDir, relativePath);
  var fragmentsDir = path.join(shredOptions.fragmentsDir, relativePath);
  var options = {
    basePath: shredOptions.basePath,
    includeSubdirs: false,
    examplesDir: examplesDir,
    fragmentsDir: fragmentsDir
  }
  var cleanPath = path.join(shredOptions.basePath, fragmentsDir, '*.*')
  return delPromise([ cleanPath, '!**/*.ovr.*']).then(function(paths) {
    // console.log('Deleted files/folders:\n', paths.join('\n'));
    return shred(options);
  });
}

var buildShredMap = function(shredMapOptions) {
  try {
    var pkg = createShredMapPackage(shredMapOptions);
    var dgeni = new Dgeni([ pkg]);
    return dgeni.generate();
  } catch(x) {
    console.log(x.stack);
    throw x;
  }
}



module.exports = {
  shred: shred,
  shredSingleDir: shredSingleDir,
  buildShredMap: buildShredMap
};

function createShredPackage(shredOptions) {
  var pkg = new Dgeni.Package('doc-shredder', [
    // require('dgeni-packages/base') - doesn't work
  ]);
  var options = resolveShredOptions(shredOptions);

  initializePackage(pkg)
    .factory(require('./fileShredder'))
    .factory(require('./regionExtractor'))
    .processor(require('./mdWrapperProcessor'))

    .config(function(readFilesProcessor, fileShredder ) {
      readFilesProcessor.fileReaders = [ fileShredder];
    })
    // default configs - may be overriden
    .config(function(readFilesProcessor) {
      // Specify the base path used when resolving relative paths to source and output files
      readFilesProcessor.basePath = options.basePath;

      // Specify collections of source files that should contain the documentation to extract
      var extns = ['*.js', '*.html', '*.ts', '*.css' ];
      var includeFiles = extns.map(function(extn) {
        if (options.includeSubdirs) {
          return path.join(options.examplesDir, '**', extn);
        } else {
          return path.join(options.examplesDir, extn);
        }
      });
      readFilesProcessor.sourceFiles = [ {
        // Process all candidate files in `src` and its subfolders ...
        include: includeFiles,
        // When calculating the relative path to these files use this as the base path.
        // So `src/foo/bar.js` will have relative path of `foo/bar.js`
        basePath: options.examplesDir
      } ];
    })
    .config(function(writeFilesProcessor) {
      // Specify where the writeFilesProcessor will write our generated doc files
      writeFilesProcessor.outputFolder  = options.fragmentsDir;
    });
  return pkg;
}

var createShredMapPackage = function(mapOptions) {
  var pkg = new Dgeni.Package('doc-shred-mapper', [
    require('dgeni-packages/base'),
    require('dgeni-packages/nunjucks')
  ]);
  var options = resolveMapOptions(mapOptions);

  initializePackage(pkg)
    .factory(require('./extractPathsReader'))
    .processor(require('./shredMapProcessor'))
    .config(function(shredMapProcessor) {
      shredMapProcessor.options = options;
    })
    .config(function(readFilesProcessor, extractPathsReader ) {
      readFilesProcessor.fileReaders = [ extractPathsReader];
    })
    // default configs - may be overriden
    .config(function(readFilesProcessor) {
      // Specify the base path used when resolving relative paths to source and output files
      readFilesProcessor.basePath = options.basePath;

      // Specify collections of source files that should contain the documentation to extract
      var extns = ['*.jade' ];
      var includeFiles = extns.map(function(extn) {
        if (options.includeSubdirs) {
          return path.join(options.jadeDir, '**', extn);
        } else {
          return path.join(options.jadeDir, extn);
        }
      });
      readFilesProcessor.sourceFiles = [ {
        // Process all candidate files in `src` and its subfolders ...
        include: includeFiles,
        // When calculating the relative path to these files use this as the base path.
        // So `src/foo/bar.js` will have relative path of `foo/bar.js`
        basePath: options.jadeDir
      } ];
    })
    .config(function(writeFilesProcessor) {
      // Specify where the writeFilesProcessor will write our generated doc files
      writeFilesProcessor.outputFolder  = options.outputDir;
    })
    .config(function(templateFinder) {
      // look for templates in this folder
      templateFinder.templateFolders = [ path.resolve(__dirname) ];

      // Specify how to match docs to templates.
      // In this case we just use the same static template for all docs
      templateFinder.templatePatterns = [ '${ doc.docType }.template' ];
    })
    .config(function(computePathsProcessor, computeIdsProcessor)  {
      computePathsProcessor.$enabled = false;
      computeIdsProcessor.$enabled = false;
      // Unused for now.
      //computePathsProcessor.pathTemplates.push({
      //  docTypes: ['foo'],
      //  pathTemplate: '',
      //  getOutputPath: function () {
      //  },
      //});
      //
      //computeIdsProcessor.idTemplates.push({
      //  docTypes: ['foo'],
      //  getAliases: function (doc) {
      //    return [doc.id];
      //  }
      //});
    });

  return pkg;
}

function resolveShredOptions(shredOptions) {
  return _.defaults({}, shredOptions, {
    basePath: path.resolve('.'),
    // read files from any subdir under here
    examplesDir: "docs/_examples",
    // shredded files get copied here with same subdir structure.
    fragmentsDir: "docs/_fragments",
    // whether to include subdirectories when shredding.
    includeSubdirs: true
  });
}

function resolveMapOptions(mapOptions) {
  return _.defaults({}, mapOptions, {
    basePath: path.resolve('.'),
    // read files from any subdir under here
    jadeDir: "docs",
    fragmentsDir: "docs/_fragments",
    examplesDir: "docs/_examples",
    // whether to include subdirectories when shredding.
    includeSubdirs: true
  });
}

function initializePackage(pkg) {
  return pkg
    .processor(require('dgeni-packages/base/processors/read-files'))
    .processor(require('dgeni-packages/base/processors/write-files'))
    .factory(require('dgeni-packages/base/services/writefile'))

    // Ugh... Boilerplate that dgeni needs to sequence operations
    .processor({ name: 'reading-files' })
    .processor({ name: 'files-read', $runAfter: ['reading-files'] })
    .processor({ name: 'processing-docs', $runAfter: ['files-read'] })
    .processor({ name: 'docs-processed', $runAfter: ['processing-docs'] })
    .processor({ name: 'adding-extra-docs', $runAfter: ['docs-processed'] })
    .processor({ name: 'extra-docs-added', $runAfter: ['adding-extra-docs'] })
    .processor({ name: 'computing-ids', $runAfter: ['extra-docs-added'] })
    .processor({ name: 'ids-computed', $runAfter: ['computing-ids'] })
    .processor({ name: 'computing-paths', $runAfter: ['ids-computed'] })
    .processor({ name: 'paths-computed', $runAfter: ['computing-paths'] })
    .processor({ name: 'rendering-docs', $runAfter: ['paths-computed'] })
    .processor({ name: 'docs-rendered', $runAfter: ['rendering-docs'] })
    .processor({ name: 'writing-files', $runAfter: ['docs-rendered'] })
    .processor({ name: 'files-written', $runAfter: ['writing-files'] })
    .config(function(log) {
      // Set logging level
      log.level = 'info';
    })
}