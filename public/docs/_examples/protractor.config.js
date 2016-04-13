// TO RUN THE TESTS
//
// The first time, run:
//   ./node_modules/.bin/webdriver-manager update
// Make sure the test server is running. Then do.
//   ./node_modules/.bin/protractor protractor.config.js

var fs = require('fs');
var path = require('canonical-path');
var _ = require('lodash');


exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to this config file
  specs: ['**/*e2e-spec.js' ],


  // For angular2 tests
  useAllAngular2AppRoots: true,

  // Base URL for application server
  baseUrl: 'http://localhost:8080',

  // doesn't seem to work.
  // resultJsonOutputFile: "foo.json",

  onPrepare: function() {
    //// SpecReporter
    //var SpecReporter = require('jasmine-spec-reporter');
    //jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'none'}));
    //// jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));

    // debugging
    // console.log('browser.params:' + JSON.stringify(browser.params));

    var appDir = browser.params.appDir;
    if (appDir) {
      if (appDir.match('/ts') != null) {
        browser.appIsTs = true;
      } else if (appDir.match('/js') != null) {
        browser.appIsJs = true;
      } else if (appDir.match('/dart') != null) {
        browser.appIsDart = true;
      } else {
        browser.appIsUnknown = true;
      }
    } else {
      browser.appIsUnknown = true;
    }
    jasmine.getEnv().addReporter(new Reporter( browser.params )) ;
    global.describeIf = describeIf;
    global.itIf = itIf;
    global.sendKeys = sendKeys;

    // Allow changing bootstrap mode to NG1 for upgrade tests
    global.setProtractorToNg1Mode = function() {
      browser.useAllAngular2AppRoots = false;
      browser.rootEl = 'body';
    };
  },

  jasmineNodeOpts: {
    // defaultTimeoutInterval: 60000,
    defaultTimeoutInterval: 10000,
    showTiming: true,
    print: function() {}
  }
};

function describeIf(cond, name, func) {
  if (cond) {
    describe(name, func);
  } else {
    xdescribe(name, func);
  }
}

function itIf(cond, name, func) {
  if (cond) {
    it(name, func);
  } else {
    xit(name, func);
  }
}

// Hack - because of bug with send keys
function sendKeys(element, str) {
  return str.split('').reduce(function (promise, char) {
    return promise.then(function () {
      return element.sendKeys(char);
    });
  }, element.getAttribute('value'));
  // better to create a resolved promise here but ... don't know how with protractor;
}


function Reporter(options) {
  var _defaultOutputFile = path.resolve(process.cwd(), "../../", 'protractor-results.txt');
  options.outputFile = options.outputFile || _defaultOutputFile;

  var _root = { appDir: options.appDir, suites: [] };
  log('AppDir: ' + options.appDir, +1);
  var _currentSuite;

  this.suiteStarted = function(suite) {
    _currentSuite = { description: suite.description, status: null, specs: [] };
    _root.suites.push(_currentSuite);
    log('Suite: ' + suite.description, +1);
  };

  this.suiteDone = function(suite) {
    var statuses = _currentSuite.specs.map(function(spec) {
      return spec.status;
    });
    statuses = _.uniq(statuses);
    var status = statuses.indexOf('failed') >= 0 ? 'failed' : statuses.join(', ');
    _currentSuite.status = status;
    log('Suite ' + _currentSuite.status + ': ' + suite.description, -1);
  };

  this.specStarted = function(spec) {

  };

  this.specDone = function(spec) {
    var currentSpec = {
      description: spec.description,
      status: spec.status
    };
    if (spec.failedExpectations.length > 0) {
      currentSpec.failedExpectations = spec.failedExpectations;
    }

    _currentSuite.specs.push(currentSpec);
    log(spec.status + ' - ' + spec.description);
  };

  this.jasmineDone = function() {
    outputFile = options.outputFile;
    //// Alternate approach - just stringify the _root - not as pretty
    //// but might be more useful for automation.
    // var output = JSON.stringify(_root, null, 2);
    var output = formatOutput(_root);
    fs.appendFileSync(outputFile, output);
  };

  // for output file output
  function formatOutput(output) {
    var indent = '  ';
    var pad = '  ';
    var results = [];
    results.push('AppDir:' + output.appDir);
    output.suites.forEach(function(suite) {
      results.push(pad + 'Suite: ' + suite.description + ' -- ' + suite.status);
      pad+=indent;
      suite.specs.forEach(function(spec) {
        results.push(pad + spec.status + ' - ' + spec.description);
        if (spec.failedExpectations) {
          pad+=indent;
          spec.failedExpectations.forEach(function (fe) {
            results.push(pad + 'message: ' + fe.message);
          });
          pad=pad.substr(2);
        }
      });
      pad = pad.substr(2);
      results.push('');
    });
    results.push('');
    return results.join('\n');
  }

  // for console output
  var _pad;
  function log(str, indent) {
    _pad = _pad || '';
    if (indent == -1) {
      _pad = _pad.substr(2);
    }
    console.log(_pad + str);
    if (indent == 1) {
      _pad = _pad + '  ';
    }
  }

}
