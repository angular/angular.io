'use strict';

const path = require('canonical-path');

module.exports = function loadDartDocDataProcessor(log, dartPkgConfigInfo, preprocessDartDocData) {
  return {
    // $runAfter: ['reading-docs'],
    // $runBefore: ['docs-read'],

    $process: function (docs) {
      if (docs.length != 0) log.error('Expected docs array to be nonempty.');

      const dataFilePath = path.resolve(dartPkgConfigInfo.ngDartDocPath, 'index.json');
      const dartDocData = require(dataFilePath);
      log.info('Loaded', dartDocData.length, 'dartdoc api entries from', dataFilePath);

      preprocessDartDocData.preprocess(dartDocData);
      docs.push(...dartDocData);
    }
  };
};
