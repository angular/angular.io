var gulp = require('gulp');
var gutil = require('gulp-util');
var taskListing = require('gulp-task-listing');
var path = require('canonical-path');
var del = require('del');
var _ = require('lodash');
var argv = require('yargs').argv;
var env = require('gulp-env');
var Q = require("q");
var Minimatch = require("minimatch").Minimatch;
var Dgeni = require('dgeni');
var Package = require('dgeni').Package;
var fsExtra = require('fs-extra');
var fs = fsExtra;
var exec = require('child_process').exec;
var execPromise = Q.denodeify(exec);
var execSync = require('child_process').execSync;
// cross platform version of spawn that also works on windows.
var xSpawn = require('cross-spawn');
var prompt = require('prompt');
var globby = require("globby");
// Ugh... replacement needed to kill processes on any OS
// - because childProcess.kill does not work properly on windows
var treeKill = require("tree-kill");
var blc = require("broken-link-checker");
var less = require('gulp-less');
var tslint = require('gulp-tslint');

// TODO:
//  1. Think about using runSequence
//  2. Think about using spawn instead of exec in case of long error messages.

var TOOLS_PATH = './tools';
var ANGULAR_IO_PROJECT_PATH = path.resolve('.');
var ANGULAR_PROJECT_PATH = '../angular';
var PUBLIC_PATH = './public';
var TEMP_PATH = './_temp';
var DOCS_PATH = path.join(PUBLIC_PATH, 'docs');

var EXAMPLES_PATH = path.join(DOCS_PATH, '_examples');
var BOILERPLATE_PATH = path.join(EXAMPLES_PATH, '_boilerplate');
var EXAMPLES_TESTING_PATH = path.join(EXAMPLES_PATH, 'testing/ts');
var NOT_API_DOCS_GLOB = path.join(PUBLIC_PATH, './{docs/*/latest/!(api),!(docs)}/**/*.*');
var RESOURCES_PATH = path.join(PUBLIC_PATH, 'resources');
var LIVE_EXAMPLES_PATH = path.join(RESOURCES_PATH, 'live-examples');
var STYLES_SOURCE_PATH = path.join(TOOLS_PATH, 'styles-builder/less');

var docShredder = require(path.resolve(TOOLS_PATH, 'doc-shredder/doc-shredder'));
var ExampleZipper = require(path.resolve(TOOLS_PATH, 'example-zipper/exampleZipper'));
var regularPlunker = require(path.resolve(TOOLS_PATH, 'plunker-builder/regularPlunker'));
var embeddedPlunker = require(path.resolve(TOOLS_PATH, 'plunker-builder/embeddedPlunker'));
var fsUtils = require(path.resolve(TOOLS_PATH, 'fs-utils/fsUtils'));

const WWW = argv.page ? 'www-pages' : 'www'

const isSilent = !!argv.silent;
if (isSilent) gutil.log = gutil.noop;
const _dgeniLogLevel = argv.dgeniLog || (isSilent ? 'error' : 'info');

var _devguideShredOptions =  {
  examplesDir: path.join(DOCS_PATH, '_examples'),
  fragmentsDir: path.join(DOCS_PATH, '_fragments'),
  zipDir: path.join(RESOURCES_PATH, 'zips'),
  logLevel: _dgeniLogLevel
};

var _devguideShredJadeOptions =  {
  jadeDir: DOCS_PATH,
  logLevel: _dgeniLogLevel
};

var _apiShredOptions =  {
  lang: 'ts',
  examplesDir: path.join(ANGULAR_PROJECT_PATH, 'modules/@angular/examples'),
  fragmentsDir: path.join(DOCS_PATH, '_fragments/_api'),
  zipDir: path.join(RESOURCES_PATH, 'zips/api'),
  logLevel: _dgeniLogLevel
};

var _excludePatterns = ['**/node_modules/**', '**/packages/**'];

var _excludeMatchers = _excludePatterns.map(function(excludePattern){
  return new Minimatch(excludePattern)
});

var _exampleBoilerplateFiles = [
  'src/styles.css',
  'src/systemjs.config.js',
  'src/systemjs-angular-loader.js',
  'src/tsconfig.json',
  'bs-config.json',
  'bs-config.e2e.json',
  'package.json',
  'tslint.json'
];

var _exampleUnitTestingBoilerplateFiles = [
  'src/browser-test-shim.js',
  'karma-test-shim.js',
  'karma.conf.js'
];

var _exampleConfigFilename = 'example-config.json';

// Gulp flags:
//
//   --lang=[all | ts | js | dart | 'ts|js' | 'ts|js|dart' | ...]
//
//    This affects which language API docs and E2E tests are run. Can be 'all',
//    or a regex pattern to match any one of 'ts', 'js', or 'dart'.
//    Default: 'ts|js' except for the "full site build" tasks (see below),
//    for which it is 'all'.

