var gulp = require('gulp');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var taskListing = require('gulp-task-listing');
var path = require('canonical-path');
var del = require('del');
var _ = require('lodash');
var Git = require("nodegit");
var argv = require('yargs').argv;
var Q = require("q");
// delPromise is a 'promise' version of del
var delPromise =  Q.denodeify(del);
var Minimatch = require("minimatch").Minimatch;
var Dgeni = require('dgeni');
var fsExtra = require('fs-extra');
var fs = fsExtra;
var exec = require('child_process').exec;
var execPromise = Q.denodeify(exec);
var prompt = require('prompt');

// TODO:
//  1. Think about using runSequence
//  2. Think about using spawn instead of exec in case of long error messages.


var docShredder = require('./public/doc-shredder/doc-shredder');

var _devguideShredOptions =  {
  examplesDir: './public/docs/_examples',
  fragmentsDir: './public/docs/_fragments'
};

var _apiShredOptions =  {
  examplesDir: '../angular/modules/angular2/examples',
  fragmentsDir: './public/docs/_fragments/_api'
};


var _excludePatterns = ['**/node_modules/**', '**/typings/**', '**/packages/**'];

var _excludeMatchers = _excludePatterns.map(function(excludePattern){
  return new Minimatch(excludePattern)
});


gulp.task('help', taskListing.withFilters(function(taskName) {
  var isSubTask = taskName.substr(0,1) == "_";
  return isSubTask;
}, function(taskName) {
  var shouldRemove = taskName === 'default';
  return shouldRemove;
}));

gulp.task('serve-and-sync', ['build-docs'], function (cb) {

  // execCommands(['harp server'], {}, cb);
  execCommands(['npm run harp -- server .'], {}, cb);

  var browserSync = require('browser-sync').create();
  browserSync.init({
    proxy: 'localhost:9000',
    files: ["public/docs/**/*/**/*" ],
    logFileChanges: true,
    reloadDelay: 500
  });

  devGuideExamplesWatch(_devguideShredOptions, function() {
    browserSync.reload();
  });

  apiSourceWatch(function() {
    browserSync.reload();
  });

});

gulp.task('build-and-serve', ['build-docs'], function (cb) {
  execCommands(['npm run harp -- server .'], {}, cb);

  var browserSync = require('browser-sync').create();
  browserSync.init({
    proxy: 'localhost:9000',
    files: ["public/docs/**/*/**/*" ],
    logFileChanges: true,
    reloadDelay: 500
  });
});

gulp.task('build-docs', ['_shred-devguide-examples', 'build-api-docs'], function() {
  return buildShredMaps(true);
});

gulp.task('build-devguide-docs', ['_shred-devguide-examples'], function() {
  return buildShredMaps(true);
});

gulp.task('build-api-docs', ['_shred-api-examples'], function() {
  if (!fs.existsSync('../angular')) {
    throw new Error('build-api-docs task requires the angular2 repo to be at ' + path.resolve('../angular'));
  }
  return buildApiDocs();
});

gulp.task('_shred-devguide-examples', ['_shred-clean-devguide'], function() {
  return docShredder.shred( _devguideShredOptions);
});

gulp.task('_shred-clean-devguide', function(cb) {
  var cleanPath = path.join(_devguideShredOptions.fragmentsDir, '**/*.*')
  return delPromise([ cleanPath, '!**/*.ovr.*', '!**/_api/**']);
});

gulp.task('_shred-api-examples', ['_shred-clean-api'], function() {
  return docShredder.shred( _apiShredOptions);
});

gulp.task('_shred-clean-api', function(cb) {
  var cleanPath = path.join(_apiShredOptions.fragmentsDir, '**/*.*')
  return delPromise([ cleanPath, '!**/*.ovr.*' ]);
});

gulp.task('_build-shred-maps', function() {
  return build-shred-maps(true);
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
    console.log('git-changed-examples may be called with either an "--sha" argument like this:');
    console.log('   gulp git-changed-examples --sha=4d2ac96fa247306ddd2d4c4e0c8dee2223502eb2');
    console.log('or with an "--after" argument like this')
    console.log('   gulp git-changed-examples --after="August 1, 2015"');
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
      console.log('git-changed-examples may be called with either an "--sha" argument like this:');
      console.log('   gulp git-changed-examples --sha=4d2ac96fa247306ddd2d4c4e0c8dee2223502eb2');
      console.log('or with an "--after" argument like this')
      console.log('   gulp git-changed-examples --after="August 1, 2015"');
    }
  }).then(function(examplePaths) {
    examplePaths = filterOutExcludedPatterns(examplePaths, _excludeMatchers);
    console.log('\nExamples changed ' + messageSuffix);
    console.log(examplePaths)
    console.log("\nJade files affected by changed example files " + messageSuffix);
    var jadeExampleMap = jadeShredMapToJadeExampleMap(jadeShredMap, examplePaths);
    console.log(JSON.stringify(jadeExampleMap, null, "  "));
    console.log("-----");
  }).catch(function(err) {
    console.log(err);
    throw err;
  });
});

gulp.task('check-deploy', ['build-docs'], function() {
  console.log('running harp compile...');
  return execPromise('npm run harp -- compile . ./www', {}).then(function() {
    execPromise('npm run live-server ./www');
    return askDeploy();
  }).then(function(shouldDeploy) {
    if (shouldDeploy) {
      console.log('deploying...');
      return execPromise('firebase deploy');
    } else {
      return ['Not deploying'];
    }
  }).then(function(s) {
    console.log(s.join(''));
  });
});

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


gulp.task('test-api-builder', function (cb) {
  execCommands(['npm run test-api-builder'], {}, cb);
});

function filterOutExcludedPatterns(fileNames, excludeMatchers) {
  return fileNames.filter(function(fileName) {
    return !excludeMatchers.some(function(excludeMatcher) {
      return excludeMatcher.match(fileName);
    });
  });
}

function apiSourceWatch(postShredAction) {
  var srcPattern = ['../angular/modules/angular2/src/**/*.*'];
  watch(srcPattern, function (event, done) {
    console.log('Event type: ' + event.event); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
    // need to run just build
    buildApiDocs().then(done);
  });
  var examplesPattern = ['../angular/modules/angular2/examples/**/*.*'];
  watch(examplesPattern, function (event, done) {
    console.log('Event type: ' + event.event); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
    // need to run shredder
    var cleanPath = path.join(_apiShredOptions.fragmentsDir, '**/*.*');
    return delPromise([ cleanPath, '!**/*.ovr.*' ]).then(function() {
      return docShredder.shred(_apiShredOptions);
    }).then(function() {
      postShredAction && postShredAction();
    });
  });

}

function buildApiDocs() {
  try {
    var dgeni = new Dgeni([require('./public/api-builder/angular.io-package')]);
    return dgeni.generate().then(function() {
      return gulp.src('./public/docs/js/latest/api/**/*.*')
        .pipe(gulp.dest('./public/docs/ts/latest/api'));
    })
  } catch(err) {
    console.log(err);
    console.log(err.stack);
    throw err;
  }
}

function devGuideExamplesWatch(shredOptions, postShredAction) {
  var pattern = path.join(shredOptions.examplesDir, "**/*.*");
  watch([pattern], function (event, done) {
    console.log('Event type: ' + event.event); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
    docShredder.shredSingleDir(shredOptions, event.path).then(function () {
      postShredAction && postShredAction();
    });
  });
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
          // console.log(filePath + " isExample: " + isExample);
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



gulp.task('default', ['help']);