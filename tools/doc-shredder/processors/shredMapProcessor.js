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
        var relativePath = doc.fileInfo.relativePath;
        var jadePath = path.join(options.jadeDir, relativePath);
        var lang = relativePath.substr(0, relativePath.indexOf('\/'));
        var appProjDirName = jadeBaseFileNameToExampleName(doc.fileInfo.baseName);
        var fragInfoSet = {};
        doc.fragItems.forEach(function(fragItem) {
          var mixinPath = fragItem.mixinPath;
          var fullExamplePath;
          // Normalize mixinPath: strip out optional trailing '(...)'
          var mixinPath = mixinPath.replace(/ \([^\)]*\)/,'');
          if ( mixinPath.indexOf('_api') >= 0) {
            var sourcePath = mixinPath.replace('_api/','');
            fullExamplePath = path.join(options.apiExamplesDir, sourcePath);
          } else {
            fullExamplePath = path.join(options.devguideExamplesDir, mixinPath);
          }
          var fragInfo = makeFragInfo(options.fragmentsDir, fullExamplePath, fragItem, mixinPath);
          if (!fragInfo.exists) {
            var savedFragInfo = fragInfo;
            // Assume that mixinPath is actually app-project-folder relative and
            // prepend  "lang/appProjDirName":
            var appProjRelPath = mixinPath;
            mixinPath = appProjDirName + '/' + lang + '/' + mixinPath;
            fragInfo = makeFragInfo(options.fragmentsDir, fullExamplePath, fragItem, mixinPath);
            if (fragInfo.exists) {
              log.info('Ajusted example path (' + doc.fileInfo.baseName + '): ' + appProjRelPath + ' -> ' + mixinPath);
            } else {
                fragInfo = savedFragInfo;
            }
          }
          var fragPath = fragInfo.relFragPath;
          fragInfoSet[fragPath] = fragInfo;
          if (fragInfo.exists) {
            var jadePathsSet = fragToJadeMap[fragPath];
            if (!jadePathsSet) {
              jadePathsSet = {};
              fragToJadeMap[fragPath] = jadePathsSet;
            }
            jadePathsSet[jadePath] = jadePath;
          } else {
            var relativePath = path.relative(".", fragInfo.fragPath);
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

// TODO: use the functionality in public/resources/js/util.js once it lands.
function jadeBaseFileNameToExampleName(name) {
  // Adjust for known cases where chapter name is not the example name.
	var matches = name.match(/(toh-)pt(\d+)/);
	if (matches) name = matches[1] + matches[2];
	return name;
}

function makeFragInfo(fragmentsDir, fullExamplePath, fragItem, mixinPath) {
  var region = fragItem.region ? "-" + fragItem.region : '';
  var extn = path.extname(mixinPath);
  var basename = path.basename(mixinPath, extn);
  var fragDir = path.dirname(mixinPath);
  var fragPath = path.join(fragDir, basename + region + extn) + '.md';
  var fullFragPath =  path.join(fragmentsDir, fragPath);
  return {
    fragPath: fullFragPath,
    relFragPath: fragPath,
    examplePath: fullExamplePath, 
    exists: fs.existsSync(fullFragPath) };
}