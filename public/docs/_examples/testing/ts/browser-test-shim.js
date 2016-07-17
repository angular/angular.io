// BROWSER TESTING SHIM
// Keep it in-sync with what karma-test-shim does
// #docregion
/*global jasmine, __karma__, window*/
(function () {

Error.stackTraceLimit = 0; // "No stacktrace"" is usually best for app testing.
// Error.stackTraceLimit = Infinity; // Full stacktrace output. Sometimes helpful, usually not.

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

var baseURL = document.baseURI;
baseURL = baseURL + baseURL[baseURL.length-1] ? '' : '/';

System.config({
  baseURL: baseURL,
  // Extend usual application package list with test folder
  packages: { 'test': { main: 'index.js', defaultExtension: 'js' } },
  packageWithIndex: true // sadly, we can't use umd packages (yet?)
});

System.import( baseURL +'systemjs.config.js')
  .then(function () {
    return Promise.all([
      System.import('@angular/core/testing'),
      System.import('@angular/platform-browser-dynamic/testing')
    ])
  })

  .then(function (providers) {
    var testing = providers[0];
    var testingBrowser = providers[1];

    testing.TestBed.initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting());
  })

  // Import the spec files defined in the html (__spec_files__)
  .then(function () {
    console.log('loading spec files: '+__spec_files__.join(', '));
    return Promise.all(
      __spec_files__.map(function(spec) {
        return System.import(spec);
      }));
  })

  //  After all imports load,  re-execute `window.onload` which
  //  triggers the Jasmine test-runner start or explain what went wrong
  .then(success, console.error.bind(console));

function success () {
  console.log('Spec files loaded; starting Jasmine testrunner');
  window.onload();
}

})();
