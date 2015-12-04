// #docregion templates
module.exports = function(config){
  config.set({
// #enddocregion templates
    basePath : '../',

    // #docregion templates
    files : [
      // #enddocregion templates

      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-mocks/angular-mocks.js',
      '../node_modules/systemjs/dist/system.src.js',
      '../node_modules/angular2/bundles/angular2.dev.js',
      '../node_modules/angular2/bundles/http.dev.js',
      '../node_modules/angular2/bundles/testing.js',
      'test/karma_test_shim.js',
      {pattern: 'app/**/*.js', included: false, watched: true},
      // #docregion templates
      {pattern: 'app/**/*.html', included: false, watched: true},
      // #enddocregion templates
      {pattern: 'test/unit/**/*.js', included: false, watched: true}
    // #docregion templates
    ],
    // #enddocregion templates

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
    },

    // #docregion templates
    proxies: {
      // required for component assests fetched by Angular's compiler
      "/app/": "/base/app/"
    },

  });
};
// #enddocregion templates
