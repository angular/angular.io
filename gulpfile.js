var gulp = require('gulp');
var gutil = require('gulp-util');
var taskListing = require('gulp-task-listing');
var path = require('canonical-path');
var del = require('del');
var _ = require('lodash');
var argv = require('yargs').argv;
var Q = require("q");
// delPromise is a 'promise' version of del
var delPromise =  Q.denodeify(del);
var Minimatch = require("minimatch").Minimatch;
var Dgeni = require('dgeni');
var Package = require('dgeni').Package;
var fsExtra = require('fs-extra');
var fs = fsExtra;
var exec = require('child_process').exec;
var execPromise = Q.denodeify(exec);
// cross platform version of spawn that also works on windows.
var xSpawn = require('cross-spawn');
var prompt = require('prompt');
var globby = require("globby");
// Ugh... replacement needed to kill processes on any OS
// - because childProcess.kill does not work properly on windows
var treeKill = require("tree-kill");

// TODO:
//  1. Think about using runSequence
//  2. Think about using spawn instead of exec in case of long error messages.

var TOOLS_PATH = './tools';
var ANGULAR_PROJECT_PATH = '../angular';
var PUBLIC_PATH = './public';
var TEMP_PATH = './_temp';
var DOCS_PATH = path.join(PUBLIC_PATH, 'docs');

var EXAMPLES_PATH = path.join(DOCS_PATH, '_examples');
var NOT_API_DOCS_GLOB = path.join(PUBLIC_PATH, './{docs/*/latest/!(api),!(docs)}/**/*');
var RESOURCES_PATH = path.join(PUBLIC_PATH, 'resources');
var LIVE_EXAMPLES_PATH = path.join(RESOURCES_PATH, 'live-examples');

var docShredder = require(path.resolve(TOOLS_PATH, 'doc-shredder/doc-shredder'));
var exampleZipper = require(path.resolve(TOOLS_PATH, '_example-zipper/exampleZipper'));
var plunkerBuilder = require(path.resolve(TOOLS_PATH, 'plunker-builder/plunkerBuilder'));
var fsUtils = require(path.resolve(TOOLS_PATH, 'fs-utils/fsUtils'));

var _devguideShredOptions =  {
  examplesDir: path.join(DOCS_PATH, '_examples'),
  fragmentsDir: path.join(DOCS_PATH, '_fragments'),
  zipDir: path.join(RESOURCES_PATH, 'zips')
};

var _devguideShredJadeOptions =  {
  jadeDir: DOCS_PATH

};

var _apiShredOptions =  {
  examplesDir: path.join(ANGULAR_PROJECT_PATH, 'modules/angular2/examples'),
  fragmentsDir: path.join(DOCS_PATH, '_fragments/_api'),
  zipDir: path.join(RESOURCES_PATH, 'zips/api')
};

var _excludePatterns = ['**/node_modules/**', '**/typings/**', '**/packages/**'];

var _excludeMatchers = _excludePatterns.map(function(excludePattern){
  return new Minimatch(excludePattern)
});

var _exampleBoilerplateFiles = ['package.json', 'tsconfig.json', 'karma.conf.js', 'karma-test-shim.js' ];

// --filter may be passed in to filter/select _example app subdir names
// i.e. gulp run-e2e-tests --filter=foo  ; would select all example apps with
// 'foo' in their folder names.
gulp.task('run-e2e-tests', function() {
  var spawnInfo = spawnExt('npm', ['install'], { cwd: EXAMPLES_PATH});
  return spawnInfo.promise.then(function() {
    copyExampleBoilerplate();
    var exePath = path.join(process.cwd(), "./node_modules/.bin/");
    spawnInfo = spawnExt('webdriver-manager', ['update'], {cwd: exePath});
    return spawnInfo.promise;
  }).then(function() {
    return findAndRunE2eTests(argv.filter);
  }).then(function(status) {
    reportStatus(status);
  }).fail(function(e) {
    return e;
  });
});

