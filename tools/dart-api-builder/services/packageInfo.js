'use strict';

var fs = require('fs');
var path = require('canonical-path');

/**
 * Load information about this project from the pubspec.yaml
 * @return {Object} The package information
 */
module.exports = function packageInfo() {
  const ngPath = '../angular-dart';
  const angularPubspec = path.join(ngPath, 'pubspec.yaml');
  const pubspec = fs.readFileSync(angularPubspec, 'UTF-8').split('\n');

  const info = {
    version: _get(pubspec, 'version'),
    repository: {
      type: 'git', //? 'pub' @ 'https://pub.dartlang.org/packages/angular2'
      // Not sure `url has a user visible impact on the generated cheatsheet. 
      url: 'https://github.com/angular/angular.git', 
    }
  };
  return info;
}

// Array.prototype.find doesn't seem to be working.
// console.error([1, 'a', 2].find((x) => x === 'a')); // --> -1
function _find(arr, test) {
  for (let x of arr) {
    // console.error(`Looking at: ${x}`);
    if (test(x)) return x;
  }
}

function _get(lines, tag) {
  const line = _find(lines, (line) => line.startsWith(tag));
  return line.match(/^\w+: (.*)/)[1] || 'unknown';
}
