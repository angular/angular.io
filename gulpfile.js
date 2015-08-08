var gulp = require('gulp');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var taskListing = require('gulp-task-listing');
var path = require('canonical-path');
var del = require('del');
var _ = require('lodash');
var Git = require("nodegit");
var argv = require('yargs').argv;

var docShredder = require('./public/doc-shredder/doc-shredder');

var _shredOptions =  {
  basePath: path.resolve('./public/docs'),
  examplesDir: "_examples",
  fragmentsDir:  "_fragments"
};

// TODO: 'extractFragment' will be moved into _utilFns in the next release.

// Extract a subset of a json file in a specified order defined
// by extractPaths while retaining original order for any
// unspecified subobjects.
//
// based on the principle that JSON.parse(source) constructs objects
// in order from the top down in 'source' and JSON.stringify(source) iterates 'source'
// properties according to the order in which they were inserted.  ( the spec actually
// discourages this assumption but this method will only
// run on node (v8) and the assumption seems safe there. )
function extractFragment(source, rootPath, extractPaths, space) {

  var objSource = JSON.parse(source);
  if (rootPath && rootPath.length > 0) {
    objSource = getSubObject(objSource, rootPath);
  }
  var objDest = {};
  extractPaths.trim().split(",").forEach(function(dotPath) {
    processPath(objSource, objDest, dotPath );
  });
  var result = JSON.stringify(objDest, null, space);
  return result;

  function getSubObject(source, path) {
    var nextSource = source;
    var pathParts = path.trim().split(".");
    while (pathParts.length > 0) {
      var nextProp = pathParts.shift();
      nextSource = nextSource[nextProp];
    }
    return nextSource;
  }

  function processPath(source, dest, dotPath) {
    var nextSource = source;
    var nextDest = dest;
    var pathParts = dotPath.trim().split(".");
    while (pathParts.length > 0) {
      var nextProp = pathParts.shift();
      nextSource = nextSource[nextProp];
      if (pathParts.length > 0) {
        var val = nextDest[nextProp] || {};
        nextDest[nextProp] = val;
        nextDest = val;
      } else {
        nextDest[nextProp] = nextSource;
      }
    }
  }
}

// TODO: will be moved into _utilFns in the next release.
gulp.task('test-extract-fragments', function() {
  var json = '{ ' +
    '"foo": "foo value", ' +
    '"bar": 3, ' +
    '"x": {' +
    '  "y": {' +
    '    "y3": "zzz", ' +
    '    "y1": true, ' +
    '    "y2": 7 ' +
    '  }, ' +
    '  "cat": "z value", ' +
    '  "dog": "exclude" ' +
    '} ' +
  "}";

  var f1 = extractFragment( json, null, "x.y, x.cat, foo", 2);
  var f2 = extractFragment( json, "x" , "y.y2, y.y1", 2);
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

// Called with an sha parameter - like this
//    gulp git-changed-examples --sha 4d2ac96fa247306ddd2d4c4e0c8dee2223502eb2
gulp.task('git-changed-examples', function(){


  var jadeShredMap;
  return buildShredMaps(false).then(function(docs) {
    jadeShredMap = docs[0];
    // return getChangedExamples('7e6ff558e35fce3b6df45c66c43514c72fbf69e0 ').then(function(filePaths) {
    return getChangedExamples(argv.sha);
  }).then(function(examplePaths) {
    console.log('Examples changed on commit: ' + (argv.sha ? argv.sha : '[last commit]'));
    console.log(examplePaths)
    console.log("Jade files and associated changed example files")
    var jadeExampleMap = jadeShredMapToJadeExampleMap(jadeShredMap, examplePaths);
    console.log(JSON.stringify(jadeExampleMap, null, "  "));
  }).catch(function(err) {
    throw err;
  });
});

//gulp.task('git-review-jade', function() {
//
//});

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
    vals.push(value);
  } else {
    map[key] = [value];
  }
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
    if (sha) {
      return repo.getCommit(sha);
    } else {
      return repo.getHeadCommit();
    }
  }).then(function(commit) {
    return commit.getDiff();
  }).then(function(diffList) {
    var filePaths = [];
    diffList.forEach(function(diff) {
      diff.patches().forEach(function(patch) {
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
  }).catch(function(err) {

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