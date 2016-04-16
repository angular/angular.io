exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  directConnect: true,

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  // #docregion ng2
  useAllAngular2AppRoots: true,
  // #enddocregion ng2
  
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
