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

gulp.task('clean', function () {
  var cleanPath = path.join(_outputFolder, '**/*.*');
  del([ cleanPath, '!**/*.ovr.*']).then(function (err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});


gulp.task('default', taskListing);

