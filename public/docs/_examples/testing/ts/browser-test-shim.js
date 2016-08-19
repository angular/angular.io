// BROWSER TESTING SHIM
// Keep it in-sync with what karma-test-shim does
// #docregion
/*global jasmine, __karma__, window*/
(function () {

Error.stackTraceLimit = 0; // "No stacktrace"" is usually best for app testing.

// Uncomment to get full stacktrace output. Sometimes helpful, usually not.
// Error.stackTraceLimit = Infinity; //

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

var baseURL = document.baseURI;
baseURL = baseURL + baseURL[baseURL.length-1] ? '' : '/';

System.config({
  baseURL: baseURL,
  // Extend usual application package list with test folder
  packages: { 'testing': { main: 'index.js', defaultExtension: 'js' } },
  packageWithIndex: true // sadly, we can't use umd packages (yet?)
});

System.import('systemjs.config.js')
  .then(importSystemJsExtras)
  .then(initTestBed)
  .then(initTesting);

/** Optional SystemJS configuration extras. Keep going w/o it */
function importSystemJsExtras(){
  return System.import('systemjs.config.extras.js')
  .catch(function(reason) {
    console.log(
      'WARNING: System.import could not load "systemjs.config.extras.js"; continuing without it.'
    );
    console.log(reason);
  });
}

function initTestBed(){
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
  ])

  .then(function (providers) {
    var testing = providers[0];
    var testingBrowser = providers[1];

    testing.TestBed.initTestEnvironment(
        testingBrowser.BrowserDynamicTestingModule,
        testingBrowser.platformBrowserDynamicTesting());
  })
}

// Import all spec files defined in the html (__spec_files__)
// and start Jasmine testrunner
function initTesting () {
  console.log('loading spec files: '+__spec_files__.join(', '));
  return Promise.all(
    __spec_files__.map(function(spec) {
      return System.import(spec);
    })
  )
  //  After all imports load,  re-execute `window.onload` which
  //  triggers the Jasmine test-runner start or explain what went wrong
  .then(success, console.error.bind(console));

  function success () {
    console.log('Spec files loaded; starting Jasmine testrunner');
    window.onload();
  }
}

})();
