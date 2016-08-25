/**
 * PLUNKER CURRENT BUILD VERSION
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  var ngVer = '@2.0.0-rc.5'; // lock in the angular package version; do not let it float to current!
  var routerVer = '@3.0.0-rc.1'; // lock router version
  var formsVer = '@0.3.0'; // lock forms version
  var routerDeprecatedVer = '@2.0.0-rc.2'; // temporarily until we update all the guides

  //map tells the System loader where to look for things
  var  map = {
    'app':                        'app',


    '@angular/core': 'https://cdn.rawgit.com/angular/core-builds/master',
    '@angular/common': 'https://cdn.rawgit.com/angular/common-builds/master',
    '@angular/compiler':'https://cdn.rawgit.com/angular/compiler-builds/master',
    '@angular/forms':'https://cdn.rawgit.com/angular/forms-builds/master',
    '@angular/http':'https://cdn.rawgit.com/angular/http-builds/master',
    '@angular/platform-browser':'https://cdn.rawgit.com/angular/platform-browser-builds/master',
    '@angular/platform-browser-dynamic': 'https://cdn.rawgit.com/angular/platform-browser-dynamic-builds/master',
    '@angular/router': 'https://cdn.rawgit.com/angular/router-builds/master',

    'rxjs':       'https://npmcdn.com/rxjs@5.0.0-beta.6',
    'ts':         'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
    'typescript': 'https://npmcdn.com/typescript@1.9.0-dev.20160409/lib/typescript.js',

    'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api',
 };

  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    app: {
      main: 'main.ts',
      defaultExtension: 'ts'
    },
    '@angular/core': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/compiler': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/common': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/forms': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/http': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser-dynamic': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/router': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'angular2-in-memory-web-api': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    }
  }
   var config = {
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      tsconfig: true
    },
    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    map: map,
    packages: packages
  };

  System.config(config);

})(this);
