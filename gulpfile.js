var gulp = require('gulp');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var Dgeni = require('dgeni');
var path = require('path');
var del = require('del');

var docShredder = require('./public/doc-shredder/doc-shredder');

var shredOptions =  {
  basePath: path.resolve('./public/docs'),
  sourceDir: "_examples",
  destDir:  "_fragments"
};

/*
Within this repo generated files are checked in so that we can avoid running the
shredder over the entire _examples dir each time someone refreshes the repo
( the ‘shred-full’ gulp task). The gulp ‘serve-and-watch’ shredder is only
a ‘partial’ shredder. It only shred’s files in directories changed during
the current session.
*/


gulp.task('shred-full', ['shred-clean'], function() {
  docShredder.shred( shredOptions);
});

gulp.task('serve-and-watch', function (cb) {
  var pattern = path.join(shredOptions.basePath, shredOptions.sourceDir, "**/*.*");

  execCommands(['harp server'])

  watch([ pattern], function(event, done) {
    console.log('Event type: ' + event.event); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
    docShredder.shredSingleDir(shredOptions, event.path);
  });

});

gulp.task('shred-clean', function(cb) {
  var cleanPath = path.join(shredOptions.basePath, shredOptions.destDir, '**/*.*')
  del([ cleanPath, '!**/*.ovr.*'], function (err, paths) {
    // console.log('Deleted files/folders:\n', paths.join('\n'));
    cb();
  });
});


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