// Configuration for the Wallaby Visual Studio Code testing extension
// https://marketplace.visualstudio.com/items?itemName=WallabyJs.wallaby-vscode
// Note: Wallaby is not open source and costs money

module.exports = function () {

  return {
    files: [
      // System.js for module loading
      {pattern: 'node_modules/systemjs/dist/system.js', instrument: false},
      {pattern: 'systemjs.config.js', instrument: false},

      // Polyfills
      {pattern: 'node_modules/core-js/client/shim.min.js', instrument: false},
      {pattern: 'node_modules/reflect-metadata/Reflect.js', instrument: false},

      // zone.jss
      // Rx.js, Angular 2 itself, and the testing library not here because loaded by systemjs
      {pattern: 'node_modules/zone.js/dist/zone.js', instrument: false},
      {pattern: 'node_modules/zone.js/dist/jasmine-patch.js', instrument: false},
      {pattern: 'node_modules/zone.js/dist/async-test.js', instrument: false},
      {pattern: 'node_modules/zone.js/dist/fake-async-test.js', instrument: false},

      {pattern: 'app/**/*+(ts|html|css)', load: false},
      {pattern: 'app/**/*.spec.ts', ignore: true},

      {pattern: 'test/**/*+(ts|html|css)', load: false},
    ],

    tests: [
      {pattern: 'app/**/*.spec.ts', load: false}
    ],

    middleware: function (app, express) {
      app.use('/node_modules', express.static(require('path').join(__dirname, 'node_modules')));
    },

    testFramework: 'jasmine',

    debug: true,

    bootstrap: function (wallaby) {
      wallaby.delayStart();

      System.config({
        // Extend usual application package list with test folder
        packages: { 'test': { main: 'index.js', defaultExtension: 'js' } },
        packageWithIndex: true // sadly, we can't use umd packages (yet?)
      });

      System.import('systemjs.config.js')
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

          // Load all spec files
          return Promise.all(wallaby.tests.map(function (specFile) {
            return System.import(specFile);
          }));
        })
        .then(function () {
          wallaby.start();
        })
        .catch(function (e) {
          setTimeout(function () {
            throw e;
          }, 0);
        });
    }
  };
};
