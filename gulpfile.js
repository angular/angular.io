var gulp = require('gulp');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var path = require('path');
var del = require('del');
var _ = require('lodash');

var docShredder = require('./public/doc-shredder/doc-shredder');

var _shredOptions =  {
  basePath: path.resolve('./public/docs'),
  examplesDir: "_examples",
  fragmentsDir:  "_fragments"
};

/*
Within this repo generated files are checked in so that we can avoid running the
shredder over the entire _examples dir each time someone refreshes the repo
( the ‘shred-full’ gulp task). The gulp ‘serve-and-watch’ shredder is only
a ‘partial’ shredder. It only shred’s files in directories changed during
the current session.
*/

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
  var options = _.extend(_shredOptions, {
    jadeDir: '.',
    outputDir: '.'
  });
  return docShredder.buildShredMap(options).then(function(x) {
    // var json = x[2];
  });
})

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



gulp.task('default', ['shred-full']);