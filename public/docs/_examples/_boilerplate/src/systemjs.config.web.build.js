/**
 * WEB VERSION FOR CURRENT ANGULAR BUILD
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 *
 * UNTESTED !
 */
(function (global) {
  System.config({
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      // Copy of compiler options in standard tsconfig.json
      "target": "es5",
      "module": "commonjs",
      "moduleResolution": "node",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "lib": ["es2015", "dom"],
      "noImplicitAny": true,
      "suppressImplicitAnyIndexErrors": true
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
      '@angular/router/upgrade': 'ng:router-builds/master/bundles/router-upgrade.umd.js',
      '@angular/forms': 'ng:forms-builds/master/bundles/forms.umd.js',
      '@angular/upgrade': 'ng:upgrade-builds/master/bundles/upgrade.umd.js',
      '@angular/upgrade/static': 'ng:upgrade-builds/master/bundles/upgrade-static.umd.js',

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
      'rxjs':                      'npm:rxjs@5.0.1',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ts':                        'npm:plugin-typescript@5.2.7/lib/plugin.js',
      'typescript':                'npm:typescript@2.0.10/lib/typescript.js',

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.ts',
        defaultExtension: 'ts'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });

  if (global.autoBootstrap) { bootstrap(); }

  // Bootstrap with a default `AppModule`
  // ignore an `app/app.module.ts` and `app/main.ts`, even if present
  // This function exists primarily (exclusively?) for the QuickStart
  function bootstrap() {
    console.log('Auto-bootstrapping');

    // Stub out `app/main.ts` so System.import('app') doesn't fail if called in the index.html
    System.set(System.normalizeSync('app/main.ts'), System.newModule({ }));

    // bootstrap and launch the app (equivalent to standard main.ts)
    Promise.all([
      System.import('@angular/platform-browser-dynamic'),
      getAppModule()
    ])
    .then(function (imports) {
      var platform = imports[0];
      var app      = imports[1];
      platform.platformBrowserDynamic().bootstrapModule(app.AppModule);
    })
    .catch(function(err){ console.error(err); });
  }

  // Make the default AppModule
  // returns a promise for the AppModule
  function getAppModule() {
    console.log('Making a bare-bones, default AppModule');

    return Promise.all([
      System.import('@angular/core'),
      System.import('@angular/platform-browser'),
      System.import('app/app.component')
    ])
    .then(function (imports) {

      var core    = imports[0];
      var browser = imports[1];
      var appComp = imports[2].AppComponent;

      var AppModule = function() {}

      AppModule.annotations = [
        new core.NgModule({
          imports:      [ browser.BrowserModule ],
          declarations: [ appComp ],
          bootstrap:    [ appComp ]
        })
      ]
      return {AppModule: AppModule};
    })
  }
})(this);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
