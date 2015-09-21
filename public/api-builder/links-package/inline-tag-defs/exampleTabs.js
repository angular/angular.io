var path = require('canonical-path');
var fs = require("fs");

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
module.exports = function exampleTabsInlineTagDef(getLinkInfo, parseArgString, getApiFragmentFileName, createDocMessage, log) {
  return {
    name: 'exampleTabs',
    description: 'Process inline example tags (of the form {@example some/uri Some Title}), replacing them with HTML anchors',
    handler: function(doc, tagName, tagDescription) {

      var tagArgs = parseArgString(tagDescription);
      var unnamedArgs = tagArgs._;
      var relativePaths = unnamedArgs[0].split(',');
      var regions = tagArgs.regions || unnamedArgs.length > 1 && unnamedArgs[1];
      var titles = tagArgs.titles || unnamedArgs.length > 2 && unnamedArgs[2];
      if (regions) {
        regions = regions.split(',');
      }

      // TODO: not yet implemented here
      var stylePatterns = tagArgs.stylePattern;

      var mixinPaths = relativePaths.map(function(relativePath, ix) {
        var fragFileName = getApiFragmentFileName(relativePath, regions && regions[ix]);
        if ( !fs.existsSync(fragFileName)) {
          log.warn(createDocMessage('Invalid example (unable to locate fragment file: ' + quote(fragFileName) + ")", doc));
        }
        return path.join('_api', relativePath);
      });

      var comma = ', '
      var pathsArg = quote(mixinPaths.join(','));
      var regionsArg = regions ? quote(regions.join(',')) : 'null';
      var titlesArg = titles ? quote(titles) : 'null';
      var res = [ "+makeTabs(", pathsArg, comma, regionsArg, comma, titlesArg, ")" ].join('');
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
