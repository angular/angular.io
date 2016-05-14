module.exports = function(config){
  config.set({

    basePath: './app',

    // #docregion files
    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-mocks/angular-mocks.js',
      '../node_modules/systemjs/dist/system.src.js',
      '../karma_test_shim.js',
      {pattern: '**/*.module.js', included: false, watched: true},
      {pattern: '*!(.module|.spec).js', included: false, watched: true},
      {pattern: '!(bower_components)/**/*!(.module|.spec).js', included: false, watched: true},
      {pattern: '**/*.spec.js', included: false, watched: true}
    ],
    // #enddocregion files

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

    logLevel: config.LOG_DEBUG

  });
};
