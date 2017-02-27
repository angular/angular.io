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

class ExampleZipper {
  constructor(sourceDirName, outputDirName) {
    let gpath = path.join(sourceDirName, '**/*plnkr.json');
    let configFileNames = globby.sync([gpath], { ignore: ['**/node_modules/**'] });
    // we only need typescript examples
    configFileNames = configFileNames.filter((configFileName) => {
      return configFileName.indexOf('ts') != -1;
    });
    configFileNames.forEach((configFileName) => {
      this._zipExample(configFileName, sourceDirName, outputDirName);
    });
    // this._zipExample(configFileNames[26], sourceDirName, outputDirName);
  }

  _zipExample(configFileName, sourceDirName, outputDirName) {
    let json = JSON.parse(fs.readFileSync(configFileName, 'utf-8'));
    const basePath = json.basePath || '';
    const jsonFileName = configFileName.replace(/^.*[\\\/]/, '');
    const relativeDirName = path.dirname(path.dirname(path.relative(sourceDirName, configFileName)));
    const exampleDirName = path.dirname(configFileName);
    const examplesPackageJson = 'public/docs/_examples/package.json';
    const examplesSystemjsConfig = 'public/docs/_examples/_boilerplate/src/systemjs.config.js';
    let exampleZipName = jsonFileName.replace('plnkr.json', relativeDirName);
    const outputFileName = path.join(outputDirName, relativeDirName, exampleZipName + '.zip');
    let defaultIncludes = ['**/*.ts', '**/*.js', '**/*.css', '**/*.html', '**/*.md', '**/*.json', '**/*.png'];
    let extraIncludes = ['bs-config.json', 'tslint.json', 'src/tsconfig.json', 'karma-test-shim.js', 'karma.conf.js', 'src/testing/**/*'];
    var defaultExcludes = [
      '!**/bs-config.e2e.json',
      '!**/*plnkr.*',
      '!**/package.json',
      '!**/example-config.json',
      '!**/wallaby.js',
      // AoT related files
      '!**/aot/**/*.*',
      '!**/*-aot.*'
    ];

    if (json.files) {
      if (json.files.length > 0) {
        json.files = json.files.map(file => {
          if (file.startsWith('!')) {
            if (file.startsWith('!**')) {
              return file;
            }

            return '!' + basePath + file.substr(1);
          }

          return basePath + file;
        });

        if (json.files[0].substr(0, 1) === '!') {
          json.files = defaultIncludes.concat(json.files);
        } else {
          json.files = extraIncludes.concat(json.files);
        }
      }
    } else {
      json.files = defaultIncludes;
    }

    let gpaths = json.files.map((fileName) => {
      fileName = fileName.trim();
      if (fileName.substr(0, 1) === '!') {
        return '!' + path.join(exampleDirName, fileName.substr(1));
      } else {
        return path.join(exampleDirName, fileName);
      }
    });

    gpaths.map(f => console.log(f));

    Array.prototype.push.apply(gpaths, defaultExcludes);

    let fileNames = globby.sync(gpaths, { ignore: ['**/node_modules/**']});

    let zip = this._createZipArchive(outputFileName);
    fileNames.forEach((fileName) => {
      let relativePath = path.relative(exampleDirName, fileName);
      let content = fs.readFileSync(fileName, 'utf8');
      let extn = path.extname(fileName).substr(1);
      // if we don't need to clean up the file then we can do the following.
      // zip.append(fs.createReadStream(fileName), { name: relativePath });
      let output = regionExtractor.removeDocTags(content, extn);

      zip.append(output, { name: relativePath } )
    });

    // we need the package.json from _examples root, not the _boilerplate one
    zip.append(fs.readFileSync(examplesPackageJson, 'utf8'), { name: 'package.json' });
    // also a systemjs config
    zip.append(fs.readFileSync(examplesSystemjsConfig, 'utf8'), { name: 'src/systemjs.config.js' });

    zip.finalize();
  }

  _createZipArchive(zipFileName) {
    let dirName = path.dirname(zipFileName);
    // ensure that the folder exists.
    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }
    let output = fs.createWriteStream(zipFileName);
    let archive = archiver('zip');

    output.on('close', function () {
      console.log('zip created: ' + zipFileName + ' (' + archive.pointer() + ' total bytes)');
    });

    archive.on('error', function (err) {
      throw err;
    });

    archive.pipe(output);
    return archive;
  }
}

module.exports = ExampleZipper;
