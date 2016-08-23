'use strict';

var path = require('canonical-path');
var fs = require("q-io/fs");
var q = require('q');
var cheerio = require('cheerio');

// Original sample file by @petebacondarwin
// Not currently used, but keeping it for now,
// until we completely rule out use of dgeni.

module.exports = function loadDartDocHtmlProcessor(log, dartPkgConfigInfo) {
  return {
    $runAfter: ['loadDartDocDataProcessor'],
    // $runBefore: ['docs-read'],

    $process: function (docs) {
      var ngIoDartApiDocPath = dartPkgConfigInfo.ngIoDartApiDocPath;

      // Return a promise sync we are async in here
      return q.all(docs.map(function (doc) {
        if (doc.kind.match(/-dart-api$/)) return;

        // Load up the HTML and extract the contents of the body
        var htmlPath = path.resolve(ngIoDartApiDocPath, doc.href);

        return fs.exists(htmlPath).then(function (exists) {

          if (!exists) {
            log.debug('missing html ' + htmlPath);
            return;
          }

          return fs.read().then(function (html) {
            log.info('Reading ' + htmlPath)
            var $ = cheerio.load(html);
            doc.htmlContent = $('body').contents().html();
          });

        });

      }));
    }
  }
};
