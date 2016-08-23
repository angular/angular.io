'use strict';

var Package = require('dgeni').Package;
var path = require('canonical-path');

module.exports = new Package('dart', [])

  .factory(require('./services/apiListDataFileService'))
  .factory(require('./services/arrayFromIterable'))
  .factory(require('./services/dartPkgConfigInfo'))
  .factory(require('./services/logFactory'))
  .factory(require('./services/preprocessDartDocData'))

  // Register the processors
  .processor(require('./processors/loadDartDocData'))
  // .processor(require('./processors/createApiListData'))
  // .processor(require('./processors/loadDartDocHtml'))
  ;
