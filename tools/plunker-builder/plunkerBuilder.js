// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');
var Q = require('q');
var del = require('del');
// delPromise is a 'promise' version of del
var delPromise =  Q.denodeify(del);
var _ = require('lodash');

var jsdom = require("jsdom");
var fs = require("fs");
var globule = require('globule');


module.exports = {
  buildPlunkerFrom: buildPlunkerFrom
};

function createPlunkerHtml(useNewWindow) {
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


function buildPlunkerFrom(basePath, examplesPath, useNewWindow) {
  useNewWindow = false;
  var filePath = path.join(basePath, examplesPath);
  var fileTypes = ['*.ts', '*.js', '*.css', '*.html', '*.md', '*.json'];
  var gpaths = fileTypes.map(function(ft) {
    return path.join(filePath, '**/' + ft);
  });
  gpaths.push('!**/typings/**');
  gpaths.push('!**/plunkr.html');
  var fileNames = globule.find(gpaths);

  var postData = {};
  fileNames.forEach(function(fileName) {
    var content = fs.readFileSync(fileName, 'utf-8');
    // var escapedValue = escapeHtml(content);
    var relativeFileName = path.relative(filePath, fileName);
    postData['files[' + relativeFileName + ']'] = content;
  });
  postData['files[license.md]'] = fs.readFileSync(path.join(__dirname, "license.md"));
  postData['tags[0]'] = "angular2";
  postData['tags[1]'] = "example";
  postData.private = true;

  postData.description = "Angular 2 Example - " + examplesPath;

  jsdom.env({
    html: createPlunkerHtml(useNewWindow),
    done: function (err, window) {
      var doc = window.document;
      var form = doc.querySelector('form');

      _.forEach(postData, function(value, key) {
        var ele = htmlToElement(doc, '<input type="hidden" name="' + key + '">');
        ele.setAttribute('value', value);
        form.appendChild(ele)
      });
      var html = doc.documentElement.outerHTML;
      var outputFn = path.join(filePath, "plunkr.html");
      fs.writeFileSync(outputFn, html, 'utf-8' );
    }
  });
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

