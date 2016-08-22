var docShredder = require('../doc-shredder');
var del = require('del');
var globby = require('globby');
var path = require('canonical-path');
var fs = require('fs');
var JsDiff = require('diff');

describe('doc-shredder', function() {

  var _shredOptions =  {
    examplesDir: "test_source",
    fragmentsDir:  "test_fragments"
  };

  beforeEach(function () {

  });


  it('should generate expected results', function (done) {
    clean(_shredOptions).then(function() {
      return shred(_shredOptions);
    }).then(function() {
      var mdOvrPath = path.join(_shredOptions.fragmentsDir, '**/*.ovr.*');
      var fileNames = globby.sync([mdOvrPath], { ignore: ["**/node_modules/**"] });
      var errs = [];
      fileNames.forEach(function(fileName) {
        console.log('comparing: ' + fileName);
        var origFileName = fileName.replace('.ovr.', '.');
        var origSource = fs.readFileSync(origFileName, 'utf8').replace(/\r\n/g, '\n');
        var expectedSource = fs.readFileSync(fileName, 'utf8').replace(/\r\n/g, '\n');
        var diffs = JsDiff.diffLines(expectedSource, origSource);
        errs = [];
        diffs.forEach(function(diff) {
          if (diff.added) {
            errs.add('  added:  --->' + diff.value);
          } else if (diff.removed) {
            errs.add('  removed: -->' + diff.value);
          }
        });
        if (errs.length) {
          errs.unshift('File: ' + origFileName + '\n');
        }

        expect(errs.length).toEqual(0, '\n' + errs.join(''));
      });
      done();
    }).catch(function(e){
      expect(e).toBeNull();
    })
  });

  function shred(shredOptions) {
    return docShredder.shred(shredOptions);
  }

  function clean(shredOptions) {
    var cleanPath = path.join(shredOptions.fragmentsDir, '**/*.*')
    return del([ cleanPath, '!**/*.ovr.*']);
  }

});
