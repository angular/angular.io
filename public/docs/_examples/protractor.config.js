// TO RUN THE TESTS
//
// The first time, run:
//   ./node_modules/.bin/webdriver-manager update
// Make sure the test server is running. Then do.
//   ./node_modules/.bin/protractor protractor.config.js

var fs = require('fs');
var path = require('canonical-path');


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

  baseUrl: 'http://localhost:8080',

  // doesn't seem to work.
  // resultJsonOutputFile: "foo.json",
  
  onPrepare: function() {
    // SpecReporter
    //var SpecReporter = require('jasmine-spec-reporter');
    //// add jasmine spec reporter
    //jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'none'}));
    // jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));

    // debugging
    console.log('browser.params:' + JSON.stringify(browser.params));
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
    xdescribe('*** Skipped *** - ' + name, func);
  }
}

function itIf(cond, name, func) {
  if (cond) {
    it(name, func);
  } else {
    xit('*** Skipped *** - ' + name, func);
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
  this.defaultOutputFile = path.resolve(process.cwd(), "../../", 'protractor-results.txt');
  var _output = [];
  var _logDepth = 0;
  var __pad = '                                 ';
  var _currentSuite;
  options.outputFile = options.outputFile || this.defaultOutputFile;
  log('AppDir: ' + options.appDir);

  this.suiteStarted = function(suite) {
    _logDepth++;
    log('Suite: ' + suite.description);
    // debugging info
    // log('Suite stringify:' + JSON.stringify(suite));
    // log('argv stringify:' + JSON.stringify(process.argv));
    _currentSuite = suite;
    _currentSuite.ok = true;
  };

  this.suiteDone = function(suite) {
    var status = _currentSuite.ok ? 'Suite passed: ' : 'Suite failed: ';
    log(status + suite.description);
    _logDepth--;
  };

  this.specStarted = function(spec) {
    _logDepth++;
  };

  this.specDone = function(spec) {
    log(spec.status + ": " + spec.description);
    logFailedSpec(spec);
    _logDepth--;
  };

  this.jasmineDone = function() {
    outputFile = options.outputFile;
    // console.log('Completed - appending output to: ' + outputFile);
    fs.appendFileSync(outputFile, _output.join('\n')+ '\n\n');
  };

  function logFailedSpec(spec) {
    if (spec.failedExpectations.length == 0) return;
    _logDepth++;
    spec.failedExpectations.forEach(function(exp) {
      log('detail: ' + exp.message);
      _currentSuite.ok = false;
    });
    _logDepth--;
  }

  function log(msg) {
    msg = lpad(msg, 3 * _logDepth);
    console.log(msg);
    _output.push(msg);
  }

  function lpad(value, length) {
    return __pad.substr(0,length) + value;
  }

};

// To be copied into e2e-tests experiencing sendKeys bug.
//// Hack - because of bug with send keys
//function sendKeys(element, str) {
//  return str.split('').reduce(function (promise, char) {
//    return promise.then(function () {
//      return element.sendKeys(char);
//    });
//  }, element.getAttribute('value'));
//  // better to create a resolved promise here but ... don't know how with protractor;
//}