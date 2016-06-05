// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');
var jsonfile = require('jsonfile');
var assert = require('assert-plus');
// adm-zip does not work properly on Windows
// var Zip = require('adm-zip');
var archiver = require('archiver');

var fs = require('fs');
var mkdirp = require('mkdirp');
var globby = require('globby');

var regionExtractor = require('../doc-shredder/regionExtractor');


// globs is an array of globs
function zipExamples(sourceDirName, outputDirName) {
  var gpath = path.join(sourceDirName, '**/*zipconfig.json');
  var configFileNames = globby.sync([gpath], { ignore: ['**/node_modules/**'] });
  configFileNames.forEach(function(configFileName) {
    zipExample(configFileName, sourceDirName, outputDirName);
  });
}

function zipExample(configFileName, sourceDirName, outputDirName) {
  var json = jsonfile.readFileSync(configFileName);
  var fileGlobs = json.files;
  var zipRegionName = json.zipRegion;

  // assert that fileGlobs is an array
  assert.arrayOfString(fileGlobs, 'files property should be an array of strings');

  // backup two from the relative configFileName
  var relativeDirName = path.dirname(path.dirname(path.relative(sourceDirName, configFileName)));
  var configDirName = path.dirname(configFileName);
  // use the dir name of the folder containing the config file as the base file name of the zip file
  var baseFileName = path.basename(configDirName);
  // check if there is a prefix name before zipconfig.json
  if (configFileName.indexOf('.zipconfig.json') >= 0) {
    // if so use it as a suffix to the baseFileName
    var extraName = path.basename(configFileName, '.zipconfig.json');
    baseFileName = baseFileName + "." + extraName;
  }

  var outputFileName = path.join(outputDirName, relativeDirName, baseFileName + ".zip");
  // old code
  // var fileNames = globule.find(fileGlobs, { srcBase: configDirName, prefixBase: configDirName });
  fileGlobs = fileGlobs.map(function(fileGlob) {
    return path.join(configDirName, fileGlob);
  });
  var fileNames = globby.sync(fileGlobs, { ignore: ["**/node_modules/**"] });

  var zip = createZipArchive(outputFileName);
  fileNames.forEach(function(fileName) {
    var relativePath = path.relative(configDirName, fileName);
    var content = fs.readFileSync(fileName, 'utf8');
    var extn = path.extname(fileName).substr(1);
    // if we don't need to clean up the file then we can do the following.
    // zip.append(fs.createReadStream(fileName), { name: relativePath });
    var output;
    // if no zipRegion or zipRegion is not in content then just clean the content
    if (zipRegionName != null) {
      output = regionExtractor.getRegionDoc(content, extn, zipRegionName);
    }
    if (!output) {
      output = regionExtractor.removeDocTags(content, extn);
    }

    zip.append(output, { name: relativePath } )
  });

  zip.finalize();
}

function createZipArchive(zipFileName) {
  var dirName = path.dirname(zipFileName);
  // insure that the folder exists.
  if (!fs.existsSync(dirName)) {
    mkdirp.sync(dirName);
  }
  var output = fs.createWriteStream(zipFileName);
  var archive = archiver('zip');

  output.on('close', function () {
    console.log('zip created: ' + zipFileName + ' (' + archive.pointer() + ' total bytes)');
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);
  return archive;
}


module.exports = {
  zipExamples: zipExamples,
  zipExample: zipExample
};