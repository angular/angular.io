// #docregion
// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

System.config({
  map: {
    'rxjs': 'base/node_modules/rxjs',
    '@angular': 'base/node_modules/@angular'
  },
  packages: {
    'base/app/js': {
      defaultExtension: false,
      format: 'register',
      map: Object.keys(window.__karma__.files).
            filter(onlyAppFiles).
            reduce(function createPathRecords(pathsMapping, appPath) {
              // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
              // './hero.service': '/base/src/app/hero.service.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
              var moduleName = appPath.replace(/^\/base\/app\/js\//, './').replace(/\.js$/, '');
              pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath]
              return pathsMapping;
            }, {})
    },
    '@angular/common':                   { main: 'index.js', defaultExtension: 'js' },
    '@angular/compiler':                 { main: 'index.js', defaultExtension: 'js' },
    '@angular/core':                     { main: 'index.js', defaultExtension: 'js' },
    '@angular/http':                     { main: 'index.js', defaultExtension: 'js' },
    '@angular/platform-browser':         { main: 'index.js', defaultExtension: 'js' },
    '@angular/platform-browser-dynamic': { main: 'index.js', defaultExtension: 'js' },
    '@angular/router':                   { main: 'index.js', defaultExtension: 'js' },
    '@angular/upgrade':                  { main: 'index.js', defaultExtension: 'js' },
    'rxjs':                              { defaultExtension: 'js' }
  }
});

// #docregion ng2
System.import('@angular/core/testing').then(function(testing) {
  return System.import('@angular/platform-browser-dynamic/testing').then(function(browserTesting) {
    testing.setBaseTestProviders(browserTesting.TEST_BROWSER_PLATFORM_PROVIDERS,
                                 browserTesting.TEST_BROWSER_APPLICATION_PROVIDERS);
  });
}).then(function() {
  return Promise.all(
    Object.keys(window.__karma__.files) // All files served by Karma.
    .filter(onlySpecFiles)
    .map(function(moduleName) {
      // loads all spec files via their global module names
      return System.import(moduleName);
  }));
}).then(function() {
  __karma__.start();
}, function(error) {
  __karma__.error(error.stack || error);
});
// #enddocregion ng2

function onlyAppFiles(filePath) {
  return /^\/base\/app\/js\/.*\.js$/.test(filePath)
}

function onlySpecFiles(path) {
  return /\.spec\.js$/.test(path);
}
