// #docregion
module.exports = function(config){
  config.set({

    basePath : '../',

    // #docregion html
    files : [
      // #enddocregion html
      'node_modules/rxjs/bundles/Rx.umd.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/angular2/bundles/angular2-all-testing.umd.dev.js',
      'app/js/upgrade_adapter.js',
      'app/js/**/*.module.js',
      'app/js/**/*.!(module).js',
      'test/unit/**/*.js',
    // #docregion html
      {pattern: 'app/js/**/*.html', included: false, watched: true}
    ],

    proxies: {
      // required for component assests fetched by Angular's compiler
      "/js": "/base/app/js"
    },
    // #enddocregion html

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
