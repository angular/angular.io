'use strict';

// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');
var Q = require('q');
var _ = require('lodash');
var jsdom = require("jsdom");
var fs = require("fs");
var globby = require('globby');
var mkdirp = require('mkdirp');

var indexHtmlTranslator = require('./indexHtmlTranslator');
var regionExtractor = require('../doc-shredder/regionExtractor');

class PlunkerBuilder {
  constructor(basePath, destPath, options) {
    this.basePath = basePath;
    this.destPath = destPath;
    this.options = options;
    this.copyrights = {};

    this._buildCopyrightStrings();
  }

  buildPlunkers() {
    this._getPlunkerFiles();
    var errFn = this.options.errFn || function(e) { console.log(e); };
    var plunkerPaths = path.join(this.basePath, '**/*plnkr.json');
    var fileNames = globby.sync(plunkerPaths, { ignore: "**/node_modules/**"});
    fileNames.forEach((configFileName) => {
      try {
        this._buildPlunkerFrom(configFileName);
      } catch (e) {
        errFn(e);
      }
    });
  }

  _addPlunkerFiles(config, postData) {
    this._addReadme(config, postData);
    if (config.basePath.indexOf('/ts') > -1) {
      // uses systemjs.config.js so add plunker version
      this.options.addField(postData, 'systemjs.config.js', this.systemjsConfig);
      this.options.addField(postData, 'tsconfig.json', this.tsconfig);
    }
  }

  _addReadme(config, postData) {
    var existingFiles = config.fileNames.map(function(file) {
      return file.substr(file.lastIndexOf('/') + 1);
    });

    if (existingFiles.indexOf('README.md') === -1) {
      var plunkerReadme = this.readme + config.description;
      this.options.addField(postData, 'README.md', plunkerReadme);
    }
  }

  _buildCopyrightStrings() {
    var copyright = 'Copyright 2016 Google Inc. All Rights Reserved.\n'
      + 'Use of this source code is governed by an MIT-style license that\n'
      + 'can be found in the LICENSE file at http://angular.io/license';
    var pad = '\n\n';
    this.copyrights.jsCss = `${pad}/*\n${copyright}\n*/`;
    this.copyrights.html = `${pad}<!-- \n${copyright}\n-->`;
  }

  // config has
  //   files: [] - optional array of globs - defaults to all js, ts, html, json, css and md files (with certain files removed)
  //   description: optional string - description of this plunker - defaults to the title in the index.html page.
  //   tags: [] - optional array of strings
  //   main: string - filename of what will become index.html in the plunker - defaults to index.html
  _buildPlunkerFrom(configFileName) {
    // replace ending 'plnkr.json' with 'plnkr.no-link.html' to create output file name;
    var outputFileName = `${this.options.plunkerFileName}.no-link.html`;
    outputFileName = configFileName.substr(0, configFileName.length - 'plnkr.json'.length) + outputFileName;
    var altFileName;
    if (this.destPath && this.destPath.length > 0) {
      var partPath = path.dirname(path.relative(this.basePath, outputFileName));
      var altFileName = path.join(this.destPath, partPath, path.basename(outputFileName)).replace('.no-link.', '.');
    }
    try {
      var config = this._initConfigAndCollectFileNames(configFileName);
      var postData = this._createPostData(config);
      this._addPlunkerFiles(config, postData);
      var html = this._createPlunkerHtml(postData);
      if (this.options.writeNoLink) {
        fs.writeFileSync(outputFileName, html, 'utf-8');
      }
      if (altFileName) {
        var altDirName = path.dirname(altFileName);
        if (!fs.existsSync(altDirName)) {
          mkdirp.sync(altDirName);
        }
        fs.writeFileSync(altFileName, html, 'utf-8');
      }
    } catch (e) {
      // if we fail delete the outputFile if it exists because it is an old one.
      if (this._existsSync(outputFileName)) {
        fs.unlinkSync(outputFileName);
      }
      if (altFileName && this._existsSync(altFileName)) {
        fs.unlinkSync(altFileName);
      }
      throw e;
    }
  }

  _createBasePlunkerHtml(embedded) {
    var html = '<!DOCTYPE html><html lang="en"><body>'
    html += `<form id="mainForm" method="post" action="${this.options.url}" target="_self">`

    // html += '<div class="button"><button id="formButton" type="submit">Create Plunker</button></div>'
    // html += '</form><script>document.getElementById("formButton").click();</script>'
    html +=  '</form><script>document.getElementById("mainForm").submit();</script>'
    html += '</body></html>';
    return html;
  }