// finds all of the *e2e-spec.tests under the _examples folder along
// with the corresponding apps that they should run under. Then run
// each app/spec collection sequentially.
function findAndRunE2eTests(filter) {
  var startTime = new Date().getTime();
  // create an output file with header.
  var outputFile = path.join(process.cwd(), 'protractor-results.txt');
  var header = "Protractor example results for: " + (new Date()).toLocaleString() + "\n\n";
  if (filter) {
    header += '  Filter: ' + filter.toString() + '\n\n';
  }
  fs.writeFileSync(outputFile, header);

  // create an array of combos where each
  // combo consists of { examplePath: ... , protractorConfigFilename:  ... }
  var exeConfigs = [];
  var e2eSpecPaths = getE2eSpecPaths(EXAMPLES_PATH);
  var srcConfig = path.join(EXAMPLES_PATH, 'protractor.config.js');
  e2eSpecPaths.forEach(function(specPath) {
    var destConfig = path.join(specPath, 'protractor.config.js');
    fsExtra.copySync(srcConfig, destConfig);
    // get all of the examples under each dir where a pcFilename is found
    examplePaths = getExamplePaths(specPath, true);
    if (filter) {
      examplePaths = examplePaths.filter(function (fn) {
        return fn.match(filter) != null;
      })
    }
    examplePaths.forEach(function(exPath) {
      exeConfigs.push( { examplePath: exPath, protractorConfigFilename: destConfig });
    })
  });

  // run the tests sequentially
  var status = { passed: [], failed: [] };
  return exeConfigs.reduce(function (promise, combo) {
    return promise.then(function () {
      return runE2eTests(combo.examplePath, combo.protractorConfigFilename, outputFile).then(function(ok) {
        var arr = ok ? status.passed : status.failed;
        arr.push(combo.examplePath);
      })
    });
  }, Q.resolve()).then(function() {
    var stopTime = new Date().getTime();
    status.elapsedTime = (stopTime - startTime)/1000;
    fs.appendFileSync(outputFile, '\nElaped Time: ' + status.elapsedTime + ' seconds');
    return status;
  });
}

// start the example in appDir; then run protractor with the specified
// fileName; then shut down the example.  All protractor output is appended
// to the outputFile.
function runE2eTests(appDir, protractorConfigFilename, outputFile ) {
  // start the app
  var appRunSpawnInfo = spawnExt('npm',['run','http-server', '--', '-s' ], { cwd: appDir });

  // start protractor
  var pcFilename = path.resolve(protractorConfigFilename); // need to resolve because we are going to be running from a different dir
  var exePath = path.join(process.cwd(), "./node_modules/.bin/");
  var spawnInfo = spawnExt('protractor',
    [ pcFilename, '--params.appDir=' + appDir, '--params.outputFile=' + outputFile], { cwd: exePath });
  return spawnInfo.promise.then(function(data) {
    // kill the app now that protractor has completed.
    // Ugh... proc.kill does not work properly on windows with child processes.
    // appRun.proc.kill();
    treeKill(appRunSpawnInfo.proc.pid);
    return true;
  }).fail(function(err) {
    // Ugh... proc.kill does not work properly on windows with child processes.
    // appRun.proc.kill();
    treeKill(appRunSpawnInfo.proc.pid);
    return false;
  });
}

function reportStatus(status) {
  gutil.log('Suites passed:');
  status.passed.forEach(function(val) {
    gutil.log('  ' + val);
  });

  gutil.log('Suites failed:');
  status.failed.forEach(function(val) {
    gutil.log('  ' + val);
  });

  if (status.failed.length == 0) {
    gutil.log('All tests passed');
  }
  gutil.log('Elapsed time: ' +  status.elapsedTime + ' seconds');
}

// returns both a promise and the spawned process so that it can be killed if needed.
function spawnExt(command, args, options) {
  var deferred = Q.defer();
  var descr = command + " " + args.join(' ');
  var proc;
  gutil.log('running: ' + descr);
  try {
    proc = xSpawn.spawn(command, args, options);
  } catch(e) {
    gutil.log(e);
    deferred.reject(e);
    return { proc: null, promise: deferred.promise };
  }
  proc.stdout.on('data', function (data) {
    gutil.log(data.toString());
  });
  proc.stderr.on('data', function (data) {
    gutil.log(data.toString());
  });
  proc.on('close', function (data) {
    gutil.log('completed: ' + descr);
    deferred.resolve(data);
  });
  proc.on('error', function (data) {
    gutil.log('completed with error:' + descr);
    gutil.log(data.toString());
    deferred.reject(data);
  });
  return { proc: proc, promise: deferred.promise };
}

