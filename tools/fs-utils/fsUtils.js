var path = require('canonical-path');
var fs = require('fs');
var minimatch = require("minimatch");


// Utility wrappers over fs functions

module.exports = {
  addSymlink: addSymlink,
  removeSymlink: removeSymlink,
  removeDirSync: removeDirSync,
  lstatSyncExt: lstatSyncExt,
};

// create a new link (linkPath) that points
// to realPath - will also delete the linkPath
// if it is a preexisting folder and not itself a symbolic link before it
// starts.
function addSymlink(realPath, linkPath) {

  // check if the linkPath is a folder
  // and if so delete it
  var stat = lstatSyncExt(linkPath);

  if (stat && stat.isSymbolicLink()) {
    // todo: check if it points to realPath
    return;
  }
  if (stat && stat.isDirectory()) {
    removeDirSync(linkPath);
  }
  symLinkSyncExt(realPath, linkPath, 'dir');

}

function removeSymlink(linkPath) {
  var stat = lstatSyncExt(linkPath);
  if (!stat || !stat.isSymbolicLink()) return;

  fs.unlinkSync(linkPath);
}

// remove a dir and all of its files - sync
function removeDirSync(dirPath) {
  var files;
  try {
    files = fs.readdirSync(dirPath);
  }
  catch(e) { return; }
  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      var filePath = path.join(dirPath, files[i]);
      var stat = fs.lstatSync(filePath);
      if (stat.isFile() || stat.isSymbolicLink()) {
        fs.unlinkSync(filePath);
      } else {
        removeDirSync(filePath);
      }
    }
  }
  fs.rmdirSync(dirPath);
}

// same as lstatSync except returns a null for nonExistent file instead of throwing
function lstatSyncExt(filePath) {
  try {
    var stat = fs.lstatSync(filePath);
  } catch (e) {
    if(e.code == 'ENOENT') return null;
    throw e;
  }
  return stat;
}

function symLinkSyncExt(realPath, linkPath, type) {
  // fs.symlink requires the real path to be fully resolved.
  realPath = path.resolve(realPath);
  try {
    fs.symlinkSync(realPath, linkPath, type);
  } catch (e) {
    var msg = "Unable to create symlink: " + linkPath;
    if (e.code == "EPERM") {
      msg += "\nPermissions issue, on windows this function must be run as an administrator."
    }
    console.log(msg + "\n" + e);
  }
}

// Talk to Jay - not currently needed.
//
//function globWithIgnore(basePath, globs, ignoreGlobs, options) {
//  options = options || {};
//  options.filters = globs.map(function (glob) {
//    return minimatch.filter(glob);
//  });
//  options.ignoreFilters = ignoreGlobs && ignoreGlobs.map(function(glob) {
//      return minimatch.filter(glob);
//    });
//  options.ignoreSymlink = options.ignoreSymlink == null ? true : false;
//  return globSyncCore(basePath, options);
//}
//
//function globSyncCore(basePath, options) {
//  var results = [];
//  var files;
//  try {
//    files = fs.readdirSync(basePath);
//  }
//  catch(e) { return results; }
//
//  files.forEach(function(file) {
//    var filePath = path.join(basePath, file);
//    var shouldIgnore = options.ignoreFilters && options.ignoreFilters.some(function(filter) {
//        return filter(filePath);
//      });
//    if (shouldIgnore) return;
//
//    var stat = fs.lstatSync(filePath);
//
//    if (stat.isDirectory()) {
//      if (stat.isSymbolicLink() && options.ignoreSymlink) {
//        // do nothing
//      } else {
//        var partialResults = globSyncCore(filePath, options);
//        Array.prototype.push.apply(results, partialResults);
//      }
//    } else {
//      var ok = options.filters.every(function(filter) {
//        return filter(filePath);
//      });
//      if (ok) {
//        results.push(filePath);
//      }
//    }
//  });
//  return results;
//}
