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
var Minimatch = require("minimatch").Minimatch;
var Dgeni = require('dgeni');
var fsExtra = require('fs-extra');
var fs = fsExtra;


var docShredder = require('./public/doc-shredder/doc-shredder');

var _shredOptions =  {
  basePath: path.resolve('./public/docs'),
  examplesDir: "_examples",
  fragmentsDir:  "_fragments"
};

var _excludePatterns = ["**/node_modules/**", "**/typings/**"];

var _excludeMatchers = _excludePatterns.map(function(excludePattern){
  return new Minimatch(excludePattern)
});

/*
Within this repo generated files are checked in so that we can avoid running the
shredder over the entire _examples dir each time someone refreshes the repo
( the ‘shred-full’ gulp task). The gulp ‘serve-and-watch’ shredder is only
a ‘partial’ shredder. It only shred’s files in directories changed during
the current session.
*/

gulp.task('help', taskListing);

gulp.task('serve-and-sync', function (cb) {
  execCommands(['harp server'], {}, cb);

  var browserSync = require('browser-sync').create();
  browserSync.init({
    proxy: 'localhost:9000',
    files: "public/docs/**/*/**/*",
    logFileChanges: true,
    reloadDelay: 500
  });

  shredWatch(_shredOptions, function() {
    browserSync.reload();
  });
});

gulp.task('serve-and-watch', function (cb) {
  execCommands(['harp server'], {}, cb);
  shredWatch(_shredOptions);
});

gulp.task('shred-full', ['shred-clean'], function() {
  return docShredder.shred( _shredOptions);
});

gulp.task('shred-clean', function(cb) {
  var cleanPath = path.join(_shredOptions.basePath, _shredOptions.fragmentsDir, '**/*.*')
  del([ cleanPath, '!**/*.ovr.*'], function (err, paths) {
    // console.log('Deleted files/folders:\n', paths.join('\n'));
    cb();
  });
});

gulp.task('build-shred-maps', ['shred-full'], function() {
  return buildShredMaps(true);
});

gulp.task('git-changed-examples', ['shred-full'], function(){
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
    console.log("\nJade files and associated changed example files " + messageSuffix);
    var jadeExampleMap = jadeShredMapToJadeExampleMap(jadeShredMap, examplePaths);
    console.log(JSON.stringify(jadeExampleMap, null, "  "));
    console.log("-----");
  }).catch(function(err) {
    throw err;
  });
});


gulp.task('build-api-docs',  function() {
  var fs = require('fs-extra');
  if (!fs.existsSync('../angular')) {
    throw new Error('build-api-docs task requires the angular2 repo to be at ' + path.resolve('../angular'));
  }
  try {
    var dgeni = new Dgeni([require('./public/api-builder/angular.io-package')]);
    return dgeni.generate();
  } catch(x) {
    console.log(x);
    console.log(x.stack);
    throw x;
  }
});



function filterOutExcludedPatterns(fileNames, excludeMatchers) {
  return fileNames.filter(function(fileName) {
    return !excludeMatchers.some(function(excludeMatcher) {
      return excludeMatcher.match(fileName);
    });
  });
}

function buildShredMaps(shouldWrite) {
  var options = _.extend(_shredOptions, {
    jadeDir: '.',
    outputDir: '.',
    writeFilesEnabled: shouldWrite
  });
  return docShredder.buildShredMap(options).then(function(docs) {
    return docs;
  });
}

// returns a promise containing filePaths with any changed or added examples;
function getChangedExamples(sha) {
  var examplesPath = path.join(_shredOptions.basePath, _shredOptions.examplesDir);
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
  var examplesPath = path.join(_shredOptions.basePath, _shredOptions.examplesDir);
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

function shredWatch(shredOptions, postShredAction) {
  var pattern = path.join(shredOptions.basePath, shredOptions.examplesDir, "**/*.*");
  watch([pattern], function (event, done) {
    console.log('Event type: ' + event.event); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
    docShredder.shredSingleDir(shredOptions, event.path).then(function () {
      postShredAction && postShredAction();
    });
  });
}

function jadeShredMapToJadeExampleMap(jadeShredMap, examplePaths) {
  var exampleSet = {};
  examplePaths.forEach(function(examplePath) {
    exampleSet[examplePath] = examplePath;
  });
  var basePath = jadeShredMap.basePath;
  var jadeToFragMap = jadeShredMap.jadeToFragMap;
  var jadeExampleMap = {};
  for (var jadePath in jadeToFragMap) {
    var fullJadePath = path.join(basePath, jadePath);
    var vals = jadeToFragMap[jadePath];
    vals.forEach(function(val) {
      var examplePath = path.join(basePath, val.examplePath);
      if (exampleSet[examplePath] != null) {
        addKeyValue(jadeExampleMap, fullJadePath, examplePath);
      }
    });
  }
  return jadeExampleMap;
}

function jadeShredMapToExampleJadeMap(jadeShredMap) {
  var basePath = jadeShredMap.basePath;
  var jadeToFragMap = jadeShredMap.jadeToFragMap;
  var exampleJadeMap = {};
  for (var jadePath in jadeToFragMap) {
    var fullJadePath = path.join(basePath, jadePath);
    var vals = jadeToFragMap[jadePath];
    vals.forEach(function(val) {
      var examplePath = path.join(basePath, val.examplePath);
      addKeyValue(exampleJadeMap, examplePath, fullJadePath);
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


// added options are: shouldLog
// cb is function(err, stdout, stderr);
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



gulp.task('default', taskListing);