// Public tasks

gulp.task('default', ['help']);

gulp.task('help', taskListing.withFilters(function(taskName) {
  var isSubTask = taskName.substr(0,1) == "_";
  return isSubTask;
}, function(taskName) {
  var shouldRemove = taskName === 'default';
  return shouldRemove;
}));

// requires admin access
gulp.task('add-example-boilerplate', function() {
  var realPath = path.join(EXAMPLES_PATH, '/node_modules');
  var nodeModulesPaths = getNodeModulesPaths(EXAMPLES_PATH);

  nodeModulesPaths.forEach(function(linkPath) {
    gutil.log("symlinking " + linkPath + ' -> ' + realPath)
    fsUtils.addSymlink(realPath, linkPath);
  });
  copyExampleBoilerplate();
});

// copies boilerplate files to locations
// where an example app is found
// also copies protractor.config.js file
function copyExampleBoilerplate() {
  var sourceFiles = _exampleBoilerplateFiles.map(function(fn) {
    return path.join(EXAMPLES_PATH, fn);
  });
  var examplePaths = getExamplePaths(EXAMPLES_PATH);
  // copies protractor.config.js from _examples dir to each subdir that
  // contains a e2e-spec file.
  return copyFiles(sourceFiles, examplePaths).then(function() {
    var sourceFiles = [ path.join(EXAMPLES_PATH, 'protractor.config.js') ];
    var e2eSpecPaths = getE2eSpecPaths(EXAMPLES_PATH);
    return copyFiles(sourceFiles, e2eSpecPaths);
  });
}

gulp.task('remove-example-boilerplate', function() {
  var nodeModulesPaths = getNodeModulesPaths(EXAMPLES_PATH);
  nodeModulesPaths.forEach(function(linkPath) {
    fsUtils.removeSymlink(linkPath);
  });
  var examplePaths = getExamplePaths(EXAMPLES_PATH);
  return deleteFiles(_exampleBoilerplateFiles, examplePaths).then(function() {
    var e2eSpecPaths = getE2eSpecPaths(EXAMPLES_PATH);
    return deleteFiles(['protractor.config.js'], e2eSpecPaths);
  })
});

gulp.task('serve-and-sync', ['build-docs'], function (cb) {
  // watchAndSync({devGuide: true, apiDocs: true, apiExamples: true, localFiles: true}, cb);
  watchAndSync({devGuide: true, devGuideJade: true, apiDocs: true, apiExamples: true, localFiles: true}, cb);
});

gulp.task('serve-and-sync-api', ['build-docs'], function (cb) {
  watchAndSync({apiDocs: true, apiExamples: true}, cb);
});

gulp.task('serve-and-sync-devguide', ['build-devguide-docs', 'build-plunkers' ], function (cb) {
  watchAndSync({devGuide: true, devGuideJade: true, localFiles: true}, cb);
});

gulp.task('_serve-and-sync-jade', function (cb) {
  watchAndSync({devGuideJade: true, localFiles: true}, cb);
});

gulp.task('build-and-serve', ['build-docs'], function (cb) {
  watchAndSync({localFiles: true}, cb);
});

gulp.task('build-docs', ['build-devguide-docs', 'build-api-docs', 'build-plunkers', '_zip-examples']);

gulp.task('build-api-docs', ['build-js-api-docs', 'build-ts-api-docs', 'build-dart-cheatsheet']);

gulp.task('build-devguide-docs', ['_shred-devguide-examples', '_shred-devguide-shared-jade'], function() {
  return buildShredMaps(true);
});

gulp.task('build-ts-api-docs', ['_shred-api-examples'], function() {
  return buildApiDocs('ts');
});

gulp.task('build-js-api-docs', ['_shred-api-examples'], function() {
  return buildApiDocs('js');
});

