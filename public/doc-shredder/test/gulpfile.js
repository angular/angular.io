var gulp = require('gulp');
var path = require('canonical-path');
var Dgeni = require('dgeni');
var del = require('del');
var watch = require('gulp-watch');

var docShredder = require('../doc-shredder');

var shredOptions =  {
  examplesDir: "test_source",
  fragmentsDir:  "test_fragments"
};

gulp.task('shred', function() {
  return docShredder.shred(shredOptions);
});

gulp.task('clean', function (cb) {
  var cleanPath = path.join(shredOptions.fragmentsDir, '**/*.*')
  del([ cleanPath, '!**/*.ovr.*'], function (err, paths) {
    // console.log('Deleted files/folders:\n', paths.join('\n'));
    cb();
  });
});

gulp.task('watch', function (cb) {
  var pattern = path.join(shredOptions.examplesDir, "**/*.*");
  watch([ pattern], function(event, done) {
    console.log('Event type: ' + event.event); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
    docShredder.shredSingleDir(shredOptions, event.path);
  });
});

gulp.task('map', function() {
  var options = {
    jadeDir: 'test_jade',
    examplesDir: 'test_source',
    fragmentsDir: 'test_fragments',
    outputDir: '.'
  }
  return docShredder.buildShredMap(options).then(function(x) {
    var docMaps = x.docMaps;
  })

});

gulp.task('default', ['shred']);