// langs and skipLangs partition ['ts', 'js', 'dart'].
var lang, langs, skipLangs, buildDartApiDocs = false;
function configLangs(langOption) {
  const fullSiteBuildTasks = ['build-compile', 'check-deploy', 'harp-compile'];
  const buildAllDocs = argv['_'] &&
    fullSiteBuildTasks.some((task) => argv['_'].indexOf(task) >= 0);
  const langDefault = /*buildAllDocs ? 'all' :*/ 'ts|js';
  if (langOption === '') {
    lang = '';
    langs = [];
  } else {
    lang = (langOption || langDefault).toLowerCase();
    if (lang === 'all') lang = 'ts|js|dart';
    langs = lang.match(/\w+/g); // the languages in `lang` as an array
  }
  gutil.log(`Building docs for: [${langs}]`);
  if (langs.indexOf('dart') >= 0) {
    buildDartApiDocs = true;
    // For Dart, be proactive about checking for the repo
    checkAngularProjectPath(ngPathFor('dart'));
  } else {
    argv.pub = false;
  }
  skipLangs = [];
  ['ts', 'js', 'dart'].forEach(lang => {
    if (langs.indexOf(lang) < 0) skipLangs.push(lang);
  });
  gutil.log(`Skipped languages: [${skipLangs}]`);
}
configLangs(argv.lang);

function isDartPath(path) {
  // Testing via indexOf() for now. If we need to match only paths with folders
  // named 'dart' vs 'dart*' then try: path.match('/dart(/|$)') != null;
  return path.indexOf('/dart') > -1;
}

function excludeDartPaths(paths) {
  return paths.filter(function (p) { return !isDartPath(p); });
}

/**
 * Run Protractor End-to-End Specs for Doc Samples
 * Alias for 'run-e2e-tests'
 */
gulp.task('e2e', runE2e);

gulp.task('run-e2e-tests', runE2e);

/**
 * Run Protractor End-to-End Tests for Doc Samples
 *
 * Flags
 *   --filter to filter/select _example app subdir names
 *    e.g. gulp e2e --filter=foo  // all example apps with 'foo' in their folder names.
 *
 *    --fast by-passes the npm install and webdriver update
 *    Use it for repeated test runs (but not the FIRST run)
 *    e.g. gulp e2e --fast
 *
 *   --lang to filter by code language (see above for details)
 *     e.g. gulp e2e --lang=ts  // only TypeScript apps
 */
function runE2e() {
  var promise;
  if (argv.fast) {
    // fast; skip all setup
    promise = Promise.resolve(true);
  } else  {
    // Not 'fast'; do full setup
    gutil.log('runE2e: install _examples stuff');
    var spawnInfo = spawnExt('npm', ['install'], { cwd: EXAMPLES_PATH});
    promise = spawnInfo.promise
      .then(copyExampleBoilerplate)
      .then(function() {
        gutil.log('runE2e: update webdriver');
        spawnInfo = spawnExt('npm', ['run', 'webdriver:update'], {cwd: EXAMPLES_PATH});
        return spawnInfo.promise;
      });
  };

  var outputFile = path.join(process.cwd(), 'protractor-results.txt');

  promise.then(function() {
    return findAndRunE2eTests(argv.filter, outputFile);
  }).then(function(status) {
    reportStatus(status, outputFile);
    if (status.failed.length > 0){
      return Promise.reject('Some test suites failed');
    }
  }).catch(function(e) {
    gutil.log(e);
    process.exitCode = 1;
  });
  return promise;
}

// finds all of the *e2e-spec.tests under the _examples folder along
// with the corresponding apps that they should run under. Then run
// each app/spec collection sequentially.
function findAndRunE2eTests(filter, outputFile) {
  // create an output file with header.
  var startTime = new Date().getTime();
  var header = `Doc Sample Protractor Results for ${lang} on ${new Date().toLocaleString()}\n`;
  header += argv.fast ?
    '  Fast Mode (--fast): no npm install, webdriver update, or boilerplate copy\n' :
    '  Slow Mode: npm install, webdriver update, and boilerplate copy\n';
  header += `  Filter: ${filter ? filter : 'All tests'}\n\n`;
  fs.writeFileSync(outputFile, header);

  // create an array of combos where each
  // combo consists of { examplePath: ... }
  var examplePaths = [];
  var e2eSpecPaths = getE2eSpecPaths(EXAMPLES_PATH);
   e2eSpecPaths.forEach(function(specPath) {
    // get all of the examples under each dir where a pcFilename is found
    localExamplePaths = getExamplePaths(specPath, true);
    // Filter by example name
    if (filter) {
      localExamplePaths = localExamplePaths.filter(function (fn) {
        return fn.match(filter) != null;
      })
    }
    // Filter by language, also supports variations like js-es6
    localExamplePaths = localExamplePaths.filter(function (fn) {
      return fn.match('/'+lang+'(?:-[^/]*)?$') != null;
    });
    localExamplePaths.forEach(function(examplePath) {
      examplePaths.push(examplePath);
    })
  });

  // run the tests sequentially
  var status = { passed: [], failed: [] };
  return examplePaths.reduce(function (promise, examplePath) {
    return promise.then(function () {
      var runTests = isDartPath(examplePath) ? runE2eDartTests : runE2eTsTests;
      return runTests(examplePath, outputFile).then(function(ok) {
        var arr = ok ? status.passed : status.failed;
        arr.push(examplePath);
      })
    });
  }, Q.resolve()).then(function() {
    var stopTime = new Date().getTime();
    status.elapsedTime = (stopTime - startTime)/1000;
    return status;
  });
}

