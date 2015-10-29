var path = require('canonical-path');
var fs = require("fs");
var jsonFile = require('jsonfile');

var INLINE_LINK = /(\S+)(?:\s+([\s\S]+))?/;

/**
 * @dgService linkDevGuideInlineTagDef
 * @description
 * Process inline link tags (of the form {@linkDevGuide some/uri 'Some Title'}), replacing them with HTML anchors.
 * The uri should point to a jade page in the DevGuide without the .jade extension ( under public/docs ).
 * If the title is omitted an attempt will be made to determine the title of the jade page being pointed to. If not found
 * the the title will simply be the last part of the link.
 * Examples
 *  {@linkDevGuide ts/latest/guide/gettingStarted }
 *  {@linkDevGuide js/latest/guide/gettingStarted 'Javascript version of getting started' }
  * {@linkDevGuide ts/latest/guide/gettingStarted title="Typescript version of getting started" }
 * @kind function
 */
module.exports = function linkDevGuideInlineTagDef(parseArgString, createDocMessage, log) {
  return {
    name: 'linkDevGuide',
    description: 'Process inline link tags (of the form {@link some/uri "Some Title"}), replacing them with HTML anchors',
    handler: function(doc, tagName, tagDescription) {

      // Parse out the uri and title
      var tagArgs = parseArgString(tagDescription);
      var unnamedArgs = tagArgs._;
      var uri = unnamedArgs[0];
      var title = tagArgs.title || (unnamedArgs.length > 1 ? unnamedArgs[1] : null);

      var jadePath = path.join('./public/docs', uri + '.jade');
      var key = path.basename(jadePath, '.jade');
      if ( !fs.existsSync(jadePath)) {
        log.warn(createDocMessage('Invalid DevGuide example (unable to locate jade file: "' + jadePath + '")', doc));
      } else {
        if (!title) {
          var jsonFilePath = path.join(path.dirname(jadePath), '_data.json');
          if ( fs.existsSync(jsonFilePath)) {
            var jsonObj = jsonFile.readFileSync(jsonFilePath);
            title = jsonObj[key] && jsonObj[key].title;
          }
        }
      }
      var url = path.join('/docs', uri + '.html');
      title = title || key || url;

      return "<a href='" + url + "'>" + title + "</a>";

    }
  };
};

