var path = require('canonical-path');
var yargs = require('yargs');

var INLINE_EXAMPLE = /(\S+)(\s+\S*)?(\s+\S*=(?:".*?"|'.*?'))?(\s+\S*=(?:".*?"|'.*?'))?(\s+\S*=(?:".*?"|'.*?'))?/;
var KEY_VALUE_RX =   /\s*(\S*)\s*=\s*(?:"(.*)?"|'(.*)?')/;
/**
 * @dgService exampleInlineTagDef
 * @description
 * Process inline example tags (of the form {@example some/uri region -title='some title' -stylePattern='{some style pattern}' }), replacing them with HTML anchors
 * @kind function
 * @param  {Object} path   The relative path to example
 * @param  {Function} docs error message
 * @return {String}  The html link information
 *
 * @property {boolean} relativeLinks Whether we expect the links to be relative to the originating doc
 */
module.exports = function exampleInlineTagDef(getLinkInfo, createDocMessage, log) {
  return {
    name: 'example',
    description: 'Process inline example tags (of the form {@example some/uri Some Title}), replacing them with HTML anchors',
    handler: function(doc, tagName, tagDescription) {

      var tagArgs = parseArgs(tagDescription);
      var args = yargs.parse(tagArgs);
      var unnamedArgs = args._;
      var relativePath = unnamedArgs[0];
      var region = unnamedArgs.length > 1 && unnamedArgs[1];
      var title = args.title;
      var stylePattern = args.stylePattern;
      if (region) {
        var dir = path.join("_api", path.dirname(relativePath));
        var extn = path.extname(relativePath);
        var baseNameNoExtn = path.basename(relativePath, extn);
        var baseName = baseNameNoExtn + "-" + region + extn;
      }
      var comma = ', '
      var res = [ "+makeExample(", quote(dir), comma, quote(baseName), comma, title || 'null', ")" ].join('');
      return res;
    }

  };
};

function quote(str) {
  return "'" + str + "'";
}

// copied with some mods/fixes from npm string-argv
function parseArgs(str) {
  //[^\s'"] Match if not a space ' or "

  //+|['] or Match '
  //([^']*) Match anything that is not '
  //['] Close match if '

  //+|["] or Match "
  //([^"]*) Match anything that is not "
  //["] Close match if "
  var rx = /[^\s'"]+|[']([^']*?)[']|["]([^"]*?)["]/gi;
  var value = str;
  var args = [];
  var match;
  do {
    //Each call to exec returns the next regex match as an array
    match = rx.exec(value);
    if (match !== null) {
      //Index 1 in the array is the captured group if it exists
      //Index 0 is the matched text, which we use if no captured group exists
      args.push(match[2] ? match[2] : (match[1]?match[1]:match[0]));
    }
  } while (match !== null);

  return args;
}
