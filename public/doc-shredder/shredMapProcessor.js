/**
 * dgProcessor shredMapProcessor
 * @description
 *
 */
var path = require('canonical-path');
var fs = require('fs');
var _ = require('lodash');

module.exports = function shredMapProcessor(log, createDocMessage) {
  return {
    $runAfter: ['readFilesProcessor'],
    $runBefore: ['rendering-docs'],

    $process: function(docs) {
      var options = this.options;
      var jadeToFragMap = {};
      var fragToJadeMap = {};

      docs.forEach(function(doc) {
        var jadePath = path.join(options.jadeDir, doc.fileInfo.relativePath);
        var fragInfoSet = {};
        doc.fragPaths.forEach(function(fragPath) {
          var fullFragPath =  path.join(options.fragmentsDir, fragPath) + '.md';
          var examplePath = getExampleName(fragPath);
          var fullExamplePath = path.join(options.examplesDir, examplePath);
          var fragInfo = { fragPath: fullFragPath, examplePath: fullExamplePath, exists: fs.existsSync(fullFragPath) };
          fragInfoSet[fragPath] = fragInfo;
          if (fragInfo.exists) {
            var jadePathsSet = fragToJadeMap[fragPath];
            if (!jadePathsSet) {
              jadePathsSet = {};
              fragToJadeMap[fragPath] = jadePathsSet;
            }
            jadePathsSet[jadePath] = jadePath;
          } else {
            var relativePath = path.relative(".", fullFragPath);
            log.warn(createDocMessage('Invalid example (unable to locate fragment file: "' + relativePath + '")', doc));
          }
        });
        jadeToFragMap[jadePath] = _.values(fragInfoSet);
      });
      for (var key in fragToJadeMap) {
        fragToJadeMap[key] = _.keys(fragToJadeMap[key]);
      }

      var shredMap = {
        jadeToFragMap: jadeToFragMap
      };

      if (!options.writeFilesEnabled) {
        return [ shredMap ];
      } else {
        var newDocs = [ {
          docType: 'xref-doc.json',
          json: JSON.stringify(shredMap, null, 2),
          outputPath: 'xref-jade.json'
        }, {
          docType: 'xref-jade.html',
          jadeToFragMap: jadeToFragMap,
          outputPath: 'xref-jade-to-frag.html'
        }, {
          docType: 'xref-frag.html',
          fragToJadeMap: fragToJadeMap,
          outputPath: 'xref-frag-to-jade.html'
        }];
        return newDocs;
      }
    }
  }
};

function getExampleName(fragPath) {
  // pattern to isolate base fileName and extension from fragment name
  var rx = /(.*)\-(.*)\.(.s)/;
  var r = rx.exec(fragPath);
  if (r) {
    return r[1] + '.' + r[3];
  } else {
    return fragPath;
  }
}