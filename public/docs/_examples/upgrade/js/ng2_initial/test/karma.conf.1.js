module.exports = function(config){
  config.set({

    basePath : '../',

    // #docregion ng2
    files : [
      // #enddocregion ng2
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      // #docregion ng2
      'node_modules/rxjs/bundles/Rx.umd.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/angular2/bundles/angular2-all-testing.umd.dev.js',
      // #enddocregion ng2
      // #docregion upgradeadapter
      'app/js/upgrade_adapter.js',
      // #enddocregion upgradeadapter
      'app/js/**/*.module.js',
      'app/js/**/*.!(module).js',
      'test/unit/**/*.js'
    // #docregion ng2
    ],
    // #enddocregion ng2

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'Firefox'],

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