// start the example in appDir; then run protractor with the specified
// fileName; then shut down the example.  All protractor output is appended
// to the outputFile.
function runE2eTsTests(appDir, outputFile) {
  // Grab protractor configuration or defaults to systemjs config.
  try {
    var exampleConfig = fs.readJsonSync(`${appDir}/${_exampleConfigFilename}`);
  } catch (e) {
    exampleConfig = {};
  }

  var config = {
    build: exampleConfig.build || 'build',
    run: exampleConfig.run || 'serve:e2e'
  };

  var appBuildSpawnInfo = spawnExt('npm', ['run', config.build], { cwd: appDir });
  var appRunSpawnInfo = spawnExt('npm', ['run', config.run, '--', '-s'], { cwd: appDir });

  var run = runProtractor(appBuildSpawnInfo.promise, appDir, appRunSpawnInfo, outputFile);

  if (fs.existsSync(appDir + '/aot/index.html')) {
    run = run.then(() => runProtractorAoT(appDir, outputFile));
  }
  return run;
}

function runProtractor(prepPromise, appDir, appRunSpawnInfo, outputFile) {
  var specFilename = path.resolve(`${appDir}/../e2e-spec.ts`);
  return prepPromise
    .catch(function(){
      var emsg = `Application at ${appDir} failed to transpile.\n\n`;
      gutil.log(emsg);
      fs.appendFileSync(outputFile, emsg);
      return Promise.reject(emsg);
    })
    .then(function (data) {
      var transpileError = false;

      // start protractor

      var spawnInfo = spawnExt('npm', [ 'run', 'protractor', '--', 'protractor.config.js',
        `--specs=${specFilename}`, '--params.appDir=' + appDir, '--params.outputFile=' + outputFile], { cwd: EXAMPLES_PATH });

      spawnInfo.proc.stderr.on('data', function (data) {
        transpileError = transpileError || /npm ERR! Exit status 100/.test(data.toString());
      });
      return spawnInfo.promise.catch(function(err) {
        if (transpileError) {
        var emsg = `${specFilename} failed to transpile.\n\n`;
        gutil.log(emsg);
        fs.appendFileSync(outputFile, emsg);
        }
        return Promise.reject(emsg);
      });
    })
    .then(
       function() { return finish(true);},
       function() { return finish(false);}
    )

    function finish(ok){
      // Ugh... proc.kill does not work properly on windows with child processes.
      // appRun.proc.kill();
      treeKill(appRunSpawnInfo.proc.pid);
      return ok;
    }
}

function runProtractorAoT(appDir, outputFile) {
  fs.appendFileSync(outputFile, '++ AoT version ++\n');
  var aotBuildSpawnInfo = spawnExt('npm', ['run', 'build:aot'], { cwd: appDir });
  var promise = aotBuildSpawnInfo.promise;

  var copyFileCmd = 'copy-dist-files.js';
  if (fs.existsSync(appDir + '/' + copyFileCmd)) {
    promise = promise.then(() =>
     spawnExt('node', [copyFileCmd], { cwd: appDir }).promise );
  }
  var aotRunSpawnInfo = spawnExt('npm', ['run', 'serve:aot'], { cwd: appDir });
  return runProtractor(promise, appDir, aotRunSpawnInfo, outputFile);
}

// start the server in appDir/build/web; then run protractor with the specified
// fileName; then shut down the example.  All protractor output is appended
// to the outputFile.
function runE2eDartTests(appDir, outputFile) {
  // Launch http server out of ts directory because all the config files are there.
  var httpLaunchDir = path.resolve(appDir, '../ts');
  var deployDir = path.resolve(appDir, 'build/web');
  gutil.log('AppDir for Dart e2e: ' + appDir);
  gutil.log('Deploying from: ' + deployDir);

  var appRunSpawnInfo = spawnExt('npm', ['run', 'serve:e2e', '--', deployDir, '-s'], { cwd: httpLaunchDir });
  if (!appRunSpawnInfo.proc.pid) {
    gutil.log('http-server failed to launch over ' + deployDir);
    return false;
  }
  if (argv.pub === false) {
    var prepPromise = Promise.resolve(true);
    gutil.log('Skipping pub upgrade and pub build (--no-pub flag present)');
  } else {
    var pubUpgradeSpawnInfo = spawnExt('pub', ['upgrade'], { cwd: appDir });
    var prepPromise = pubUpgradeSpawnInfo.promise.then(function (data) {
      return spawnExt('pub', ['build'], { cwd: appDir }).promise;
    });
  }
  return runProtractor(prepPromise, appDir, appRunSpawnInfo, outputFile);
}

