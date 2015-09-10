/**
 * dgProcessor shredMapProcessor
 * @description
 *
 */
var path = require('canonical-path');
var fs = require('fs');
var _ = require('lodash');

module.exports = function shredMapProcessor(log) {
  return {
    $runAfter: ['readFilesProcessor'],
    $runBefore: ['rendering-docs'],

    $process: function(docs) {
      var options = this.options;
      var jadeToFragMap = {};
      var fragToJadeMap = {};

      docs.forEach(function(doc) {
        var jadePath = path.join(options.jadeDir, doc.fileInfo.relativePath);
        var fragInfos = doc.fragPaths.map(function(fragPath) {
          var relativeFragPath =  path.join(options.fragmentsDir, fragPath) + '.md';
          var fullPath = path.join(options.basePath, relativeFragPath);

          var examplePath = getExampleName(fragPath);
          var relativeExamplePath = path.join(options.examplesDir, examplePath);
          var fragInfo = { fragPath: relativeFragPath, examplePath: relativeExamplePath, exists: fs.existsSync(fullPath) };
          if (fragInfo.exists) {
            var jadePaths = fragToJadeMap[fragInfo];
            if (!jadePaths) {
              jadePaths = [];
              fragToJadeMap[fragPath] = jadePaths;
            }
            jadePaths.push(jadePath);
          }
          return fragInfo;
        });
        jadeToFragMap[jadePath] = fragInfos;
      });
      var basePath = path.relative(process.cwd(), this.options.basePath);
      var shredMap = {
        basePath: basePath,
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
          basePath: basePath,
          jadeToFragMap: jadeToFragMap,
          outputPath: 'xref-jade-to-frag.html'
        }, {
          docType: 'xref-frag.html',
          basePath: basePath,
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