gulp.task('build-plunkers', function() {
  return plunkerBuilder.buildPlunkers(EXAMPLES_PATH, LIVE_EXAMPLES_PATH, { errFn: gutil.log });
});

gulp.task('build-dart-cheatsheet', [], function() {
  return buildApiDocs('dart');
});

gulp.task('git-changed-examples', ['_shred-devguide-examples'], function(){
  var after, sha, messageSuffix;
  if (argv.after) {
    try {
      after = new Date(argv.after);
      messageSuffix = ' after: ' + argv.after;
    } catch (e) {
      throw argv.after + " is not a valid date.";
    }
  } else if (argv.sha) {
    sha = argv.sha;
    messageSuffix = ' on commit: ' + (argv.sha.length ? argv.sha : '[last commit]');
  } else {
    gutil.log('git-changed-examples may be called with either an "--sha" argument like this:');
    gutil.log('   gulp git-changed-examples --sha=4d2ac96fa247306ddd2d4c4e0c8dee2223502eb2');
    gutil.log('or with an "--after" argument like this')
    gutil.log('   gulp git-changed-examples --after="August 1, 2015"');
    return;
  }
  var jadeShredMap;
  return buildShredMaps(false).then(function(docs) {
    jadeShredMap = docs[0];
    if (after) {
      return getChangedExamplesAfter(after);
    } else if (sha) {
      return getChangedExamples(sha);
    } else {
      gutil.log('git-changed-examples may be called with either an "--sha" argument like this:');
      gutil.log('   gulp git-changed-examples --sha=4d2ac96fa247306ddd2d4c4e0c8dee2223502eb2');
      gutil.log('or with an "--after" argument like this')
      gutil.log('   gulp git-changed-examples --after="August 1, 2015"');
    }
  }).then(function(examplePaths) {
    examplePaths = filterOutExcludedPatterns(examplePaths, _excludeMatchers);
    gutil.log('\nExamples changed ' + messageSuffix);
    gutil.log(examplePaths)
    gutil.log("\nJade files affected by changed example files " + messageSuffix);
    var jadeExampleMap = jadeShredMapToJadeExampleMap(jadeShredMap, examplePaths);
    gutil.log(JSON.stringify(jadeExampleMap, null, "  "));
    gutil.log("-----");
  }).catch(function(err) {
    gutil.log(err);
    throw err;
  });
});

gulp.task('check-deploy', ['build-docs'], function() {
  return harpCompile().then(function() {
    gutil.log('compile ok - running live server ...');
    execPromise('npm run live-server ./www');
    return askDeploy();
  }).then(function(shouldDeploy) {
    if (shouldDeploy) {
      gutil.log('deploying...');
      return execPromise('firebase deploy');
    } else {
      return ['Not deploying'];
    }
  }).then(function(s) {
    gutil.log(s.join(''));
  }).catch(function(e) {
    gutil.log(e);
  });
});

gulp.task('test-api-builder', function (cb) {
  execCommands(['npm run test-api-builder'], {}, cb);
});


// Internal tasks

// used to test just harpCompile without a build step
gulp.task('_harp-compile', function() {
  return harpCompile().then(function() {
    gutil.log('compile ok');
  }).catch(function(e) {
    gutil.log('compile failed');
  });
});

gulp.task('_shred-devguide-examples', ['_shred-clean-devguide'], function() {
  return docShredder.shred( _devguideShredOptions);
});

gulp.task('_shred-devguide-shared-jade', ['_shred-clean-devguide-shared-jade'],  function() {
  return docShredder.shred( _devguideShredJadeOptions);
});

gulp.task('_shred-clean-devguide-shared-jade', function(cb) {
  var cleanPath = path.join(DOCS_PATH, '**/_.*.jade')
  return delPromise([ cleanPath]);
});

gulp.task('_shred-clean-devguide', function(cb) {
  var cleanPath = path.join(_devguideShredOptions.fragmentsDir, '**/*.*')
  return delPromise([ cleanPath, '!**/*.ovr.*', '!**/_api/**']);
});

