module.exports = function(config){
  config.set({

    basePath : '..',

    // #docregion ng2
    files : [
    // #enddocregion ng2
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      // #docregion ng2
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
      // #enddocregion ng2
      'test/karma_test_shim.js',
      {pattern: 'app/js/**/*.js', included: false, watched: true},
      {pattern: 'test/unit/**/*.js', included: false, watched: true}
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
