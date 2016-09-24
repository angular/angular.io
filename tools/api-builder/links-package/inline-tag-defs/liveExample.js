var path = require('canonical-path');
var fs = require("fs");

/**
 * @dgService liveExampleInlineTagDef
 * @description
 * Process inline liveExample tags (of the form {@liveExample demo-path embedded }),
 * replacing them with a <live-example> directive.
 * Examples:
 * {@liveExample core/animation/ts/dsl }
 * {@liveExample core/di/ts/contentChildren embedded }
 * @kind function
 */
module.exports = function liveExampleInlineTagDef(getLinkInfo, parseArgString, getApiFragmentFileName, createDocMessage, log) {
  return {
    name: 'liveExample',
    description: 'Process inline liveExample tags (of the form {@liveExample demo-path embedded }), replacing them with <live-example>',
    handler: function(doc, tagName, tagDescription) {

      var tagArgs = parseArgString(tagDescription);
      var unnamedArgs = tagArgs._;
      var relativePath = unnamedArgs[0] !== 'embedded' ? unnamedArgs[0] : unnamedArgs[1];
      var embedded = unnamedArgs.indexOf('embedded') >= 0 ? 'embedded' : '';
      var imgPath = tagArgs.img;

      // check if fragment file actually exists.
      var apiPlunkerFile = getApiPlunkerFile(relativePath);
      if ( !fs.existsSync(apiPlunkerFile)) {
        log.warn(createDocMessage(`Invalid example (unable to locate plunker file: ${apiPlunkerFile}`));
      }

      return [ `<live-example api="${relativePath}" ${embedded} ${imgPath ? `img="${imgPath}"` : 'noimg'}></live-example>` ];
    }
  };
};

function getApiPlunkerFile(relativePath) {
  return path.join('/resources/api-live-examples', `${relativePath}/plnkr.html`);
}