gulp.task('_shred-api-examples', ['_shred-clean-api'], function() {
  checkAngularProjectPath();
  return docShredder.shred( _apiShredOptions);
});

gulp.task('_shred-clean-api', function(cb) {
  var cleanPath = path.join(_apiShredOptions.fragmentsDir, '**/*.*')
  return delPromise([ cleanPath, '!**/*.ovr.*' ]);
});

gulp.task('_zip-examples', function() {
  exampleZipper.zipExamples(_devguideShredOptions.examplesDir, _devguideShredOptions.zipDir);
  exampleZipper.zipExamples(_apiShredOptions.examplesDir, _apiShredOptions.zipDir);
});


// Helper functions

function harpCompile() {
  var deferred = Q.defer();
  gutil.log('running harp compile...');
  showHideExampleNodeModules('hide');
  var spawnInfo = spawnExt('npm',['run','harp', '--', 'compile', '.', './www' ]);
  spawnInfo.promise.then(function(x) {
    showHideExampleNodeModules('show');
    if (x !== 0) {
      deferred.reject(x)
    } else {
      deferred.resolve(x);
    }
  }).catch(function(e) {
    showHideExampleNodeModules('show');
    deferred.reject(e);
  });
  return deferred.promise;
}

// harp has issues with node_modules under the public dir
// but we need them there for example testing and development
// this method allows the node modules folder under '_examples'
// to be temporarily moved out from under 'public' while harp
// compilation is occurring.
function showHideExampleNodeModules(showOrHide) {
  var nmPath = path.join(EXAMPLES_PATH, "/node_modules");
  var nmHiddenPath = path.join(TEMP_PATH, "/node_modules");
  if (showOrHide == 'hide' && fs.existsSync(nmPath)) {
    if (!fs.existsSync(TEMP_PATH)) {
      fs.mkdirSync(TEMP_PATH);
    }
    fs.renameSync(nmPath, nmHiddenPath);
  } else if (showOrHide == 'show' && fs.existsSync(nmHiddenPath)) {
    fs.renameSync(nmHiddenPath, nmPath);
    fs.rmdirSync(TEMP_PATH);
  }
}


// returns a promise
function copyFiles(fileNames, destPaths) {
  var copy = Q.denodeify(fsExtra.copy);
  var copyPromises = [];
  destPaths.forEach(function(destPath) {
    fileNames.forEach(function(fileName) {
      var baseName = path.basename(fileName);
      var destName = path.join(destPath, baseName);
      var p = copy(fileName, destName, { clobber: true});
      copyPromises.push(p);
    });
  });
  return Q.all(copyPromises);
}

function deleteFiles(baseFileNames, destPaths) {
  var remove = Q.denodeify(fsExtra.remove);
  var delPromises = [];
  destPaths.forEach(function(destPath) {
    baseFileNames.forEach(function(baseFileName) {
      var destFileName = path.join(destPath, baseFileName);
      var p = remove(destFileName);
      delPromises.push(p);
    });
  });
  return Q.all(delPromises);
}

// TODO: filter out all paths that are subdirs of another
// path in the result.
function getE2eSpecPaths(basePath) {
  var paths = getPaths(basePath, '*e2e-spec.js', true);
  return _.uniq(paths);
}

function getNodeModulesPaths(basePath) {
  var paths = getExamplePaths(basePath).map(function(examplePath) {
    return path.join(examplePath, "/node_modules");
  });
  return paths;
}

function getExamplePaths(basePath, includeBase) {
  // includeBase defaults to false
  return getPaths(basePath, "example-config.json", includeBase)
}

function getPaths(basePath, filename, includeBase) {
  var filenames = getFilenames(basePath, filename, includeBase);
  var paths = filenames.map(function(fileName) {
    return path.dirname(fileName);
  });
  return paths;
}

function getFilenames(basePath, filename, includeBase) {
  // includeBase defaults to false
  var includePatterns = [path.join(basePath, "**/" + filename)];
  if (!includeBase) {
    // ignore (skip) the top level version.
    includePatterns.push("!" + path.join(basePath, "/" + filename));
  }
  var nmPattern = path.join(basePath, "**/node_modules/**");
  var filenames = globby.sync(includePatterns, {ignore: [nmPattern]});
  return filenames;
}

