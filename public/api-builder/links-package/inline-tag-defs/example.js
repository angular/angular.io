var path = require('canonical-path');
var fs = require("fs");
var FRAGMENT_DIR = "./public/docs/_fragments";

/**
 * @dgService exampleInlineTagDef
 * @description
 * Process inline example tags (of the form {@example relativePath region -title='some title' -stylePattern='{some style pattern}' }),
 * replacing them with a jade makeExample mixin call.
 * @kind function
 * @param  {Object} path   The relative path to example
 * @param  {Function} docs error message
 * @return {String}  The jade makeExample mixin call
 *
 * @property {boolean} relativeLinks Whether we expect the links to be relative to the originating doc
 */
module.exports = function exampleInlineTagDef(getLinkInfo, createDocMessage, log) {
  return {
    name: 'example',
    description: 'Process inline example tags (of the form {@example some/uri Some Title}), replacing them with HTML anchors',
    handler: function(doc, tagName, tagDescription) {

      var tagArgs = parseArgs(tagDescription);
      var unnamedArgs = tagArgs._;
      var relativePath = unnamedArgs[0];
      var region = unnamedArgs.length > 1 && unnamedArgs[1];
      var title = tagArgs.title;
      // TODO: not yet implemented here
      var stylePattern = tagArgs.stylePattern;

      var dir = path.join("_api", path.dirname(relativePath));
      var extn = path.extname(relativePath);
      var baseNameNoExtn = path.basename(relativePath, extn);
      var fileName = region ? baseNameNoExtn + "-" + region + extn : baseNameNoExtn + extn;
      var fullFileName = path.join(FRAGMENT_DIR, dir, fileName);
      if ( !fs.existsSync(fileName)) {
        log.warn(createDocMessage('Invalid example (unable to locate fragment file: ' + quote(fullFileName), doc));
      }

      var comma = ', '
      var res = [ "+makeExample(", quote(dir), comma, quote(fileName), comma, title ? quote(title) : 'null', ")" ].join('');
      return res;
    }

  };
};

function quote(str) {
  if (str == null || str.length === 0) return str;
  str = str.replace("'","'\'");
  return "'" + str + "'";
}


// processes an arg string in 'almost' the same fashion that the command processor does
// and returns an args object in yargs format.
function parseArgs(str) {
  // regex from npm string-argv
  //[^\s'"] Match if not a space ' or "

  //+|['] or Match '
  //([^']*) Match anything that is not '
  //['] Close match if '

  //+|["] or Match "
  //([^"]*) Match anything that is not "
  //["] Close match if "
  var rx = /[^\s'"]+|[']([^']*?)[']|["]([^"]*?)["]/gi;
  var value = str;
  var unnammedArgs = [];
  var args = { _: unnammedArgs };
  var match, key;
  do {
    //Each call to exec returns the next regex match as an array
    match = rx.exec(value);
    if (match !== null) {
      //Index 1 in the array is the captured group if it exists
      //Index 0 is the matched text, which we use if no captured group exists
      var arg = match[2] ? match[2] : (match[1]?match[1]:match[0]);
      if (key) {
        args[key] = arg;
        key = null;
      } else {
        if (arg.substr(arg.length-1) === '=') {
          key = arg.substr(0, arg.length-1);
          // remove leading '-' if it exists.
          if (key.substr(0,1)=='-') {
            key = key.substr(1);
          }
        } else {
          unnammedArgs.push(arg)
          key = null;
        }
      }
    }
  } while (match !== null);
  return args;
}