  _createPostData(config) {
    var postData = {};
    config.fileNames.forEach((fileName) => {
      var content;
      var extn = path.extname(fileName);
      if (extn == '.png') {
        content = this._encodeBase64(fileName);
        fileName = fileName.substr(0, fileName.length - 4) + '.base64.png'
      } else {
        content = fs.readFileSync(fileName, 'utf-8');
      }

      if (extn == '.js' || extn == '.ts' || extn == '.css') {
        content = content + this.copyrights.jsCss;
      } else if (extn == '.html') {
        content = content + this.copyrights.html;
      }
      // var escapedValue = escapeHtml(content);

      var relativeFileName = path.relative(config.basePath, fileName);

      if (relativeFileName == config.main) {
        relativeFileName = 'index.html';
      }

      if (relativeFileName == 'index.html') {
        content = indexHtmlTranslator.translate(content);
        if (config.description == null) {
          // set config.description to title from index.html
          var matches = /<title>(.*)<\/title>/.exec(content);
          if (matches) {
            config.description = matches[1];
          }
        }
      }
      content = regionExtractor.removeDocTags(content, extn.substr(1));

      this.options.addField(postData, relativeFileName, content);
    });

    var tags = ['angular2', 'example'].concat(config.tags || []);
    tags.forEach(function(tag,ix) {
      postData['tags[' + ix + ']'] = tag;
    });

    if (!this.options.embedded) {
      postData.private = true;

      postData.description = "Angular 2 Example - " + config.description;
    } else {
      postData.title = "Angular 2 Example - " + config.description;
    }

    // Embedded needs to add more content, so if the callback is available, we call it
    if (this.options.extraData) {
      this.options.extraData(postData, config);
    }
    return postData;
  }

  _createPlunkerHtml(postData) {
    var baseHtml = this._createBasePlunkerHtml(this.options.embedded);
    var doc = jsdom.jsdom(baseHtml);
    var form = doc.querySelector('form');
    _.forEach(postData, (value, key) => {
      var ele = this._htmlToElement(doc, '<input type="hidden" name="' + key + '">');
      ele.setAttribute('value', value);
      form.appendChild(ele)
    });
    var html = doc.documentElement.outerHTML;

    return html;
  }

  _encodeBase64(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
  }

  _existsSync(filename) {
    try {
      fs.accessSync(filename);
      return true;
    } catch(ex) {
      return false;
    }
  }

  _getPlunkerFiles() {
    // Assume plunker version is sibling of node_modules version
    this.readme = fs.readFileSync(this.basePath +  '/plunker.README.md', 'utf-8');
    var systemJsConfigPath = '/systemjs.config.plunker.js';
    if (this.options.build) {
      systemJsConfigPath = '/systemjs.config.plunker.build.js';
    }
    this.systemjsConfig = fs.readFileSync(this.basePath + systemJsConfigPath, 'utf-8');
    this.systemjsConfig +=  this.copyrights.jsCss;
    this.tsconfig = fs.readFileSync(`${this.basePath}/tsconfig.json`, 'utf-8');
  }

  _htmlToElement(document, html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.firstChild;
  }

  _initConfigAndCollectFileNames(configFileName) {
    var basePath = path.dirname(configFileName);
    var configSrc = fs.readFileSync(configFileName, 'utf-8');
    try {
      var config = (configSrc && configSrc.trim().length) ? JSON.parse(configSrc) : {};
    } catch (e) {
      throw new Error(`Plunker config - unable to parse json file: ${configFileName}\n${e}`);
    }

    var defaultIncludes = ['**/*.ts', '**/*.js', '**/*.css', '**/*.html', '**/*.md', '**/*.json', '**/*.png'];
    if (config.files) {
      if (config.files.length > 0) {
        if (config.files[0].substr(0, 1) == '!') {
          config.files = defaultIncludes.concat(config.files);
        }
      }
    } else {
      config.files = defaultIncludes;
    }
    var gpaths = config.files.map(function(fileName) {
      fileName = fileName.trim();
      if (fileName.substr(0,1) == '!') {
        return "!" + path.join(basePath, fileName.substr(1));
      } else {
        return path.join(basePath, fileName);
      }
    });

    // var defaultExcludes = [ '!**/node_modules/**','!**/typings/**','!**/tsconfig.json', '!**/*plnkr.json', '!**/*plnkr.html', '!**/*plnkr.no-link.html' ];
    var defaultExcludes = [
      '!**/typings/**',
      '!**/typings.json',
      '!**/tsconfig.json',
      '!**/*plnkr.*',
      '!**/package.json',
      '!**/example-config.json',
      '!**/*.spec.*',
      '!**/tslint.json',
      '!**/.editorconfig',
      '!**/systemjs.config.js',
      '!**/wallaby.js',
      '!**/karma-test-shim.js',
      '!**/karma.conf.js',
      '!**/spec.js'
    ];
    Array.prototype.push.apply(gpaths, defaultExcludes);

    config.fileNames = globby.sync(gpaths, { ignore: ["**/node_modules/**"] });
    config.basePath = basePath;

    return config;
  }
}

module.exports = PlunkerBuilder;

// not currently used.
// function escapeHtml(unsafe) {
//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

//// Old version - no longer used
//function createPlunkerHtmlAsync(basePath, postData) {
//
//  useNewWindow = false;
//  jsdom.env({
//    html: createBasePlunkerHtml(useNewWindow),
//    done: function (err, window) {
//      var doc = window.document;
//      var form = doc.querySelector('form');
//
//      _.forEach(postData, function(value, key) {
//        var ele = htmlToElement(doc, '<input type="hidden" name="' + key + '">');
//        ele.setAttribute('value', value);
//        form.appendChild(ele)
//      });
//      var html = doc.documentElement.outerHTML;
//      var outputFn = path.join(basePath, "plnkr.html");
//      fs.writeFileSync(outputFn, html, 'utf-8' );
//    }
//  });
//}
