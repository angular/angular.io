'use strict';

const assert = require('assert-plus');
const fs = require('fs-extra');
const path = require('canonical-path');
const Array_from = require('./arrayFromIterable');

module.exports = function apiListDataFileService(log, dartPkgConfigInfo) {

  const _self = {

    mainDataFileName: 'api-list.json',
    mainDataFilePath: null,

    libToEntryMap: null,
    containerToEntryMap: null,
    numExcludedEntries: 0,

    createDataAndSaveToFile: function (dartDocDataWithExtraProps) {
      const libToEntryMap = _self.libToEntryMap = new Map();
      const containerToEntryMap = _self.containerToEntryMap = new Map();
      const re = dartPkgConfigInfo.excludeLibRegExp;

      // Populate the two maps from dartDocDataWithExtraProps.
      dartDocDataWithExtraProps.forEach((e) => {
        // Skip non-preprocessed entries.
        if (!e.kind) return true;

        // Exclude non-public APIs.
        if (e.libName.match(re)) { _self.numExcludedEntries++; return true; }

        let key;
        if (e.kind.startsWith('entry')) {
          // Store library entry info in lib map.
          key = e.libName;
          assert.equal(key, e.enclosedByQualifiedName, e);
          _set(libToEntryMap, key, e);
        } else if (e.enclosedBy) {
          assert.notEqual(e.type, 'library');
          key = e.enclosedByQualifiedName;
        } else {
          assert.equal(e.type, 'library');
          // Add library "index" page to the library's entries in the general container map,
          // but not the lib map which is used to create the main API page index.
          key = e.libName;
          _set(containerToEntryMap, key, e);
          // Add the library as an entry to the Angular2 package container:
          key = '';
        }
        _set(containerToEntryMap, key, e);
      });
      log.info('Excluded', _self.numExcludedEntries, 'library entries (regexp match).');

      // Write the library map out as the top-level data file.
      _self.mainDataFilePath = path.resolve(path.join(dartPkgConfigInfo.ngIoDartApiDocPath, _self.mainDataFileName));

      // The data file needs to be a map of lib names to an array of entries
      const fileData = Object.create(null);
      for (let name of Array_from(libToEntryMap.keys()).sort()) {
        fileData[name] = Array_from(libToEntryMap.get(name).values());
      }
      fs.writeFileSync(_self.mainDataFilePath, JSON.stringify(fileData, null, 2));
      log.info('Wrote', Object.keys(fileData).length, 'library entries to', _self.mainDataFilePath);
      return fileData;
    },

  }
  return _self;
};

// Adds e to the map of m[key].
function _set(m, key, e) {
  if (!m.has(key)) m.set(key, new Map());
  const entryMap = m.get(key);
  entryMap.set(e.name, e);
}