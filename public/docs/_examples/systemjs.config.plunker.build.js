/**
 * PLUNKER VERSION FOR CURRENT ANGULAR BUILD
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 *
 * UNTESTED !
 */
(function (global) {
  System.config({
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
    paths: {
      // paths serve as alias
      'npm:': 'https://unpkg.com/',
      'ng:': 'https://cdn.rawgit.com/angular/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'ng:core-builds/master/bundles/core.umd.js',
      '@angular/common': 'ng:common-builds/master/bundles/common.umd.js',
      '@angular/compiler': 'ng:compiler-builds/master/bundles/compiler.umd.js',
      '@angular/platform-browser': 'ng:platform-browser-builds/master/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'ng:platform-browser-dynamic-builds/master/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'ng:http-builds/master/bundles/http.umd.js',
      '@angular/router': 'ng:router-builds/master/bundles/router.umd.js',
      '@angular/forms': 'ng:forms-builds/master/bundles/forms.umd.js',

      // angular testing umd bundles (overwrite the shim mappings)
      '@angular/core/testing': 'ng:core-builds/master/bundles/core-testing.umd.js',
      '@angular/common/testing': 'ng:common-builds/master/bundles/common-testing.umd.js',
      '@angular/compiler/testing': 'ng:compiler-builds/master/bundles/compiler-testing.umd.js',
      '@angular/platform-browser/testing': 'ng:platform-browser-builds/master/bundles/platform-browser-testing.umd.js',
      '@angular/platform-browser-dynamic/testing': 'ng:platform-browser-dynamic-builds/master/bundles/platform-browser-dynamic-testing.umd.js',
      '@angular/http/testing': 'ng:http-builds/master/bundles/http-testing.umd.js',
      '@angular/router/testing': 'ng:router-builds/master/bundles/router-testing.umd.js',
      '@angular/forms/testing': 'ng:forms-builds/master/bundles/forms-testing.umd.js',

      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'ts':                         'npm:plugin-typescript@4.0.10/lib/plugin.js',
      'typescript':                 'npm:typescript@1.9.0-dev.20160409/lib/typescript.js',

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.ts',
        defaultExtension: 'ts'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
