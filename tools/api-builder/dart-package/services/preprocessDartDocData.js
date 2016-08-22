'use strict';

const assert = require('assert-plus');
const path = require('canonical-path');
const fs = require('fs-extra');

module.exports = function preprocessDartDocData(log, dartPkgConfigInfo) {

  const _self = {

    entryMap: null,

    preprocess: function (dartDocData) {
      // List of API entities
      let entryMap = _self.entryMap = new Map(); // used to remove duplicates
      let numDuplicates = 0;

      dartDocData
        .forEach((e) => {
          if (entryMap.has(e.href)) {
            log.debug('Dartdoc preprocessor: duplicate entry for', e.href);
            numDuplicates++;
            return true;
          }
          // Sample entry (note that enclosedBy is optional):
          // {
          //   "name": "Pipe",
          //   "qualifiedName": "angular2.core.Pipe",
          //   "href": "angular2.core/Pipe-class.html",
          //   "type": "class",
          //   "enclosedBy": {
          //       "name": "angular2.core",
          //       "type": "library"
          //   }
          // }

          // Save original type property since it will be overridden.
          e.origDartDocType = e.type;
          const name = e.name;
          const qualifiedName = e.qualifiedName;
          const matches = e.href.match(/-([a-z]+)\.html/);
          let type = matches ? (e.typeFromHref = matches[1]) : e.type;
          // Conform to TS type names for now.
          if (type === 'constant') type = 'let';

          let libName;
          e.enclosedByQualifiedName = path.dirname(e.href);
          if (e.enclosedBy && e.enclosedBy.type === 'library') {
            e.kind = 'entry-dart-api';
            libName = e.enclosedBy.name;
            assert.equal(libName, e.enclosedByQualifiedName, e.kind);
          } else if (e.origDartDocType === 'library') {
            e.kind = 'library-dart-api';
            libName = e.name;
            e.enclosedByQualifiedName = ''; // Dart libraries can only be at the top level.
          } else {
            e.kind = 'subentry-dart-api';
            libName = e.enclosedByQualifiedName.split('/')[0];
            assert.equal(path.join(libName, e.enclosedBy.name), e.enclosedByQualifiedName, e);
          }
          e.docType = type;
          e.libName = libName;
          e.path = e.href;
          e.title = name;
          e.layout = false; // To prevent public/docs/_layout.jade from be applied to Dart API pages
          // Also set above:
          //   e.kind: one of {library,entry,subentry}-dart-api
          //   e.enclosedByQualifiedName
          //   e.origDartDocType
          //   e.typeFromHref
          Object.freeze(e);
          entryMap.set(e.path, e);
          log.silly('Preproc API entity =', JSON.stringify(e, null, 2));
        });
      // There shouldn't be duplicates (hence the warning), but there are:
      // https://github.com/dart-lang/dartdoc/issues/1197
      if (numDuplicates) log.warn('Number of duplicate dartdoc entries', numDuplicates);
    },
  };
  return _self;
};