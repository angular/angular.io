var path = require('canonical-path');
var fs = require("fs");

/**
 * @dgService exampleInlineTagDef
 * @description
 * Process inline example tags (of the form {@example relativePath region -title='some title' -stylePattern='{some style pattern}' }),
 * replacing them with a jade makeExample mixin call.
 * Examples:
 * {@example core/application_spec.ts hello-app -title='Sample component' }
 * {@example core/application_spec.ts -region=hello-app -title='Sample component' }
 * @kind function
 */
module.exports = function exampleInlineTagDef(getLinkInfo, parseArgString, getApiFragmentFileName, createDocMessage, log) {
  return {
    name: 'example',
    description: 'Process inline example tags (of the form {@example some/uri Some Title}), replacing them with HTML anchors',
    handler: function(doc, tagName, tagDescription) {

      var tagArgs = parseArgString(tagDescription);
      var unnamedArgs = tagArgs._;
      var relativePath = unnamedArgs[0];
      var mixinFilePath = path.join('_api', relativePath);
      var region = tagArgs.region || (unnamedArgs.length > 1 ?  unnamedArgs[1] : null);
      var title = tagArgs.title || (unnamedArgs.length > 2 ? unnamedArgs[2] : null );
      // TODO: not yet implemented here
      var stylePattern = tagArgs.stylePattern;

      // check if fragment file actually exists.
      var fragFileName = getApiFragmentFileName(relativePath, region);
      if ( !fs.existsSync(fragFileName)) {
        log.warn(createDocMessage('Invalid example (unable to locate fragment file: ' + quote(fragFileName) + ")", doc));
      }

      var comma = ', ';
      // the '+' character is a jade thing for mixins http://jade-lang.com/reference/mixins/
      var res = [ "+makeExample(", quote(mixinFilePath), comma, region ? quote(region) : 'null', comma, title ? quote(title) : 'null', ")" ].join('');
      return res;
    }
  };
};

function quote(str) {
  if (str == null || str.length === 0) return str;
  str = str.replace("'","'\'");
  return "'" + str + "'";
}
