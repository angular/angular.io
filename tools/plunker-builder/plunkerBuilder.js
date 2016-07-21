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
var COPYRIGHT, COPYRIGHT_JS_CSS, COPYRIGHT_HTML;
var SYSTEMJS_CONFIG; // content of systemjs.config.js for plunkers that use systemjs
var TSCONFIG;  // content of tsconfig.json for plunkers that use systemjs


module.exports = {
  buildPlunkers: buildPlunkers
};

buildCopyrightStrings();

function buildCopyrightStrings() {
  var COPYRIGHT = 'Copyright 2016 Google Inc. All Rights Reserved.\n'
    + 'Use of this source code is governed by an MIT-style license that\n'
    + 'can be found in the LICENSE file at http://angular.io/license';
  var pad = '\n\n';
  COPYRIGHT_JS_CSS = pad + '/*\n' + COPYRIGHT + '\n*/';
  COPYRIGHT_HTML = pad + '<!-- \n' + COPYRIGHT + '\n-->'
}

function buildPlunkers(basePath, destPath, options) {
  getSystemJsConfigPlunker(basePath);
  var errFn = options.errFn || function(e) { console.log(e); };
  var plunkerPaths = path.join(basePath, '**/*plnkr.json');
  var fileNames = globby.sync(plunkerPaths, { ignore: "**/node_modules/**"});
  fileNames.forEach(function(configFileName) {
    try {
      buildPlunkerFrom(configFileName, basePath, destPath);
    } catch (e) {
      errFn(e);
    }
  });
}

// config has
//   files: [] - optional array of globs - defaults to all js, ts, html, json, css and md files (with certain files removed)
//   description: optional string - description of this plunker - defaults to the title in the index.html page.
//   tags: [] - optional array of strings
//   main: string - filename of what will become index.html in the plunker - defaults to index.html
function buildPlunkerFrom(configFileName, basePath, destPath) {
  // replace ending 'plnkr.json' with 'plnkr.no-link.html' to create output file name;
  var outputFileName = configFileName.substr(0, configFileName.length - 'plnkr.json'.length) + 'plnkr.no-link.html';
  var altFileName;
  if (destPath && destPath.length > 0) {
    var partPath = path.dirname(path.relative(basePath, outputFileName));
    var altFileName = path.join(destPath, partPath, path.basename(outputFileName)).replace('.no-link.', '.');
  }
  try {
    var config = initConfigAndCollectFileNames(configFileName);
    var postData = createPostData(config);
    addSystemJsConfig(config, postData);
    var html = createPlunkerHtml(postData);
    fs.writeFileSync(outputFileName, html, 'utf-8');
    if (altFileName) {
      var altDirName = path.dirname(altFileName);
      if (!fs.existsSync(altDirName)) {
        mkdirp.sync(altDirName);
      }
      fs.writeFileSync(altFileName, html, 'utf-8');
    }
  } catch (e) {
    // if we fail delete the outputFile if it exists because it is an old one.
    if (existsSync(outputFileName)) {
      fs.unlinkSync(outputFileName);
    }
    if (altFileName && existsSync(altFileName)) {
      fs.unlinkSync(altFileName);
    }
    throw e;
  }
}

/**
 * Add plunker versions of systemjs.config and tsconfig.json
 */
function addSystemJsConfig(config, postData){
  if (config.basePath.indexOf('/ts') > -1) {
     // uses systemjs.config.js so add plunker version
     postData['files[systemjs.config.js]'] = SYSTEMJS_CONFIG;
     postData['files[tsconfig.json]'] = TSCONFIG;
  }
}

function getSystemJsConfigPlunker(basePath) {
  // Assume plunker version is sibling of node_modules version
  SYSTEMJS_CONFIG = fs.readFileSync(basePath + '/systemjs.config.plunker.js', 'utf-8');
  SYSTEMJS_CONFIG +=  COPYRIGHT_JS_CSS;
  TSCONFIG = fs.readFileSync(basePath + '/tsconfig.json', 'utf-8');
}

function initConfigAndCollectFileNames(configFileName) {
  var basePath = path.dirname(configFileName);
  var configSrc = fs.readFileSync(configFileName, 'utf-8');
  try {
    var config = (configSrc && configSrc.trim().length) ? JSON.parse(configSrc) : {};
  } catch (e) {
    throw new Error("Plunker config - unable to parse json file: " + configFileName + '\n  ' + e);
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

function createPostData(config) {
  var postData = {};
  config.fileNames.forEach(function(fileName) {
    var content;
    var extn = path.extname(fileName);
    if (extn == '.png') {
      content = encodeBase64(fileName);
      fileName = fileName.substr(0, fileName.length - 4) + '.base64.png'
    } else {
      content = fs.readFileSync(fileName, 'utf-8');
    }

    if (extn == '.js' || extn == '.ts' || extn == '.css') {
      content = content + COPYRIGHT_JS_CSS;
    } else if (extn == '.html') {
      content = content + COPYRIGHT_HTML;
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

    postData['files[' + relativeFileName + ']'] = content;
  });

  // Leave here in case we want to add a md file later.
  // postData['files[license.md]'] = fs.readFileSync(path.join(__dirname, "license.md"));

  var tags = ['angular2', 'example'].concat(config.tags || []);
  tags.forEach(function(tag,ix) {
    postData['tags[' + ix + ']'] = tag;
  });
  // postData['tags[0]'] = "angular2";
  // postData['tags[1]'] = "example";
  postData.private = true;

  postData.description = "Angular 2 Example - " + config.description;
  return postData;
}

function existsSync(filename) {
  try {
    fs.accessSync(filename);
    return true;
  } catch(ex) {
    return false;
  }
}

function encodeBase64(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

function createPlunkerHtml(postData) {
  var baseHtml = createBasePlunkerHtml(false);
  var doc = jsdom.jsdom(baseHtml);
  var form = doc.querySelector('form');
  _.forEach(postData, function(value, key) {
    var ele = htmlToElement(doc, '<input type="hidden" name="' + key + '">');
    ele.setAttribute('value', value);
    form.appendChild(ele)
  });
  var html = doc.documentElement.outerHTML;

  return html;
}


function createBasePlunkerHtml(useNewWindow) {
  var url = 'http://plnkr.co/edit/?p=preview';
  // If the form posts to target="_blank", pop-up blockers can cause it not to work.
  // If a user choses to bypass pop-up blocker one time and click the link, they will arrive at
  // a new default plnkr, not a plnkr with the desired template.  Given this undesired behavior,
  // some may still want to open the plnk in a new window by opting-in via ctrl+click.  The
  // newWindow param allows for this possibility.
  var target = useNewWindow ? '_blank' : '_self';
  var html = '<!DOCTYPE html><html lang="en"><body>'
  html += '<form id="mainForm" method="post" action="' + url + '" target="' + target + '">'

  // html += '<div class="button"><button id="formButton" type="submit">Create Plunker</button></div>'
  // html += '</form><script>document.getElementById("formButton").click();</script>'
  html +=  '</form><script>document.getElementById("mainForm").submit();</script>'
  html += '</body></html>';
  return html;
}

function htmlToElement(document, html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.firstChild;
}

// not currently used.
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
