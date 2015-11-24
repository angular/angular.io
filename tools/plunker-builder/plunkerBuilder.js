// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');
var Q = require('q');
var _ = require('lodash');
var jsdom = require("jsdom");
var fs = require("fs");
var globule = require('globule');

var indexHtmlTranslator = require('./indexHtmlTranslator');
var regionExtractor = require('../doc-shredder/regionExtractor');

module.exports = {
  buildPlunkers: buildPlunkers
};

function buildPlunkers(basePath, errFn) {
  errFn = errFn || function(e) { console.log(e); };
  var configExtns = ['plnkr.config', '*.plnkr.config'];
  var gpaths = configExtns.map(function(extn) {
    return path.join(basePath, '**/' + extn);
  });
  var fileNames = globule.find(gpaths);
  fileNames.forEach(function(configFileName) {
    try {
      buildPlunkerFrom(configFileName);
    } catch (e) {
      errFn(e);
    }
  });
}

// config has
//   include: [] - optional array of globs - defaults to all js, ts, html, json, css and md files
//   exclude: [] - optional array of globs
//   name: string - description of this plunker - defaults to the title in the index.html page.
//   main: string - filename of what will become index.html in the plunker - defaults to index.html
function buildPlunkerFrom(configFileName ) {
  // replace ending 'plnkr.config' with 'plnkr.html' to create output file name;
  var outputFileName = configFileName.substr(0, configFileName.length - 'plnkr.config'.length) + 'plnkr.html';
  try {
    var config = initConfigAndCollectFileNames(configFileName);
    var postData = createPostData(config);
    var html = createPlunkerHtml(postData);
    fs.writeFileSync(outputFileName, html, 'utf-8');
  } catch (e) {
    // if we fail delete the outputFile if it exists because it is an old one.
    if (existsSync(outputFileName)) {
      fs.unlinkSync(outputFileName);
    }
    throw e;
  }
}

function initConfigAndCollectFileNames(configFileName) {
  var basePath = path.dirname(configFileName);
  var configSrc = fs.readFileSync(configFileName, 'utf-8');
  try {
    var config = (configSrc && configSrc.trim().length) ? JSON.parse(configSrc) : {};
  } catch (e) {
    throw new Error("Plunker config - unable to parse: " + configFileName + '\n  ' + e);
  }

  if (!config.include) {
    config.include = ['**/*.ts', '**/*.js', '**/*.css', '**/*.html', '**/*.md', '**/*.json', '**/*.png'];
  }
  var gpaths = config.include.map(function(fileName) {
    return path.join(basePath, fileName);
  });
  if (config.exclude) {
    config.exclude.forEach(function(fileName) {
      gpaths.push("!" + path.join(basePath, fileName));
    });
  }
  gpaths.push('!**/typings/**');
  gpaths.push('!**/tsconfig.json');
  gpaths.push('!**/plnkr.html');
  gpaths.push('!**/*.plnkr.html');
  config.fileNames = globule.find(gpaths);
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
    // var escapedValue = escapeHtml(content);

    var relativeFileName = path.relative(config.basePath, fileName);

    if (relativeFileName == config.main) {
      relativeFileName = 'index.html';
    }

    if (relativeFileName == 'index.html') {
      content = indexHtmlTranslator.translate(content);
      if (config.name == null) {
        // set config.name to title from index.html
        var matches = /<title>(.*)<\/title>/.exec(content);
        if (matches) {
          config.name = matches[1];
        }
      }
    }
    content = regionExtractor.removeDocTags(content, extn.substr(1));

    postData['files[' + relativeFileName + ']'] = content;
  });
  postData['files[license.md]'] = fs.readFileSync(path.join(__dirname, "license.md"));
  postData['tags[0]'] = "angular2";
  postData['tags[1]'] = "example";
  postData.private = true;

  postData.description = "Angular 2 Example - " + config.name;
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
  useNewWindow = false;
  var baseHtml = createBasePlunkerHtml(useNewWindow);
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