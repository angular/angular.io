// #docregion
module.exports = function(config){
  config.set({

    baseDir: '.',

    // #docregion ng2
    files : [
    // #enddocregion ng2
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      // #docregion ng2
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
      // #enddocregion ng2
      'karma_test_shim.js',
      {pattern: 'app/**/*.module.js', included: false, watched: true},
      {pattern: 'app/*!(.module|.spec).js', included: false, watched: true},
      {pattern: 'app/!(bower_components)/**/*!(.module|.spec).js', included: false, watched: true},
      {pattern: 'app/**/*.spec.js', included: false, watched: true},
      {pattern: 'app/**/*.html', included: false, watched: true}
    // #docregion ng2
    ],
    // #enddocregion ng2

    proxies: {
      // required for component assets fetched by Angular's compiler
      "/": "/base/app/"
    },

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
