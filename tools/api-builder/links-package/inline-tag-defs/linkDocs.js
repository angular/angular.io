var path = require('canonical-path');
var fs = require("fs");
var jsonFile = require('jsonfile');

/**
 * @dgService linkDocsInlineTagDef
 * @description
 * Process inline link tags (of the form {@linkDocs some/uri 'Some Title'}), replacing them with HTML anchors.
 * The uri should point to a jade page in the Docs without the .jade extension ( under public/docs ).
 * If the title is omitted an attempt will be made to determine the title of the jade page being pointed to. If not found
 * the the title will simply be the last part of the link.
 * Examples
 *  {@linkDocs guide/gettingStarted 'QuickStart'}
 *  {@linkDocs ts/latest/guide/quickstart }
 *  {@linkDocs js/latest/guide/quickstart 'Javascript version of getting started' }
 *  {@linkDocs ts/latest/guide/quickstart title="Typescript version of getting started" }
 * @kind function
 * @property {string} lang Default docs API page language when not explicitly given in URI; one of ts|js|dart.
 * @property {string} vers Default docs version. Currently only 'latest'.
 */
module.exports = function linkDocsInlineTagDef(parseArgString, createDocMessage, log) {
  var _self = {
    name: 'linkDocs',
    lang: 'ts',
    vers: 'latest',
    description: 'Process inline link tags (of the form {@linkDocs some/uri [title=]"Some Title"}), replacing them with HTML anchors',

    handler: function(doc, tagName, tagDescription) {
      // Parse out the uri and title
      var tagArgs = parseArgString(tagDescription);
      var unnamedArgs = tagArgs._;
      var uri = unnamedArgs[0];
      var title = tagArgs.title || (unnamedArgs.length > 1 ? unnamedArgs[1] : null);

      // Are there parameters and/or an anchor?
      var matches, paramAnchor = '';
      if (matches = uri.match(/([^\#\?]*)([\#\?].*)/)) {
        uri = matches[1];
        paramAnchor = matches[2];
      }

      // Is this a chapter-relative uri like 'guide/...'?
      if (!uri.match(/^(ts|js|dart)/)) {
        var lang = _self.lang;
        var vers = _self.vers;
        var prevUri = uri;
        uri = path.join(lang, vers, uri);
        var fileName = doc.fileInfo ? (' (' + doc.fileInfo.baseName + ')') : '';
        log.info('Ajusted linkDocs chapter-relative uri' + fileName + ': ' + prevUri + ' -> ' + uri);
      }

      var isValid = false;
      var jadePath = path.join('./public/docs', uri + '.jade');
      var key = path.basename(jadePath, '.jade');
      if ( !fs.existsSync(jadePath)) {
        log.warn(createDocMessage('Invalid docs link (unable to locate jade file: "' + jadePath + '")', doc));
      } else {
        isValid = true;
        if (!title) {
          var jsonFilePath = path.join(path.dirname(jadePath), '_data.json');
          if ( fs.existsSync(jsonFilePath)) {
            var jsonObj = jsonFile.readFileSync(jsonFilePath);
            title = jsonObj[key] && jsonObj[key].title;
          }
        }
      }
      var url = path.join('/docs', uri + '.html' + paramAnchor);
      title = title || key || url;

      return isValid ?
        '<a href="' + url + '">' + title + '</a>' :
        '<span>' + title + '</span>';
    }
  };
  return _self;
};