function watchAndSync(options, cb) {

  execCommands(['npm run harp -- server .'], {}, cb);

  var browserSync = require('browser-sync').create();
  browserSync.init({proxy: 'localhost:9000'});

  if (options.devGuide) {
    devGuideExamplesWatch(_devguideShredOptions, browserSync.reload);
  }
  if (options.devGuideJade) {
    devGuideSharedJadeWatch( { jadeDir: DOCS_PATH}, browserSync.reload);
  }
  if (options.apiDocs) {
    apiSourceWatch(browserSync.reload);
  }
  if (options.apiExamples) {
    apiExamplesWatch(browserSync.reload);
  }
  if (options.localFiles) {
    gulp.watch(NOT_API_DOCS_GLOB, browserSync.reload);
  }
}

// returns a promise;
function askDeploy() {

  prompt.start();
  var schema = {
    name: 'shouldDeploy',
    description: 'Deploy to Firebase? (y/n): ',
    type: 'string',
    pattern: /Y|N|y|n/,
    message: "Respond with either a 'y' or 'n'",
    required: true
  }
  var getPromise = Q.denodeify(prompt.get);
  return getPromise([schema]).then(function(result) {
    return result.shouldDeploy.toLowerCase() === 'y';
  });
}


function filterOutExcludedPatterns(fileNames, excludeMatchers) {
  return fileNames.filter(function(fileName) {
    return !excludeMatchers.some(function(excludeMatcher) {
      return excludeMatcher.match(fileName);
    });
  });
}

function apiSourceWatch(postBuildAction) {
  var srcPattern = [path.join(ANGULAR_PROJECT_PATH, 'modules/angular2/src/**/*.*')];
  gulp.watch(srcPattern, {readDelay: 500}, function (event, done) {
    gutil.log('API source changed');
    gutil.log('Event type: ' + event.event); // added, changed, or deleted
    gutil.log('Event path: ' + event.path); // The path of the modified file

    return Q.all([buildApiDocs('ts'), buildApiDocs('js')]).then(postBuildAction);
  });
}

function apiExamplesWatch(postShredAction) {
  var examplesPath = path.join(ANGULAR_PROJECT_PATH, 'modules/angular2/examples/**');
  var includePattern = path.join(examplesPath, '**/*.*');
  var excludePattern = '!' + path.join(examplesPath, '**/node_modules/**/*.*');
  var cleanPath = [path.join(_apiShredOptions.fragmentsDir, '**/*.*'), '!**/*.ovr.*'];

  gulp.watch([includePattern, excludePattern], {readDelay: 500}, function (event, done) {
    gutil.log('API example changed');
    gutil.log('Event type: ' + event.type); // added, changed, or deleted
    gutil.log('Event path: ' + event.path); // The path of the modified file

    return delPromise(cleanPath).then(function() {
      return docShredder.shred(_apiShredOptions);
    }).then(postShredAction);
  });
}

function devGuideExamplesWatch(shredOptions, postShredAction) {
  var includePattern = path.join(shredOptions.examplesDir, '**/*.*');
  var excludePattern = '!' + path.join(shredOptions.examplesDir, '**/node_modules/**/*.*');
  // removed this version because gulp.watch has the same glob issue that dgeni has.
  // gulp.watch([includePattern, excludePattern], {readDelay: 500}, function (event, done) {
  var files = globby.sync( [includePattern], { ignore: [ '**/node_modules/**']});
  gulp.watch([files], {readDelay: 500}, function (event, done) {
    gutil.log('Dev Guide example changed')
    gutil.log('Event type: ' + event.type); // added, changed, or deleted
    gutil.log('Event path: ' + event.path); // The path of the modified file
    return docShredder.shredSingleDir(shredOptions, event.path).then(postShredAction);
  });
}

