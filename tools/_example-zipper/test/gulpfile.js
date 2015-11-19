var gulp = require('gulp');
var path = require('canonical-path');
var del = require('del');
var taskListing = require('gulp-task-listing');

var exampleZipper = require('../exampleZipper');

var _outputFolder = '_zip-output';

gulp.task('help', taskListing);

gulp.task('zipExamples', ['clean'], function() {
  return exampleZipper.zipExamples("../../../public/docs/_examples", _outputFolder);
});

gulp.task('clean', function (cb) {
  var cleanPath = path.join(_outputFolder, '**/*.*');
  del([ cleanPath, '!**/*.ovr.*'], function (err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
    cb();
  });
});


gulp.task('default', taskListing);

