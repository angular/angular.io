// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;


jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};


System.config({
  packages: {
    'base/src/app': {
      defaultExtension: false,
      // removed because of issues with raw .js files not being found.
      // format: 'register',
      map: Object.keys(window.__karma__.files).
            filter(onlyAppFiles).
            reduce(function createPathRecords(pathsMapping, appPath) {
              // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
              // './hero.service': '/base/src/app/hero.service.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
              var moduleName = appPath.replace(/^\/base\/src\/app\//, './').replace(/\.js$/, '');
              pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath]
              return pathsMapping;
            }, {})

      }
    }
});

// old code from angular 44
// System.import('angular2/src/core/dom/browser_adapter').then(function(browser_adapter) {
// new path for angular 51
System.import('angular2/src/platform/browser/browser_adapter').then(function(browser_adapter) {
    browser_adapter.BrowserDomAdapter.makeCurrent();
}).then(function() {
  return Promise.all(
    Object.keys(window.__karma__.files) // All files served by Karma.
    .filter(onlySpecFiles)
    // .map(filePath2moduleName)        // Normalize paths to module names.
    .map(function(moduleName) {
      // loads all spec files via their global module names (e.g. 'base/src/app/hero.service.spec')
      return System.import(moduleName);
    }));
})
.then(function() {
  __karma__.start();
}, function(error) {
  __karma__.error(error.stack || error);
});


function filePath2moduleName(filePath) {
  return filePath.
           replace(/^\//, '').              // remove / prefix
           replace(/\.\w+$/, '');           // remove suffix
}


function onlyAppFiles(filePath) {
  return /^\/base\/src\/app\/.*\.js$/.test(filePath) && !onlySpecFiles(filePath);
}


function onlySpecFiles(filePath) {
  return /\.spec\.js$/.test(filePath);
}
