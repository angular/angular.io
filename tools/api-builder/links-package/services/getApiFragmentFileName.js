var path = require('canonical-path');
var FRAGMENT_DIR = "./public/docs/_fragments";

/**
 * @dgService getApiFragmentFileName
 * @description
 * returns the name of the api fragment file given a relative path and a region tag.
  * @kind function
 * @param  {String} relativePath   The relative path to the example file some part of which will be pulled in.
 * @param  {String} region   Name of a region within this file ( may be null).
 * @return {Object} The api fragment file name
 * @return {Object} The api fragment file name
 */

module.exports = function getApiFragmentFileName() {

  return function getApiFragmentFileName(relativePath, region) {
    var dir = path.join("_api", path.dirname(relativePath));
    var extn = path.extname(relativePath);
    var baseNameNoExtn = path.basename(relativePath, extn);
    var fileName = region ? baseNameNoExtn + "-" + region + extn : baseNameNoExtn + extn;
    var fragFileName = path.join(FRAGMENT_DIR, dir, fileName + '.md');
    return fragFileName;
  }
}