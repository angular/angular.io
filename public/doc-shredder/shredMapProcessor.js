/**
 * dgProcessor shredMapProcessor
 * @description
 *
 */
var path = require('canonical-path');
var fs = require('fs');

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
          fragPath =  path.join(options.fragmentsDir, fragPath) + '.md';
          var fullPath = path.join(options.basePath, fragPath);
          var fragInfo = { fragPath: fragPath, exists: fs.existsSync(fullPath) };
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
      var newDocs = [{
        docType: 'xref-jade.html',
        basePath: this.options.basePath,
        jadeToFragMap: jadeToFragMap,
        outputPath: 'xref-jade-to-frag.html'
      }, {
        docType: 'xref-frag.html',
        basePath: this.options.basePath,
        fragToJadeMap: fragToJadeMap,
        outputPath: 'xref-frag-to-jade.html'
      }, {
        docType: 'xref-doc.json',
        json: JSON.stringify({
          basePath: this.options.basePath,
          jadeToFragMap: jadeToFragMap,
        }, null, 2),
        outputPath: 'xref-jade.json'
      }]
      return newDocs;
    }
  };
};