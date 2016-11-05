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
      // Complete copy of compiler options in standard tsconfig.json
      "target": "es5",
      "module": "commonjs",
      "moduleResolution": "node",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "removeComments": false,
      "noImplicitAny": true,
      "suppressImplicitAnyIndexErrors": true,
      "typeRoots": [
        "../../node_modules/@types/"
      ]
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
      '@angular/upgrade': 'ng:upgrade-builds/master/bundles/upgrade.umd.js',

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
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ts':                        'npm:plugin-typescript@4.0.10/lib/plugin.js',
      'typescript':                'npm:typescript@2.0.3/lib/typescript.js',

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

  if (!global.noBootstrap) { bootstrap(); }

  // Bootstrap the `AppModule`(skip the `app/main.ts` that normally does this)
  function bootstrap() {

    // Stub out `app/main.ts` so System.import('app') doesn't fail if called in the index.html
    System.set(System.normalizeSync('app/main.ts'), System.newModule({ }));

    // bootstrap and launch the app (equivalent to standard main.ts)
    Promise.all([
      System.import('@angular/platform-browser-dynamic'),
      System.import('app/app.module')
    ])
    .then(function (imports) {
      var platform = imports[0];
      var app      = imports[1];
      platform.platformBrowserDynamic().bootstrapModule(app.AppModule);
    })
    .catch(function(err){ console.error(err); });
  }

})(this);
