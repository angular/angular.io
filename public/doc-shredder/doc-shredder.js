// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');
var Q = require('q');
var del = require('del');
// delPromise is a 'promise' version of del
var delPromise =  Q.denodeify(del);
var Dgeni = require('dgeni');
var _ = require('lodash');

var createPackage = function(shredOptions) {
  var shredder = new Dgeni.Package('doc-shredder', [
    // require('dgeni-packages/base') - doesn't work
  ]);
  shredder.options = resolveOptions(shredOptions);
  return configure(shredder);
};

var resolveOptions = function(shredOptions) {
  return _.defaults({}, shredOptions, {
    basePath: path.resolve('.'),
    // read files from any subdir under here
    sourceDir: "docs/_examples",
    // shredded files get copied here with same subdir structure.
    destDir: "docs/_fragments",
    // whether to include subdirectories when shredding.
    includeSubdirs: true
  });
}

var shred = function(shredOptions) {
  try {
    var pkg = createPackage(shredOptions);
    var dgeni = new Dgeni([ pkg]);
    return dgeni.generate();
  } catch(x) {
    console.log(x.stack);
    throw x;
  }
}

var shredSingleDir = function(shredOptions, filePath) {
  shredOptions = resolveOptions(shredOptions);
  var root = path.resolve(shredOptions.basePath, shredOptions.sourceDir);
  var fileDir = path.dirname(filePath);
  var relativePath = path.relative(root, fileDir);
  var sourceDir = path.join(shredOptions.sourceDir, relativePath);
  var destDir = path.join(shredOptions.destDir, relativePath);
  var options = {
    basePath: shredOptions.basePath,
    includeSubdirs: false,
    sourceDir: sourceDir,
    destDir:  destDir
  }
  var cleanPath = path.join(shredOptions.basePath, destDir, '*.*')
  return delPromise([ cleanPath, '!**/*.ovr.*']).then(function(paths) {
    // console.log('Deleted files/folders:\n', paths.join('\n'));
    return shred(options);
  });
}

module.exports = {
  shred: shred,
  shredSingleDir: shredSingleDir,
  createPackage: createPackage,
  resolveOptions: resolveOptions
};

function configure(shredder) {
  var options = shredder.options;
  shredder
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

    .factory(require('./fileShredder'))
    .factory(require('./regionExtractor'))
    .processor(require('./mdWrapperProcessor'))

    .config(function(log) {
      // Set logging level
      log.level = 'info';
    })


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
          return path.join(options.sourceDir, '**', extn);
        } else {
          return path.join(options.sourceDir, extn);
        }
      });
      readFilesProcessor.sourceFiles = [
        {
          // Process all candidate files in `src` and its subfolders ...
          include: includeFiles,

          // When calculating the relative path to these files use this as the base path.
          // So `src/foo/bar.js` will have relative path of `foo/bar.js`
          basePath: options.sourceDir
        }
      ];
    })
    .config(function(writeFilesProcessor) {
      // Specify where the writeFilesProcessor will write our generated doc files
      writeFilesProcessor.outputFolder  = options.destDir;
    });
  return shredder;
}
