// #docregion
var fsExtra = require('fs-extra');
var resources = [
  // polyfills
  'node_modules/core-js/client/shim.min.js',
  'node_modules/zone.js/dist/zone.min.js',
  // css
  'app/app.css',
  'app/app.animations.css',
  // images and json files
  'app/img/',
  'app/phones/',
  // app files
  'app/app.module.ajs.js',
  'app/app.config.js',
  'app/app.animations.js',
  'app/core/core.module.js',
  'app/core/phone/phone.module.js',
  'app/phone-list/phone-list.module.js',
  'app/phone-detail/phone-detail.module.js'
];
resources.map(function(sourcePath) {
  var destPath = `aot/${sourcePath}`;
  fsExtra.copySync(sourcePath, destPath);
});