function reportStatus(status, outputFile) {
  var log = [''];
  log.push('Suites passed:');
  status.passed.forEach(function(val) {
    log.push('  ' + val);
  });

  if (status.failed.length == 0) {
    log.push('All tests passed');
  } else {
    log.push('Suites failed:');
    status.failed.forEach(function (val) {
      log.push('  ' + val);
    });
  }
  log.push('\nElapsed time: ' +  status.elapsedTime + ' seconds');
  var log = log.join('\n');
  gutil.log(log);
  fs.appendFileSync(outputFile, log);
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
  proc.on('close', function (returnCode) {
    gutil.log('completed: ' + descr);
    // Many tasks (e.g., tsc) complete but are actually errors;
    // Confirm return code is zero.
    returnCode === 0 ? deferred.resolve(0) : deferred.reject(returnCode);
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

// requires admin access because it adds symlinks
gulp.task('add-example-boilerplate', function() {
  var realPath = path.join(EXAMPLES_PATH, '/node_modules');
  var nodeModulesPaths = excludeDartPaths(getNodeModulesPaths(EXAMPLES_PATH));

  nodeModulesPaths.forEach(function(linkPath) {
    gutil.log("symlinking " + linkPath + ' -> ' + realPath)
    fsUtils.addSymlink(realPath, linkPath);
  });

  return copyExampleBoilerplate();
});


// copies boilerplate files to locations
// where an example app is found
gulp.task('_copy-example-boilerplate', function (done) {
  return argv.fast ? done() : copyExampleBoilerplate();
});

// copies boilerplate files to locations
// where an example app is found
// also copies certain web files (e.g., styles.css) to ~/_examples/**/dart/**/web
function copyExampleBoilerplate() {
  gutil.log('Copying example boilerplate files');
  var examplePaths = excludeDartPaths(getExamplePaths(EXAMPLES_PATH));

  // Make boilerplate files read-only to avoid that they be edited by mistake.
  var destFileMode = '444';
  return copyFiles(_exampleBoilerplateFiles, BOILERPLATE_PATH, examplePaths, destFileMode)
    // copy the unit test boilerplate
    .then(function() {
      var unittestPaths = getUnitTestingPaths(EXAMPLES_PATH);
      return copyFiles(_exampleUnitTestingBoilerplateFiles,
        EXAMPLES_TESTING_PATH, unittestPaths, destFileMode);
    })
    .catch(function(err) {
      gutil.log(err);
      throw err;
    });
}

gulp.task('remove-example-boilerplate', function() {
  var nodeModulesPaths = getNodeModulesPaths(EXAMPLES_PATH);
  nodeModulesPaths.forEach(function(linkPath) {
    fsUtils.removeSymlink(linkPath);
  });

  deleteExampleBoilerPlate();
});

// Npm install Angular libraries into examples/node_modules,
// either release or current build packages
// Examples:
//   gulp install-example-angular --build  // use current build packages
//   gulp install-example-angular --build=2.0.0-b43f954  // use tagged packages
//   gulp install-example-angular          // restore release packages
//
// Find the tags here: https://github.com/angular/core-builds/releases
gulp.task('install-example-angular', installExampleAngular);

function installExampleAngular() {
  var sources;
  var template;
  var libs = [
    'core', 'common', 'compiler', 'compiler-cli',
    'platform-browser', 'platform-browser-dynamic',
    'forms', 'http', 'router', 'upgrade'];

  var build = argv.build;
  if (build) {
    if (typeof build === 'string') {
      build = (build[0]==='#' ? '' : '#') + build;
    } else {
      build = '';
    }
  } else{
    build = 'npm';
  }
  // Like: "angular/core-builds" or "@angular/core"
  sources = libs.map( lib => {
    return build === 'npm'
      ? `@angular/${lib}`
      : `git+https://github.com/angular/${lib}-builds${build}`;
  });

  if (argv.build) { sources.push('@angular/tsc-wrapped');} // tsc-wrapped needed for builds

  sources.push('@angular/router-deprecated');

  gutil.log(`Installing Angular packages from ${build === 'npm' ? 'NPM' : 'BUILD ' + build}`);

  var spawnInfo = spawnExt('rm', ['-rf', 'node_modules/@angular'], { cwd: EXAMPLES_PATH});
  return spawnInfo.promise
    .then(() =>  {
      spawnInfo = spawnExt('npm', ['install', ...sources], {cwd: EXAMPLES_PATH});
      return spawnInfo.promise
    });
}

// deletes boilerplate files that were added by copyExampleBoilerplate
// from locations where an example app is found
gulp.task('_delete-example-boilerplate', deleteExampleBoilerPlate);

function deleteExampleBoilerPlate() {
  gutil.log('Deleting example boilerplate files');
  var examplePaths = getExamplePaths(EXAMPLES_PATH);
  var dartExampleWebPaths = getDartExampleWebPaths(EXAMPLES_PATH);
  var unittestPaths = getUnitTestingPaths(EXAMPLES_PATH);

  return deleteFiles(_exampleBoilerplateFiles, examplePaths)
    .then(function() {
      return deleteFiles(_exampleUnitTestingBoilerplateFiles, unittestPaths);
    });
}

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

gulp.task('build-api-docs', ['build-js-api-docs', 'build-ts-api-docs']);

gulp.task('build-devguide-docs', ['_shred-devguide-examples', '_shred-devguide-shared-jade'], function() {
  return buildShredMaps(true);
});

gulp.task('build-ts-api-docs', ['_shred-api-examples'], function() {
  return buildApiDocs('ts');
});

gulp.task('build-js-api-docs', ['_shred-api-examples'], function() {
  return buildApiDocs('js');
});

// Using the --build flag will use systemjs.config.web.build.js (for preview builds)
gulp.task('build-plunkers', ['_copy-example-boilerplate'], function() {
  regularPlunker.buildPlunkers(EXAMPLES_PATH, LIVE_EXAMPLES_PATH, { errFn: gutil.log, build: argv.build });
  return embeddedPlunker.buildPlunkers(EXAMPLES_PATH, LIVE_EXAMPLES_PATH, { errFn: gutil.log, build: argv.build, targetSelf: argv.targetSelf });
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

gulp.task('harp-compile', () => {
  return harpCompile()
});

gulp.task('harp-serve', () => {
  // Harp will watch and serve workspace files.
  const cmd = 'npm run harp -- server .';
  gutil.log('Launching harp server (over project files)');
  gutil.log(`  > ${cmd}`);
  gutil.log('Note: issuing this command directly from the command line will show harp comiple warnings.');
  return execPromise(cmd);
});

gulp.task('serve-www', () => {
  // Serve generated site.
  return execPromise(`npm run live-server ${WWW}`);
});

gulp.task('build-compile', ['build-docs'], function() {
  return harpCompile();
});

gulp.task('check-deploy', ['firebase-use-proj-check', 'build-docs'], () => {
  return harpCompile().then(function() {
    gutil.log('compile ok');
    gutil.log('running live server ...');
    execPromise(`npm run live-server ${WWW}`);
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

gulp.task('firebase-use-proj-check', cb => {
  try {
    execSync('firebase use');
  } catch (e) {
    // Rerun command so user gets project + alias info
    execSync('firebase use', {stdio:[0,1,2]});
    throw `\nAborting: no firebase project selected. Run:\n\n  firebase use <project-or-alias-name>\n\n`;
  }
  return cb();
});

gulp.task('test-api-builder', function (cb) {
  execCommands(['npm run test-api-builder'], {}, cb);
});

// Usage:
//   angular.io:  gulp link-checker
//   local site:  gulp link-checker --url=http://localhost:3000
gulp.task('link-checker', function(done) {
  var method = 'get'; // the default 'head' fails for some sites
  var exclude = [
    // Dart API docs aren't working yet; ignore them
    '*/dart/latest/api/*',
    // Somehow the link checker sees ng1 {{...}} in the resource page; ignore it
    'resources/%7B%7Bresource.url%7D%7D',
    // API docs have links directly into GitHub repo sources; these can
    // quickly become invalid, so ignore them for now:
    '*/angular/tree/*',
    // harp.json "bios" for "Ryan Schmukler", URL isn't valid:
    'http://slingingcode.com'
  ];
  var blcOptions = { requestMethod: method, excludedKeywords: exclude};
  return linkChecker({ blcOptions: blcOptions });
});


// Internal tasks
gulp.task('set-prod-env', function () {
  // Supposedly running in production makes harp faster
  // and less likely to drown in node_modules.
  env({
    vars: { NODE_ENV: "production" }
  });
  gutil.log("NODE_ENV: " + process.env.NODE_ENV);
});

// used to test just harpCompile without a build step
gulp.task('_harp-compile', function() {
  return harpCompile().then(function() {
    gutil.log('compile ok');
  }).catch(function(e) {
    gutil.log('compile failed');
  });
});

gulp.task('_shred-devguide-examples', ['_shred-clean-devguide', '_copy-example-boilerplate'], function() {
  // Split big shredding task into partials 2016-06-14
  const exPath = path.join(EXAMPLES_PATH, (argv.filter || '') + '*');
  var examplePaths = globby.sync(exPath, {ignore: ['**/node_modules', '**/_boilerplate']});
  var promise = Promise.resolve(true);
  examplePaths.forEach(function (examplePath) {
    promise = promise.then(() => docShredder.shredSingleExampleDir(_devguideShredOptions, examplePath));
  });
  return promise;
});

gulp.task('_shred-devguide-shared-jade', ['_shred-clean-devguide-shared-jade', '_copy-example-boilerplate'],  function() {
  return docShredder.shred(_devguideShredJadeOptions);
});

gulp.task('_shred-clean-devguide-shared-jade', function(cb) {
  // oldCleanPath is only needed to cleanup any jade fragments still sitting in the old location
  var oldCleanPath = path.join(DOCS_PATH, '**/_.*.jade');
  // jade fragments now all go into _fragments subdirs under their source.
  var newCleanPath = path.join(DOCS_PATH, '**/_fragments/*.jade');
  // Much slower 8-9x then using globby first ... ???
  // return del([ newCleanPath, oldCleanPath]);
  var files = globby.sync( [newCleanPath, oldCleanPath]);
  return del(files);
});

gulp.task('_shred-clean-devguide', function(cb) {
  var cleanPath = path.join(_devguideShredOptions.fragmentsDir, (argv.filter || '*') + '*/*.*')
  return del([ cleanPath, '!**/*.ovr.*', '!**/_api/**']);
});

gulp.task('_shred-api-examples', ['_shred-clean-api'], function() {
  const promises = [];
  gutil.log('Shredding API examples for languages: ' + langs.join(', '));
  langs.forEach(lang => {
    if (lang === 'js') return; // JS is handled via TS.
    checkAngularProjectPath(ngPathFor(lang));
    promises.push(docShredder.shred(_apiShredOptions));
  });
  return Q.all(promises);
});

gulp.task('_shred-clean-api', function(cb) {
  var cleanPath = path.join(_apiShredOptions.fragmentsDir, '**/*.*')
  return del([ cleanPath, '!**/*.ovr.*' ]);
});

gulp.task('_zip-examples', function() {
  new ExampleZipper(_devguideShredOptions.examplesDir, _devguideShredOptions.zipDir);
  // exampleZipper.zipExamples(_apiShredOptions.examplesDir, _apiShredOptions.zipDir);
});


// Linting

gulp.task('lint', function() {
  return gulp.src([
      './public/docs/_examples/**/*.ts',
      '!./public/docs/_examples/**/ts-snippets/*.ts',
      '!./public/docs/_examples/style-guide/ts/**/*.avoid.ts',
      '!./public/docs/_examples/**/node_modules/**/*',
      '!./public/docs/_examples/**/build/**/*',
      // temporary until codelyzer is fixed mgechev/codelyzer#60
      '!./public/docs/_examples/animations/ts/app/hero.service.ts'
    ])
    .pipe(tslint({
      rulesDirectory: ['node_modules/codelyzer'],
      configuration: require('./tslint.json')
    }))
    .pipe(tslint.report('prose', {
      summarizeFailureOutput: true
    }));
});


// Helper functions

function harpCompile() {
  // Supposedly running in production makes harp faster
  // and less likely to drown in node_modules.
  env({ vars: { NODE_ENV: "production" } });
  gutil.log("NODE_ENV: " + process.env.NODE_ENV);

  if(argv.page) harpJsonSetJade2NgTo(true);

  if(skipLangs && fs.existsSync(WWW) && backupApiHtmlFilesExist(WWW)) {
    gutil.log(`Harp site recompile: skipping recompilation of API docs for [${skipLangs}]`);
    gutil.log(`API docs will be copied from existing ${WWW} folder (if they exist).`)
    del.sync(`${WWW}-backup`); // remove existing backup if it exists
    renameIfExistsSync(WWW, `${WWW}-backup`);
  } else {
    gutil.log(`Harp full site compile, including API docs for all languages.`);
    if (skipLangs)
      gutil.log(`Ignoring API docs skip set (${skipLangs}) because full ` +
      `site has not been built yet or some API HTML files are missing.`);
  }

  var deferred = Q.defer();
  gutil.log('running harp compile...');
  showHideExampleNodeModules('hide');
  showHideApiDir('hide');
  var spawnInfo = spawnExt('npm',['run','harp', '--', 'compile', '.', WWW ]);
  spawnInfo.promise.then(function(x) {
    gutil.log("NODE_ENV: " + process.env.NODE_ENV);
    showHideExampleNodeModules('show');
    showHideApiDir('show');
    harpJsonSetJade2NgTo(false);
    if (x !== 0) {
      deferred.reject(x)
    } else {
      restoreApiHtml();
      deferred.resolve(x);
    }
  }).catch(function(e) {
    gutil.log("NODE_ENV: " + process.env.NODE_ENV);
    showHideExampleNodeModules('show');
    showHideApiDir('show');
    harpJsonSetJade2NgTo(false);
    deferred.reject(e);
  });
  return deferred.promise;
}

function linkChecker(options) {
  var deferred = Q.defer();
  var options = options || {};

  var blcOptions = options.blcOptions || {};
  var customData = options.customData || {};

  // don't bother reporting bad links matching this RegExp
  var excludeBad = argv.excludeBad ? new RegExp(argv.excludeBad) : (options.excludeBad || '');

  var previousPage;
  var siteUrl = argv.url || options.url || 'https://v2.angular.io/';

  // See https://github.com/stevenvachon/broken-link-checker#blcsitecheckeroptions-handlers
  var handlers = {
    robots: function(robots, customData){},
    html: function(tree, robots, response, pageUrl, customData){
      // gutil.log('Scanning ' + pageUrl);
    },
    junk: function(result, customData){},

    // Analyze links
    link: function(result, customData){
      if (!result.broken) { return; }
      if (excludeBad && excludeBad.test(result.url.resolved)) { return; }

      var currentPage = result.base.resolved
      if (previousPage !== currentPage) {
        previousPage = currentPage;
        fs.appendFileSync(outputFile, '\n' + currentPage);
        gutil.log('broken: ' + currentPage);
      }
      var msg = '\n  [' + result.html.location.line + ', ' + result.brokenReason + '] ' + result.url.resolved;
      fs.appendFileSync(outputFile, msg);
      // gutil.log(msg);
      // gutil.log(result);
    },

    page: function(error, pageUrl, customData){},
    site: function(error, siteUrl, customData){},

    end: function(){
      var stopTime = new Date().getTime();
      var elapsed = 'Elapsed link-checking time: ' + ((stopTime - startTime)/1000) + ' seconds';
      gutil.log(elapsed);
      fs.appendFileSync(outputFile, '\n'+elapsed);
      gutil.log('Output in file: ' + outputFile);
      deferred.resolve(true);
    }
  };

  // create an output file with header.
  var outputFile = path.join(process.cwd(), 'link-checker-results.txt');
  var header = 'Link checker results for: ' + siteUrl +
               '\nStarted: ' + (new Date()).toLocaleString() +
               '\nExcluded links (blc file globs): ' + blcOptions.excludedKeywords +
               '\nExcluded links (custom --exclude-bad regex): ' + excludeBad.toString() + '\n\n';
  gutil.log(header);
  fs.writeFileSync(outputFile, header);

  var siteChecker = new blc.SiteChecker(blcOptions, handlers);
  var startTime = new Date().getTime();

  try {
    gutil.log('link checker started');
    siteChecker.enqueue(siteUrl, customData);
  } catch (err) {
    gutil.log('link checker died');
    console.error('link checker died', err);
    deferred.reject(err);
  }
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

// Show/hide the API docs harp source folder for every lang in skipLangs.
function showHideApiDir(showOrHide) {
  skipLangs.forEach(lang => {
    _showHideApiDir(lang, showOrHide);
  });
}

// Rename the API docs harp source folder for lang to/from 'api' to '_api-tmp-foo'.
function _showHideApiDir(lang, showOrHide) {
  const vers = 'latest';
  const basePath = path.join(DOCS_PATH, lang, vers);
  const apiDirPath = path.join(basePath, 'api');
  const disabledApiDirPath = path.join(basePath, '_api-tmp-hide-from-jade');
  const args = showOrHide == 'hide'
    ? [apiDirPath, disabledApiDirPath]
    : [disabledApiDirPath, apiDirPath];
  renameIfExistsSync(...args);
}

// For each lang in skipLangs, copy the API dir from ${WWW}-backup to WWW.
function restoreApiHtml() {
  const vers = 'latest';
  skipLangs.forEach(lang => {
    const relApiDir = path.join('docs', lang, vers, 'api');
    const apiSubdir = path.join(WWW, relApiDir);
    const backupApiSubdir = path.join(`${WWW}-backup`, relApiDir);
    if (fs.existsSync(backupApiSubdir)) {
      gutil.log(`cp ${backupApiSubdir} ${apiSubdir}`)
      fs.copySync(backupApiSubdir, apiSubdir);
    }
  });
}

// For each lang in skipLangs, ensure API dir exists in folderName
function backupApiHtmlFilesExist(folderName) {
  const vers = 'latest';
  var result = 1;
  skipLangs.forEach(lang => {
    if (lang === 'dart') return true;
    const relApiDir = path.join('docs', lang, vers, 'api');
    const backupApiSubdir = path.join(folderName, relApiDir);
    if (!fs.existsSync(backupApiSubdir)) {
      gutil.log(`WARNING: API docs HTML folder doesn't exist: ${backupApiSubdir}`);
      result = 0;
    }
  });
  return result;
}

function harpJsonSetJade2NgTo(v) {
  const harpJsonPath = path.join(ANGULAR_IO_PROJECT_PATH, 'harp.json');
  execSync(`perl -pi -e 's/("jade2ng": *)\\w+/$1${v}/' ${harpJsonPath}`);
  const harpJson = require(harpJsonPath);
  gutil.log(`jade2ng: ${harpJson.globals.jade2ng}`);
}

// Copies fileNames into destPaths, setting the mode of the
// files at the destination as optional_destFileMode if given.
// returns a promise
function copyFiles(fileNames, originPath, destPaths, optional_destFileMode) {
  var copy = Q.denodeify(fsExtra.copy);
  var chmod = Q.denodeify(fsExtra.chmod);
  var copyPromises = [];
  destPaths.forEach(function(destPath) {
    fileNames.forEach(function(fileName) {
      var originName = path.join(originPath, fileName);
      var destName = path.join(destPath, fileName);
      var p = copy(originName, destName, { clobber: true});
      if(optional_destFileMode !== undefined) {
        p = p.then(function () {
          return chmod(destName, optional_destFileMode);
        });
      }
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
  var paths = getPaths(basePath, '*e2e-spec.+(js|ts)', true);
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
  return getPaths(basePath, _exampleConfigFilename, includeBase);
}

function getDartExampleWebPaths(basePath) {
  var paths = globby.sync([path.join(basePath,"**/dart/**/web")])
  return paths;
}

function getUnitTestingPaths(basePath) {
  var examples = getPaths(basePath, _exampleConfigFilename, true);
  return examples.filter((example) => {
    var exampleConfig = fs.readJsonSync(`${example}/${_exampleConfigFilename}`, {throws: false});
    return exampleConfig && !!exampleConfig.unittesting;
  });
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
  // ignore (skip) the files in BOILERPLATE_PATH.
  includePatterns.push("!" + path.join(BOILERPLATE_PATH, "/" + filename));
  var nmPattern = path.join(basePath, "**/node_modules/**");
  var filenames = globby.sync(includePatterns, {ignore: [nmPattern]});
  return filenames;
}

function watchAndSync(options, cb) {
  // Supposedly running in production makes harp faster
  // and less likely to drown in node_modules.
  env({
    vars: { NODE_ENV: "production" }
  });

  execCommands(['npm run harp -- server .'], {}, cb);

  var browserSync = require('browser-sync').create();
  browserSync.init({proxy: 'localhost:9000'});

  // When using the --focus=name flag, only **/name/**/*.* example files and
  // **/name.jade files are watched. This is useful for performance reasons.
  // Example: gulp serve-and-sync --focus=architecture
  var focus = argv.focus;

  if (options.devGuide) {
    devGuideExamplesWatch(_devguideShredOptions, browserSync.reload, focus);
  }
  if (options.devGuideJade) {
    devGuideSharedJadeWatch( { jadeDir: DOCS_PATH}, browserSync.reload, focus);
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
  // Show user what the currently active firebase project is:
  execSync('firebase use', {stdio:[0,1,2]});
  prompt.start();
  var schema = {
    name: 'shouldDeploy',
    description: `Deploy ${WWW} to firebase? (y/n)`,
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
  var srcPattern = [path.join(ANGULAR_PROJECT_PATH, 'modules/@angular/**/*.*')];
  gulp.watch(srcPattern, {readDelay: 500}, function (event, done) {
    gutil.log('API source changed');
    gutil.log('Event type: ' + event.event); // added, changed, or deleted
    gutil.log('Event path: ' + event.path); // The path of the modified file

    return Q.all([buildApiDocs('ts'), buildApiDocs('js')]).then(postBuildAction);
  });
}

function apiExamplesWatch(postShredAction) {
  var examplesPath = path.join(ANGULAR_PROJECT_PATH, 'modules/@angular/examples/**');
  var includePattern = path.join(examplesPath, '**/*.*');
  var excludePattern = '!' + path.join(examplesPath, '**/node_modules/**/*.*');
  var cleanPath = [path.join(_apiShredOptions.fragmentsDir, '**/*.*'), '!**/*.ovr.*'];

  gulp.watch([includePattern, excludePattern], {readDelay: 500}, function (event, done) {
    gutil.log('API example changed');
    gutil.log('Event type: ' + event.type); // added, changed, or deleted
    gutil.log('Event path: ' + event.path); // The path of the modified file

    return del(cleanPath).then(function() {
      return docShredder.shred(_apiShredOptions);
    }).then(postShredAction);
  });
}

function devGuideExamplesWatch(shredOptions, postShredAction, focus) {
  var watchPattern = focus ? '{' + focus + ',cb-' + focus+ '}/**/*.*' : '**/*.*';
  var includePattern = path.join(shredOptions.examplesDir, watchPattern);
  // removed this version because gulp.watch has the same glob issue that dgeni has.
  // var excludePattern = '!' + path.join(shredOptions.examplesDir, '**/node_modules/**/*.*');
  // gulp.watch([includePattern, excludePattern], {readDelay: 500}, function (event, done) {
  var ignoreThese = [ '**/node_modules/**', '**/_fragments/**', '**/dist/**',
                      '**/dart/.pub/**', '**/dart/build/**', '**/dart/packages/**'];
  ignoreThese = ignoreThese.concat(_exampleBoilerplateFiles.map((file) => `public/docs/_examples/*/*/${file}`));
  var files = globby.sync( [includePattern], { ignore: ignoreThese });
  gulp.watch([files], {readDelay: 500}, function (event, done) {
    gutil.log('Dev Guide example changed')
    gutil.log('Event type: ' + event.type); // added, changed, or deleted
    gutil.log('Event path: ' + event.path); // The path of the modified file
    return docShredder.shredSingleDir(shredOptions, event.path).then(postShredAction);
  });
}

function devGuideSharedJadeWatch(shredOptions, postShredAction, focus) {
  var watchPattern = focus ? '**/' + focus + '.jade' : '**/*.jade';
  var includePattern = path.join(DOCS_PATH, watchPattern);
  // removed this version because gulp.watch has the same glob issue that dgeni has.
  // var excludePattern = '!' + path.join(shredOptions.jadeDir, '**/node_modules/**/*.*');
  // gulp.watch([includePattern, excludePattern], {readDelay: 500}, function (event, done) {
  var ignoreThese = [ '**/node_modules/**', '**/_examples/**', '**/_fragments/**', '**/latest/api/**' ];
  var files = globby.sync( [includePattern], { ignore: ignoreThese});
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
    package.config(function(log, targetEnvironments, writeFilesProcessor, readTypeScriptModules, linkDocsInlineTagDef) {
      log.level = _dgeniLogLevel;
      ALLOWED_LANGUAGES.forEach(function(target) { targetEnvironments.addAllowed(target); });
      if (targetLanguage) {
        targetEnvironments.activate(targetLanguage);

        if (GENERATE_API_LANGUAGES.indexOf(targetLanguage) === -1) {
          // Don't read TypeScript modules if we are not generating API docs - Dart I am looking at you!
          readTypeScriptModules.$enabled = false;
        }
        linkDocsInlineTagDef.lang = targetLanguage;
        linkDocsInlineTagDef.vers = 'latest';
        writeFilesProcessor.outputFolder  = path.join(targetLanguage, linkDocsInlineTagDef.vers, 'api');
      }
    });

    var dgeni = new Dgeni([package]);
    return dgeni.generate();
  } catch(err) {
    console.error(err);
    console.error(err.stack);
    throw err;
  }
}

function buildShredMaps(shouldWrite) {
  var options = {
    devguideExamplesDir: _devguideShredOptions.examplesDir,
    apiExamplesDir: _apiShredOptions.examplesDir,
    fragmentsDir: _devguideShredOptions.fragmentsDir,
    jadeDir: './public/docs',
    outputDir: './public/docs',
    writeFilesEnabled: shouldWrite,
    logLevel: _dgeniLogLevel
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
      diff.patches().then(function (patch) {
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
  gutil.log("NODE_ENV: " + process.env.NODE_ENV);

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

function ngPathFor(lang) {
  return ANGULAR_PROJECT_PATH + (lang === 'dart' ? '-dart' : '');
}

function checkAngularProjectPath(_ngPath) {
  var ngPath = path.resolve(_ngPath || ngPathFor('ts'));
  if (fs.existsSync(ngPath)) return;
  throw new Error('API related tasks require the angular2 repo to be at ' + ngPath);
}

function renameIfExistsSync(oldPath, newPath) {
  if (fs.existsSync(oldPath)) {
    gutil.log(`Rename: mv ${oldPath} ${newPath}`);
    fs.renameSync(oldPath, newPath);
  } else {
    gutil.log(`renameIfExistsSync cannot rename, path not found: ${oldPath}`);
  }
}
