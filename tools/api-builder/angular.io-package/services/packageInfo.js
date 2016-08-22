'use strict';

var fs = require('fs');
var path = require('canonical-path');

/**
 * Load information about this project from the package.json
 * @return {Object} The package information
 */
module.exports = function packageInfo() {

  var angularPackageJson= path.join('../angular','package.json');
  return JSON.parse(fs.readFileSync(angularPackageJson), 'UTF-8');
}