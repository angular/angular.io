/*global jasmine, __karma__, window*/

// Browser testing shim
(function () {

// Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Configure systemjs to use the .js extension for imports from the app folder
System.config({
  packages: {
    app: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

// Configure Angular for the browser and with test versions of the platform providers
System.import('angular2/testing')
  .then(function (testing) {
    return System.import('angular2/platform/testing/browser')
      .then(function (providers) {
        testing.setBaseTestProviders(
          providers.TEST_BROWSER_PLATFORM_PROVIDERS,
          providers.TEST_BROWSER_APPLICATION_PROVIDERS
        );
      });
  })

  // Load the spec files (__spec_files__) explicitly
  .then(function () {
    console.log('loading spec files: '+__spec_files__.join(', '));
    return Promise.all(__spec_files__.map(function(spec) { return System.import(spec);} ));
  })

  //  After all imports load,  re-execute `window.onload` which
  //  triggers the Jasmine test-runner start or explain what went wrong
  .then(success, console.error.bind(console));

function success () {
  console.log('Spec files loaded; starting Jasmine testrunner');
  window.onload();
}


})();