function devGuideSharedJadeWatch(shredOptions, postShredAction) {
  var includePattern = path.join(DOCS_PATH, '**/*.jade');
  // removed this version because gulp.watch has the same glob issue that dgeni has.
  // var excludePattern = '!' + path.join(shredOptions.jadeDir, '**/node_modules/**/*.*');
  // gulp.watch([includePattern, excludePattern], {readDelay: 500}, function (event, done) {
  var files = globby.sync( [includePattern], { ignore: [ '**/node_modules/**', '**/_.*.jade']});
  gulp.watch([files], {readDelay: 500}, function (event, done) {
    gutil.log('Dev Guide jade file changed')
    gutil.log('Event type: ' + event.type); // added, changed, or deleted
    gutil.log('Event path: ' + event.path); // The path of the modified file
    return docShredder.shredSingleJadeDir(shredOptions, event.path).then(postShredAction);
  });
}


// Generate the API docs for the specified language, if not specified then it defaults to ts
function buildApiDocs(targetLanguage) {
  var ALLOWED_LANGUAGES = ['ts', 'js', 'dart'];
  var GENERATE_API_LANGUAGES = ['ts', 'js'];
  checkAngularProjectPath();
  try {
    // Build a specialized package to generate different versions of the API docs
    var package = new Package('apiDocs', [require(path.resolve(TOOLS_PATH, 'api-builder/angular.io-package'))]);
    package.config(function(targetEnvironments, writeFilesProcessor, readTypeScriptModules) {
      ALLOWED_LANGUAGES.forEach(function(target) { targetEnvironments.addAllowed(target); });
      if (targetLanguage) {
        targetEnvironments.activate(targetLanguage);

        if (GENERATE_API_LANGUAGES.indexOf(targetLanguage) === -1) {
          // Don't read TypeScript modules if we are not generating API docs - Dart I am looking at you!
          readTypeScriptModules.$enabled = false;
        }
        writeFilesProcessor.outputFolder  = targetLanguage + '/latest/api';
      }
    });

    var dgeni = new Dgeni([package]);
    return dgeni.generate();
  } catch(err) {
    gutil.log(err);
    gutil.log(err.stack);
    throw err;
  }

  function copyApiDocsToJsFolder() {
    // Make a copy of the JS API docs to the TS folder
    return gulp.src([path.join(DOCS_PATH, 'ts/latest/api/**/*.*'), '!' + path.join(DOCS_PATH, 'ts/latest/api/index.jade')])
      .pipe(gulp.dest('./public/docs/js/latest/api'));
  }
}

function buildShredMaps(shouldWrite) {
  var options = {
    devguideExamplesDir: _devguideShredOptions.examplesDir,
    apiExamplesDir: _apiShredOptions.examplesDir,
    fragmentsDir: _devguideShredOptions.fragmentsDir,
    jadeDir: './public/docs',
    outputDir: './public/docs',
    writeFilesEnabled: shouldWrite
  };
  return docShredder.buildShredMap(options).then(function(docs) {
    return docs;
  });
}

// returns a promise containing filePaths with any changed or added examples;
function getChangedExamples(sha) {
  var Git = require("nodegit");
  var examplesPath = _devguideShredOptions.examplesDir;
  var relativePath = path.relative(process.cwd(), examplesPath);
  return Git.Repository.open(".").then(function(repo) {
    if (sha.length) {
      return repo.getCommit(sha);
    } else {
      return repo.getHeadCommit();
    }
  }).then(function(commit) {
    return getChangedExamplesForCommit(commit, relativePath);
  }).catch(function(err) {

  });
}

function getChangedExamplesAfter(date, relativePath) {
  var Git = require("nodegit");
  var examplesPath = _devguideShredOptions.examplesDir;
  var relativePath = path.relative(process.cwd(), examplesPath);
  return Git.Repository.open(".").then(function(repo) {
    return repo.getHeadCommit();
  }).then(function(commit) {
    var repo = commit.owner();
    var revWalker = repo.createRevWalk();
    revWalker.sorting(Git.Revwalk.SORT.TIME);
    revWalker.push(commit.id());
    return revWalker.getCommitsUntil(function (commit) {
      return commit.date().getTime() > date.getTime();
    });
  }).then(function(commits) {
    return Q.all(commits.map(function(commit) {
      return getChangedExamplesForCommit(commit, relativePath);
    }));
  }).then(function(arrayOfPaths) {
    var pathMap = {};
    arrayOfPaths.forEach(function(paths) {
      paths.forEach(function(path) {
        pathMap[path] = true;
      });
    });
    var uniqPaths = _.keys(pathMap);
    return uniqPaths;
  }).catch(function(err) {
    var x = err;
  });

}

