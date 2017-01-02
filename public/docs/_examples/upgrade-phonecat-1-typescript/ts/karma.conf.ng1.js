//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'https://unpkg.com/angular@1.5.8/angular.js',
      'https://unpkg.com/angular-resource@1.5.8/angular-resource.js',
      'https://unpkg.com/angular-route@1.5.8/angular-route.js',
      'https://unpkg.com/angular-mocks@1.5.8/angular-mocks.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '!(bower_components)/**/*!(.module|.spec).js',
      '**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]

  });
};