function getChangedExamplesForCommit(commit, relativePath) {
  return commit.getDiff().then(function(diffList) {
    var filePaths = [];
    diffList.forEach(function (diff) {
      diff.patches().forEach(function (patch) {
        if (patch.isAdded() || patch.isModified) {
          var filePath = path.normalize(patch.newFile().path());
          var isExample = filePath.indexOf(relativePath) >= 0;
          // gutil.log(filePath + " isExample: " + isExample);
          if (isExample) {
            filePaths.push(filePath);
          }
        }
      });
    });
    return filePaths;
  });
}



function jadeShredMapToJadeExampleMap(jadeShredMap, examplePaths) {
  // remove dups in examplePaths
  var exampleSet = {};
  examplePaths.forEach(function(examplePath) {
    exampleSet[examplePath] = examplePath;
  });
  var basePath = path.resolve(".");
  var jadeToFragMap = jadeShredMap.jadeToFragMap;
  var jadeExampleMap = {};
  for (var jadePath in jadeToFragMap) {
    var relativeJadePath = path.relative(basePath, jadePath);
    var vals = jadeToFragMap[jadePath];
    vals.forEach(function(val) {
      var relativeExamplePath = path.relative(basePath, val.examplePath);
      if (exampleSet[relativeExamplePath] != null) {
        addKeyValue(jadeExampleMap, relativeJadePath, relativeExamplePath);
      }
    });
  }
  return jadeExampleMap;
}

function jadeShredMapToExampleJadeMap(jadeShredMap) {

  var jadeToFragMap = jadeShredMap.jadeToFragMap;
  var exampleJadeMap = {};
  for (var jadePath in jadeToFragMap) {
    var vals = jadeToFragMap[jadePath];
    vals.forEach(function(val) {
      var examplePath = val.examplePath;
      addKeyValue(exampleJadeMap, examplePath, jadePath);
    });
  }
  return exampleJadeMap;
}

function addKeyValue(map, key, value) {
  var vals = map[key];
  if (vals) {
    if (vals.indexOf(value) == -1) {
      vals.push(value);
    }
  } else {
    map[key] = [value];
  }
}


// Synchronously execute a chain of commands.
// cmds: an array of commands
// options: { shouldLog: true,  shouldThrow: true }
// cb: function(err, stdout, stderr)
function execCommands(cmds, options, cb) {
  options = options || {};
  options.shouldThrow = options.shouldThrow == null ? true : options.shouldThrow;
  options.shouldLog = options.shouldLog == null ? true : options.shouldLog;
  if (!cmds || cmds.length == 0) cb(null, null, null);
  var exec = require('child_process').exec;  // just to make it more portable.
  exec(cmds[0], options, function(err, stdout, stderr) {
    if (err == null) {
      if (options.shouldLog) {
        gutil.log('cmd: ' + cmds[0]);
        gutil.log('stdout: ' + stdout);
      }
      if (cmds.length == 1) {
        cb(err, stdout, stderr);
      } else {
        execCommands(cmds.slice(1), options, cb);
      }
    } else {
      if (options.shouldLog) {
        gutil.log('exec error on cmd: ' + cmds[0]);
        gutil.log('exec error: ' + err);
        if (stdout) gutil.log('stdout: ' + stdout);
        if (stderr) gutil.log('stderr: ' + stderr);
      }
      if (err && options.shouldThrow) throw err;
      cb(err, stdout, stderr);
    }
  });
}

function checkAngularProjectPath() {
  if (!fs.existsSync(ANGULAR_PROJECT_PATH)) {
    throw new Error('API related tasks require the angular2 repo to be at ' + path.resolve(ANGULAR_PROJECT_PATH));
  }
}

